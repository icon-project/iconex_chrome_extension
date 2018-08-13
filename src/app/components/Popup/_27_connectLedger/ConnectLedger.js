import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import withLanguageProps from 'HOC/withLanguageProps';
import { LoadingComponent, LedgerIframe, Alert } from 'app/components';
import { routeConstants as ROUTE } from 'constants/index';
import { icx_fetchCoinBalanceApi } from 'redux/api/walletIcxApi'
import { nToBr } from 'utils';


const INIT_STATE = {
  ledgerInit: false,
  ledgerLoading: false,
  showBalanceError: false,
  error: ''
}

@withRouter
@withLanguageProps
class ConnectLedger extends Component {

  constructor(props) {
    super(props);
    this.state = INIT_STATE;
  }

  closePopup = () => {
    this.setState(INIT_STATE);
    this.props.closePopup();
  }

  handleStartLedger = () => {
    this.setState({
      ledgerInit: true,
      ledgerLoading: true
    })
  }

  handleLedgerSuccess = async (event) => {

    const {
      popupNum,
      history,
      setSelectedWallet,
      setEXTRLogInStateForLedger,
      setPopupNum,
      closePopup
    } = this.props;

    const { data, source } = event
    const parsedData = JSON.parse(data)
    const { method, payload } = parsedData

    if (popupNum === 1) setPopupNum(2)

    switch (method) {
      case 'icx_getBalance':
        let balanceArr = await Promise.all([
          await icx_fetchCoinBalanceApi(payload[0]),
          await icx_fetchCoinBalanceApi(payload[1]),
          await icx_fetchCoinBalanceApi(payload[2]),
          await icx_fetchCoinBalanceApi(payload[3]),
          await icx_fetchCoinBalanceApi(payload[4])
        ])
        console.log(balanceArr)
        balanceArr = balanceArr.map((balance) => balance.toString())
        source.postMessage(balanceArr, '*')
        break;
      case 'setWallet':
        setEXTRLogInStateForLedger({
          isLoggedIn: true,
          ledgerWallet: payload
        })
        setSelectedWallet({
          account: payload.account
        });
        closePopup();
        history.push({
          pathname: ROUTE['transaction']
        });
        break;
      case 'setBalanceError':
        this.setState({
          showBalanceError: true
        })
        break;
      default:
        break;
    }
  }

  handleLedgerError = (error) => {
    this.props.setPopupNum(1)
    this.setState({
      ledgerInit: false,
      ledgerLoading: false,
      error
    })
  }

  closeAlert = () => {
    this.setState({
      showBalanceError: false
    })
  }

  render() {

    const {
      I18n,
      popupNum,
      language
    } = this.props;

    const { ledgerLoading, ledgerInit, showBalanceError, error } = this.state;

    return (
      <div>
        <div className="dimmed"></div>
        <div
          style={popupNum === 2 ? {height: 520} : {}}
          className={`
            popup
            ${popupNum === 2 ? 'address wallet' : ''}
            ${error ? 'fail' : ''}
            `}>
              {
                popupNum === 1 && (
                  <div>
                    <p className="txt_box">{I18n.connectLedger.title}</p>
                    { error && (<p className="message"><i className="_img"></i>{I18n.connectLedger.connectError}</p>)}
         			        <p className="txt">
                        { !error ? nToBr(I18n.connectLedger.desc)
                                 : nToBr(I18n.connectLedger.descError) }
                      </p>
         			        <a href={`./resource/${I18n.connectLedger.manualFileName}.pdf`} target="_blank"><p className="mint">{I18n.connectLedger.info}</p></a>
         			        <div className="btn-holder">
     				            <button onClick={this.closePopup} className="btn-type-fill size-del"><span>{I18n.button.close}</span></button>
     				                { ledgerLoading ? (<button style={{paddingBottom: 14, paddingTop: 11}} className="btn-type-normal size-del"><span><LoadingComponent type="white" /></span></button>)
                                            : (<button onClick={this.handleStartLedger} className="btn-type-normal size-del"><span>{!error ? I18n.button.connect : I18n.button.retry}</span></button>)}
         			        </div>
                  </div>
                )
              }
              {
                popupNum === 2 && (
                  <div>
                    <span className="close" onClick={this.closePopup}><em className="_img"></em></span>
            			  <h1 className="title">{I18n.connectLedger.walletAddress}</h1>
            			  <h2>Ledger (ICX)<span>{`(44'/4801368'/0'/0')`}</span></h2>
                  </div>
                )
              }

              {
                ledgerInit && (
                  <LedgerIframe
                    method={'getBalance'}
                    language={language}
                    handleSuccess={this.handleLedgerSuccess}
                    handleError={this.handleLedgerError}
                    isHidden={popupNum === 1} />
                )
              }
              {
                showBalanceError && (
                  <Alert
                    handleCancel={this.closeAlert}
                    text={I18n.error.noBalance}
                    cancelText={I18n.button.confirm}
                  />
                )
              }
          </div>
      </div>
    );
  }
}

export default ConnectLedger;
