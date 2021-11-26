import React, { Component } from 'react';
import { LoadingComponent } from 'app/components/'
import WalletBar from './WalletBar'
import { makeWalletArray, openApp } from 'utils';
import withLanguageProps from 'HOC/withLanguageProps';
import Worker from 'workers/wallet.worker.js';
import { routeConstants as ROUTE } from 'constants/index.js';

const INIT_STATE = {
  tab: 'icx',
  data: {
    'icx': [],
    'eth': []
  },
  password: '',
  pwError: '',
  tabId: '',
  error: '',
  confirmLoading: false,
  selected: ''
}

@withLanguageProps
class MyWallet extends Component {

  constructor(props) {
    super(props);
    this.state = INIT_STATE;
    this.cancelClicked = false
    this.worker = new Worker();
    this.worker.onmessage = (m) => {
      const { I18n } = this.props;
      const privKey = m.data
      if (!privKey) {
        this.setState({
          confirmLoading: false,
          pwError: I18n.error.pwConfirmError
        })
      }
      else {
        this.cancelClicked = true
        const { wallets, tabId, transaction, signing } = this.props;
        if (transaction.payload) {
          const wallet = wallets[transaction.from]
          this.props.setScoreWallet({ wallet, privKey })
          this.props.history.push(ROUTE['send'])
        }
        else if (signing.hash) {
          this.props.callSigning({ tabId, privKey, hash: signing.hash })
        }
      }
    }
  }

  componentWillMount() {
    if (!this.props.walletsLoading) {
      this.props.fetchAll(this.props.wallets);
    }

    window.onunload = () => {
      if (!this.cancelClicked) {
        this.cancelEvent(true)
      }
    }
  }

  componentWillUnmount() {
    this.worker.terminate()
  }

  componentWillUpdate(nextProps) {
    if (this.props.walletsLoading !== nextProps.walletsLoading && nextProps.walletsLoading) {
      this.setState(INIT_STATE);
    }

    if (this.props.totalResultLoading !== nextProps.totalResultLoading && !nextProps.totalResultLoading) {
      this.calcData();
    }
  }

  closePopup = () => {
    this.props.initExternalState()
    window.chrome.runtime.sendMessage({ type: 'CLOSE_POPUP' });
  }

  selectAddress = selected => {
    this.setState({ selected })
  }

  confirmAddress = () => {
    const { selected: payload } = this.state
    if (payload) {
      window.chrome.tabs.sendMessage(this.props.tabId, { type: 'RESPONSE_ADDRESS', payload });
      this.closePopup()
    }
  }

  confirmPassword = fromAddress => {
    const { password } = this.state;
    if (!password) {
      const { I18n } = this.props;
      this.setState({ pwError: I18n.error.pwErrorEnter })
      return
    }

    this.setState({
      confirmLoading: true,
      pwError: ''
    }, () => {
      const { wallets } = this.props;
      const { priv } = wallets[fromAddress];
      this.worker.postMessage({
        priv, pw: password, type: 'sendTransaction'
      });
    })
  }

  cancelEvent = closed => {
    this.cancelClicked = true

    if (this.props.addressRequest && !closed) {
      this.closePopup()
      return
    }

    let type = 'CANCEL'
    if (this.props.transaction.payload) {
      type += '_JSON-RPC'
    }
    else if (this.props.signing.hash) {
      type += '_SIGNING'
    }

    window.chrome.tabs.sendMessage(this.props.tabId, { type });
    if (!closed) {
      this.closePopup()
    }
  }

  getIsInput = (wallet) => {
    const { transaction, signing } = this.props
    const from = transaction.from || signing.from
    return wallet.account === from
  }

  getTxHash = () => {
    const { signing } = this.props
    if (signing.hash) {
      return signing.hash
    }
    else {
      return ''
    }
  }

  calcData = () => {
    const { wallets } = this.props;
    let { data, tab } = this.state;
    let walletArr = makeWalletArray(wallets);

    walletArr.map((wallet) => {
      data[wallet.type].push(wallet)
      return true
    })

    if (data['icx'].length < 1) {
      tab = 'eth'
    }

    this.setState({
      tab: tab,
      data: data
    })
  }

  goApp = () => {
    openApp();
    window.chrome.runtime.sendMessage({ type: 'CLOSE_POPUP' });
  }

  handleTabChange = (e) => {
    const newTab = e.target.getAttribute('data-name');
    this.setState({
      tab: newTab
    });
  }

  handleChange = (e) => {
    this.setState({ password: e.target.value })
  }

  onlyIcxTab = () => {
    const { addressRequest, transaction, signing } = this.props
    return addressRequest || transaction.payload || signing.hash
  }

  render() {
    const { tab, data, password, pwError, confirmLoading, selected } = this.state;
    const { I18n, totalResultLoading } = this.props;
    const { addressRequest, transaction } = this.props;
    const _onlyIcxTab = this.onlyIcxTab()
    if (_onlyIcxTab) {
      data['eth'] = []
    }
    const isTwoItem = data['icx'].length > 0 && data['eth'].length > 0
    return (
      <div className="wrap">
        {(totalResultLoading || data.length < 1) ?
          <LoadingComponent type="black" style={{ height: '100vh' }} />
          :
          <div>
            <div className="tab-holder">
              <ul className={isTwoItem ? 'two' : 'one no-pointer'}>
                {data['icx'].length > 0 && (<li onClick={this.handleTabChange} data-name={'icx'} className={data['icx'].length > 0 && data['eth'].length > 0 && tab === "icx" ? "on" : ''}>ICX</li>)}
                {data['eth'].length > 0 && (<li onClick={this.handleTabChange} data-name={'eth'} className={data['icx'].length > 0 && data['eth'].length > 0 && tab === "eth" ? "on" : ''}>ETH</li>)}
              </ul>
            </div>
            <div className="content-wrap">
              <div className="scroll">
                <ul className="list-holder">
                  {
                    data[tab].map((wallet, i) => {
                      const isInput = this.getIsInput(wallet);
                      // const isInput = true;
                      const txHash = isInput ? this.getTxHash() : '';
                      // const txHash = '3H3svYGqXxAAHSAJy2Eu1TGagC3H3svYGqXxAAHSbU2kz5KR';
                      return (
                        <WalletBar key={i}
                          index={i}
                          wallet={wallet}
                          password={password}
                          handleChange={this.handleChange}
                          pwError={pwError}
                          confirmLoading={confirmLoading}
                          selected={selected}
                          selectAddress={this.selectAddress}

                          isTransaction={!!transaction.payload}
                          isInput={isInput}
                          txHash={txHash}
                          confirmPassword={this.confirmPassword}
                          cancelEvent={this.cancelEvent}
                          addressRequest={addressRequest}
                        />
                      )
                    })
                  }
                </ul>
              </div>
            </div>
          </div>
        }
        {addressRequest ?
          <div className="footer cols-2">
            <button className="btn-type-cancel" onClick={() => { this.cancelEvent() }}><span>{I18n.button.cancel}</span></button>
            <button className="btn-type-normal" onClick={this.confirmAddress} disabled={!selected}><span>{I18n.button.confirm}</span></button>
          </div>
          :
          <div onClick={this.goApp} className="footer">
            <p>{I18n.button.goToWallet}</p>
          </div>
        }
      </div>
    );
  }
}

export default MyWallet;
