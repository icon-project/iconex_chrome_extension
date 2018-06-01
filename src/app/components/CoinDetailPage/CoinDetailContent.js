import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { LoadingComponent, QrcodeComponent, CurrencyMenuBar, TransactionHistory, CopyButton, Alert } from 'app/components/'
import { routeConstants as ROUTE, coinImage as COIN_IMAGE, coinName as COIN_NAME, currencyName as CURRENCY_NAME } from 'constants/index'
import { IcxContractAddress as ICX_CONTRACT_ADDRESS } from 'constants/config'
import { convertNumberToText, calcTokenBalanceWithRate } from 'utils';
import DEFAULT_ICON from 'app/image/icon/icon_default.png';
import withLanguageProps from 'HOC/withLanguageProps';

const INIT_STATE = {
  wallet: {},
  currency: '원/KRW',
  showInfo: false,
  showCurrencyList: false,

  showAlertNoBalance: false
}

@withRouter
@withLanguageProps
class CoinDetailContent extends Component {

  constructor(props) {
    super(props);
    this.state = Object.assign({}, INIT_STATE, {
      isToken: this.props.match.params.id.includes("_")
    });
  }

  componentWillMount() {
    const url = this.props.match.params.id;
    this.props.getRate('usd', this.props.wallets);
    if (this.state.isToken) {
      const account = url.split("_")[0];
      const index = url.split("_")[1];
      const wallet = this.props.wallets[account];
      const token = wallet.tokens[index];
      this.props.fetchTokenBalance(index, token.address, token.decimals, wallet.account, wallet.type);
    } else {
      const wallet = this.props.wallets[url];
      this.props.fetchCoinBalance(wallet.account, wallet.type);
    }
  }

  componentWillUnmount() {
    this.props.resetReducer();
  }

  toggleCurrencyList = () => {
    this.setState({
      showCurrencyList: !this.state.showCurrencyList
    })
  }

  setCurrencyList = (e) => {
    this.props.getRate(e.target.getAttribute("data-currency"), this.props.wallets);
    this.setState({
      showCurrencyList: false
    })
  }

  handleUpdateToken = () => {
    const urlArr = this.props.match.params.id.split("_");
    this.props.setSelectedToken(urlArr[0], urlArr[1]);
    this.props.togglePopup();
    this.props.setPopupType('updateToken');
  }

  handleDeleteToken = () => {
    const urlArr = this.props.match.params.id.split("_");
    this.props.setSelectedToken(urlArr[0], urlArr[1]);
    this.props.togglePopup();
    this.props.setPopupType('deleteToken');
  }

  handleSwapClick = (balance) => {
    const url = this.props.match.params.id;
    const account = url.split("_")[0]
    const tokenId = url.split("_")[1]
    this.props.setAccountAddress({
      isLoggedIn: false,
      accountAddress: account,
      coinTypeIndex: tokenId
    })
    this.props.togglePopup();
    this.props.setPopupType(`swapToken`);
    this.props.setPopupNum(0);
  }

  handleTransactionClick = (balance) => {
    const { isToken } = this.state;
    const url = this.props.match.params.id;
    const account = isToken ? url.split("_")[0] : url;
    const { history } = this.props;
    if (balance.eq(0)) {
      this.setState({
        showAlertNoBalance: true
      });
      return false;
    }
    history.push({
      pathname: ROUTE['transaction'],
      state: {
        accountAddress: account,
        coinTypeIndex: isToken ? url.split("_")[1] : account
       }
    });
    this.props.togglePopup();
    this.props.setPopupType(`sendTransaction_transaction`);
  }

  closeAlert = () => {
    this.setState({
      showAlertNoBalance: false
    });
  }

  setData = () => {
    const url = this.props.match.params.id;
    let data;

    if (this.state.isToken) {
      const wallet = this.props.wallets[url.split("_")[0]]
      const token = wallet.tokens[url.split("_")[1]];
      data = {
        walletName: wallet.name,
        name: token.name,
        type: token.symbol,
        coinType: wallet.type,
        account: wallet.account,
        tokenAddress: token.address,
        balanceLoading: token.balanceLoading,
        balance: token.balance,
        symbol: token.symbol,
        defaultSymbol: token.defaultSymbol,
        decimals: token.decimals,
        defaultDecimals: token.defaultDecimals,
        coinImage: COIN_IMAGE[token.symbol] || DEFAULT_ICON
      }
    } else {
      const wallet = this.props.wallets[url];
      data = {
        walletName: wallet.name,
        name: COIN_NAME[wallet.type],
        type: wallet.type,
        coinType: wallet.type,
        account: wallet.account,
        balanceLoading: wallet.balanceLoading,
        balance: wallet.balance,
        coinImage: COIN_IMAGE[wallet.type]
      }
    }
    return data;
  }

  render() {
    const {
      isToken,
      showAlertNoBalance
    } = this.state;

    const {
      wallets,
      currency,
      rate,
      rateLoading,
      txHistory,
      txHistoryLoading,
      startBlock,
      endBlock,
      resetReducer,
      I18n
    } = this.props;

    const data = this.setData();
    const isSwapAvailable = data.tokenAddress === ICX_CONTRACT_ADDRESS

    return (
      <div>
        <div className={`title-holder ${data.type}`}>
          <h1>{COIN_NAME[data.type] && (<em className="_icon"></em>)}
            {data.name} <span>{'('+data.type.toUpperCase()+')'}</span></h1>
          <div className="navigator">
            <span>{I18n.home}</span> /
            <span><em className="_img"></em> {I18n.myWallet}</span> /
            <span><em className="_img"></em> {I18n.coin}</span>
          </div>
        </div>

        <div className="wrap-holder bg">
          <h2>{data.walletName}</h2>
          <div className="coin-holder">
            <span className="a">{I18n.coinDetailContentBalance}</span><br />
            <span className="c">
              { data.balanceLoading
                ? ( <div className="load"><LoadingComponent type="black" /></div> )
                : convertNumberToText(data.balance, 'transaction', true)}<em>{data.type.toUpperCase()}</em>
            </span><br />
            {
              isToken ? (
                <span className="d">
                  <i className="_img"></i><em>{!data.balanceLoading && !rateLoading && (rate[data.defaultSymbol.toLowerCase()] ? convertNumberToText(calcTokenBalanceWithRate(data.balance, rate[data.defaultSymbol.toLowerCase()], data.defaultDecimals, data.decimals), currency, false) : '')}</em>
                  <span onClick={this.toggleCurrencyList} className={`money-group ${this.state.showCurrencyList ? 'on' : ''}`}>{CURRENCY_NAME[currency]}<em className="_img"></em>
                    {this.state.showCurrencyList && (
                      <CurrencyMenuBar type="sub" onClickOut={this.toggleCurrencyList} setCurrencyList={this.setCurrencyList} coinType={data.type} />
                    )}
                  </span>
                </span>
              ) : (
                <span className="d">
                  <i className="_img"></i><em>{!data.balanceLoading && !rateLoading && convertNumberToText(data.balance.toNumber() * rate[data.type], currency, false)}</em>
                  <span onClick={this.toggleCurrencyList} className={`money-group ${this.state.showCurrencyList ? 'on' : ''}`}>{CURRENCY_NAME[currency]}<em className="_img"></em>
                    {this.state.showCurrencyList && (
                      <CurrencyMenuBar type="sub" onClickOut={this.toggleCurrencyList} setCurrencyList={this.setCurrencyList} coinType={data.type} />
                    )}
                  </span>
                </span>
              )
            }
            <div className="exchange-holder">
              {/* !data.balanceLoading && !isToken && (<button disabled={true} className="btn-type-exchange2"><span>{I18n.button.exchange}</span></button>) */}
              {!data.balanceLoading && isSwapAvailable && (<button onClick={() => this.handleSwapClick(data.balance)} className="btn-type-exchange2"><span>{I18n.button.swap}</span></button>)}
              {!data.balanceLoading && (<button onClick={() => this.handleTransactionClick(data.balance)} className="btn-type-exchange2"><span>{I18n.button.transfer}</span></button>)}
            </div>
          </div>

          <div className="deposit-hoder">
            <p>{I18n.coinDetailContentAddress}</p>
            <span>{data.account}<CopyButton type="small" target={data.account} text={I18n.button.copyDepositAddress} copyFinish={I18n.button.copyFinish}/></span>
            <ul>
              <li>· {I18n.coinDetailContentDesc1}</li>
              <li>· {I18n.coinDetailContentDesc2}</li>
            </ul>
            <div className="qr"><span>{I18n.coinDetailContentQrCode}</span><em><QrcodeComponent scale={3} text={data.account} /></em></div>
          </div>
          { isToken && (<span onClick={this.handleUpdateToken} className="edit-token"><em className="_img"></em>{I18n.button.changeToken}</span>) }
          { isToken && (<span onClick={this.handleDeleteToken} className="del-token"><em className="_img"></em>{I18n.button.removeToken}</span>) }
        </div>
        <TransactionHistory
          wallets={wallets}
          account={data.account}
          tokenData={this.state.isToken && {
            tokenAddress: data.tokenAddress,
            symbol: data.symbol,
            decimals: data.decimals,
            defaultDecimals: data.defaultDecimals
          }}
          history={txHistory}
          historyLoading={txHistoryLoading}
          startBlock={startBlock}
          endBlock={endBlock}
          fetchTransactionHistory={this.props.fetchTransactionHistory}
          coinType={data.coinType}
          totalData={this.props.totalData}
          resetReducer={resetReducer}
          fetchCoinBalance={this.props.fetchCoinBalance}
          fetchTokenBalance={this.props.fetchTokenBalance}
        />
        {
          showAlertNoBalance && (
            <Alert
              handleCancel={this.closeAlert}
              text={I18n.error.alertNoBalance}
              cancelText={I18n.button.confirm}
            />
          )
        }
      </div>
    );
  }
}

export default CoinDetailContent;
