import React, { Component } from 'react';
import { LoadingComponent } from 'app/components/'
import WalletBar from './WalletBar'
import { makeWalletArray, openApp, isEmpty } from 'utils';
import withLanguageProps from 'HOC/withLanguageProps';
import Worker from 'workers/wallet.worker.js';
import queryString from 'query-string'

const INIT_STATE = {
  tab: 'icx',
  data: {
    'icx': [],
    'eth': []
  },
  password: '',
  pwError: ''
}

@withLanguageProps
class MyWallet extends Component {

  constructor(props) {
    super(props);
    this.state = INIT_STATE;
    this.worker = new Worker();
    this.worker.onmessage = (m) => {
      const { transaction, score, I18n } = this.props;
      if (!m.data) {
        this.setState({
          loading: false,
          pwError: I18n.error.pwConfirmError
        })
      } else {
        const _isScore = this.isScore()
        if (_isScore) {
          this.props.callScoreExternally({privKey:m.data, param:score.param})
        }
        else {
          const { stepLimit } = transaction
          const sendData = Object.assign({}, transaction, {
            txFeeLimit: stepLimit || '4000',
            coinType: 'icx'
          });
          this.props.sendCall(m.data, sendData);
        }
      }
    }
  }

  componentWillMount() {
    if(!this.props.walletsLoading) {
      this.props.fetchAll(this.props.wallets);
    }
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

  componentWillUpdate(nextProps, nextState) {
    if(this.props.walletsLoading !== nextProps.walletsLoading && nextProps.walletsLoading) {
      this.setState(INIT_STATE);
    }

    if(this.props.totalResultLoading !== nextProps.totalResultLoading && !nextProps.totalResultLoading) {
      this.calcData();
    }

    if (this.props.txLoading !== nextProps.txLoading && !nextProps.txLoading) {
      window.chrome.tabs.query({ active: true }, (tabs) => {
        window.chrome.tabs.sendMessage(tabs[0].id, { type: 'RESPONSE_TRANSACTION', payload: this.props.tx });
        this.clearPopup()
      });
    }

    if (this.props.score.loading !== nextProps.score.loading && !nextProps.score.loading) {
      window.chrome.tabs.query({ active: true }, (tabs) => {
        const { error, result } = this.props.score
        const payload = error || result
        window.chrome.tabs.sendMessage(tabs[0].id, { type: 'RESPONSE_SCORE', payload });
        this.clearPopup()
      });
    }
  }

  componentWillUnmount() {
    this.setState(INIT_STATE);
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
    window.chrome.runtime.sendMessage({type: 'CLOSE_POPUP'});
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
      this.props.setIsRequestedStatus(false)
      window.chrome.tabs.query({ active: true }, (tabs) => {
        window.chrome.tabs.sendMessage(tabs[0].id, { type: 'RESPONSE_ADDRESS', payload: address});
        this.clearPopup()
      });
    }
  }

  onCancelClick = () => {
    const _isScore = this.isScore()
    const type = `CANCEL_${_isScore ? 'SCORE' : 'TRANSACTION'}`
    window.chrome.tabs.query({ active: true }, (tabs) => {
      window.chrome.tabs.sendMessage(tabs[0].id, { type });
      this.clearPopup()
    });
  }

  onConfirmClick = () => {
    const { password } = this.state;
    if (!password) {
      const { I18n } = this.props;
      this.setState({ pwError: I18n.error.pwErrorEnter })
      return
    }

    this.setState({ loading: true, pwError: '' }, () => {
      const { wallets, transaction, score } = this.props;
      console.log(this.isScore(), score.from, transaction.from)
      const { priv } = wallets[this.isScore() ? score.from : transaction.from];
      const data = {
        priv, pw: password, type: 'sendTransaction'
      };
      this.worker.postMessage(data);
    })
  }

  clearPopup = () => {
    window.chrome.runtime.sendMessage({type: 'CLOSE_POPUP'});
    this.props.setTransactionStatus()
    this.props.setScoreData()
    this.setState({
      password: '',
      pwError: ''
    })
  }

  render() {
    const { tab, data, password, pwError, loading } = this.state;
    const { I18n, totalResultLoading, transaction, isRequestedStatus, score } = this.props;

    return (
      <div className="wrap">
        {
          (totalResultLoading || data.length < 1) ? (
            <div style={{height: '100%'}}>
              <LoadingComponent type="black" />
            </div>
          ) : (
            <div>
              <div className="tab-holder">
        				<ul className={data['icx'].length > 0 && data['eth'].length > 0 ? 'two' : 'one'}>
        					{ data['icx'].length > 0 && (<li onClick={this.handleTabChange} data-name={'icx'} className={data['icx'].length > 0 && data['eth'].length > 0 && tab === "icx" ? "on" : ''}>ICX</li>)}
        					{ data['eth'].length > 0 && (<li onClick={this.handleTabChange} data-name={'eth'} className={data['icx'].length > 0 && data['eth'].length > 0 && tab === "eth" ? "on" : ''}>ETH</li>)}
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
                            isScore = {this.isScore}
                            isRequestedStatus={isRequestedStatus}
                            password={password}
                            error={pwError}
                            loading={loading}
                            handleChange={this.handleChange}
                            onCellClick={this.onCellClick}
                            onCancelClick={this.onCancelClick}
                            onConfirmClick={this.onConfirmClick}
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
