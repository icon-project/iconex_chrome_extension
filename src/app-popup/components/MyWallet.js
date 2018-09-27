import React, { Component } from 'react';
import { LoadingComponent } from 'app/components/'
import WalletBar from './WalletBar'
import { makeWalletArray, openApp, isEmpty } from 'utils';
import withLanguageProps from 'HOC/withLanguageProps';
import Worker from 'workers/wallet.worker.js';
import queryString from 'query-string'
import { signHashcode } from 'utils/iconex'

const INIT_STATE = {
  tab: 'icx',
  data: {
    'icx': [],
    'eth': []
  },
  password: '',
  pwError: '',
  tabId: '',
  loading: false
}

@withLanguageProps
class MyWallet extends Component {

  constructor(props) {
    super(props);
    this.state = INIT_STATE;
    this.cancelClicked = false
    this.worker = new Worker();
    this.worker.onmessage = (m) => {
      const { transaction, score, signing, I18n } = this.props;
      if (!m.data) {
        this.setState({
          loading: false,
          pwError: I18n.error.pwConfirmError
        })
      } else {
        const _isScore = this.isScore()
        if (_isScore) {
          this.props.callScoreExternally({ privKey: m.data, param: score.param })
          return
        }

        const _isSigning = this.isSigning()
        if (_isSigning) {
          this.signAndSendResponse(m.data, signing.hash)
          return
        }

        const { stepLimit } = transaction
        const sendData = Object.assign({}, transaction, {
          txFeeLimit: stepLimit || '4000',
          coinType: 'icx'
        });
        this.props.sendCall(m.data, sendData);
      }
    }
  }

  componentWillMount() {
    if (!this.props.walletsLoading) {
      this.props.fetchAll(this.props.wallets);
    }
  }

  componentDidMount() {
    window.onunload = () => {
      if (!this.cancelClicked) {
        this.onCancelClick()
      }
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.props.walletsLoading !== nextProps.walletsLoading && nextProps.walletsLoading) {
      this.setState(INIT_STATE);
    }

    if (this.props.totalResultLoading !== nextProps.totalResultLoading && !nextProps.totalResultLoading) {
      this.calcData();
    }

    if (this.props.txLoading !== nextProps.txLoading && !nextProps.txLoading) {
      const { tabId } = this.state
      window.chrome.tabs.sendMessage(tabId, { type: 'RESPONSE_TRANSACTION', payload: this.props.tx });
      this.clearPopup()
    }

    if (this.props.score.loading !== nextProps.score.loading && !nextProps.score.loading) {
      const { error, result } = this.props.score
      const { tabId } = this.state
      const payload = error || result
      window.chrome.tabs.sendMessage(tabId, { type: 'RESPONSE_SCORE', payload });
      this.clearPopup()
    }
  }

  signAndSendResponse(privKey, hash) {
    let signature
    if (Array.isArray(hash)) {
      signature = []
      hash.forEach(h => {
        signature.push(signHashcode(privKey, h))
      })
    }
    else {
      signature = signHashcode(privKey, hash)
    }

    const { tabId } = this.state
    window.chrome.tabs.sendMessage(tabId, { type: 'RESPONSE_SIGNING', payload: signature });
    this.clearPopup()
  }

  isSigning = () => {
    const { hash } = this.props.signing
    return !!hash
  }

  isScore = () => {
    const { param } = this.props.score
    if (!!param && !isEmpty(param)) {
      return true
    }
    else {
      return false
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

  onCellClick = (address) => {
    const { isRequestedStatus } = this.props
    if (isRequestedStatus) {
      const { tabId } = isRequestedStatus
      window.chrome.tabs.sendMessage(tabId, { type: 'RESPONSE_ADDRESS', payload: address });
      this.clearPopup()
      this.props.setIsRequestedStatus()
    }
  }

  getCancelType = () => {
    const _isScore = this.isScore()
    if (_isScore) {
      return 'CANCEL_SCORE'
    }
    const _isSigning = this.isSigning()
    if (_isSigning) {
      return 'CANCEL_SIGNING'
    }
    return 'CANCEL_TRANSACTION'
  }

  getFromAddress = () => {
    const _isScore = this.isScore()
    if (_isScore) {
      return this.props.score.from
    }
    const _isSigning = this.isSigning()
    if (_isSigning) {
      return this.props.signing.from
    }
    return this.props.transaction.from
  }

  getTabId = () => {
    const _isScore = this.isScore()
    if (_isScore) {
      const { score } = this.props
      const { tabId } = score
      return tabId
    }

    const _isSigning = this.isSigning()
    if (_isSigning) {
      const { signing } = this.props
      const { tabId } = signing
      return tabId
    }

    const { transaction } = this.props
    if (transaction) {
      const { tabId } = transaction
      return tabId
    }

    const { isRequestedStatus } = this.props
    if (isRequestedStatus) {
      const { tabId } = isRequestedStatus
      return tabId    
    }
    else {
      return ''
    }
  }

  onConfirmClick = () => {
    const { password } = this.state;
    if (!password) {
      const { I18n } = this.props;
      this.setState({ pwError: I18n.error.pwErrorEnter })
      return
    }
    
    const tabId = this.getTabId()
    this.setState({ tabId, loading: true, pwError: '' }, () => {
      const { wallets } = this.props;
      const address = this.getFromAddress()
      const { priv } = wallets[address];
      const data = {
        priv, pw: password, type: 'sendTransaction'
      };
      this.worker.postMessage(data);
    })
  }

  onCancelClick = () => {
    this.cancelClicked = true
    const tabId = this.getTabId()
    const type = this.getCancelType()
    window.chrome.tabs.sendMessage(tabId, { type });
    this.clearPopup()
  }

  clearPopup = () => {
    window.chrome.runtime.sendMessage({ type: 'CLOSE_POPUP' });
    this.props.setIsRequestedStatus()
    this.props.setTransactionStatus()
    this.props.setScoreData()
    this.props.setSigningData()
    this.setState(INIT_STATE)
  }

  render() {
    const { tab, data, password, pwError, loading } = this.state;
    const { I18n, totalResultLoading, transaction, isRequestedStatus, score, signing } = this.props;

    return (
      <div className="wrap">
        {
          (totalResultLoading || data.length < 1) ? (
            <div style={{ height: '100%' }}>
              <LoadingComponent type="black" />
            </div>
          ) : (
              <div>
                <div className="tab-holder">
                  <ul className={data['icx'].length > 0 && data['eth'].length > 0 ? 'two' : 'one'}>
                    {data['icx'].length > 0 && (<li onClick={this.handleTabChange} data-name={'icx'} className={data['icx'].length > 0 && data['eth'].length > 0 && tab === "icx" ? "on" : ''}>ICX</li>)}
                    {data['eth'].length > 0 && (<li onClick={this.handleTabChange} data-name={'eth'} className={data['icx'].length > 0 && data['eth'].length > 0 && tab === "eth" ? "on" : ''}>ETH</li>)}
                  </ul>
                </div>

                <div className="content-wrap">
                  <div className="scroll">
                    <ul className="list-holder">
                      {
                        data[tab].map((wallet, i) => {
                          return (
                            <WalletBar key={i}
                              index={i}
                              wallet={wallet}
                              transaction={transaction}
                              score={score}
                              isScore={this.isScore}
                              signing={signing}
                              isSigning={this.isSigning}
                              isRequestedStatus={isRequestedStatus}
                              password={password}
                              error={pwError}
                              loading={loading}
                              handleChange={this.handleChange}
                              onCellClick={this.onCellClick}
                              onCancelClick={this.onCancelClick}
                              onConfirmClick={this.onConfirmClick}
                              getTabId={this.getTabId}
                            />
                          )
                        })
                      }
                    </ul>
                  </div>
                </div>
              </div>
            )
        }
        <div onClick={this.goApp} className="footer">
          <p>{I18n.button.goToWallet}<em className="_img"></em></p>
        </div>
      </div>
    );
  }
}

export default MyWallet;
