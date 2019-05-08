import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { LoadingComponent, QrcodeComponent, CurrencyMenuBar, TransactionHistory, CopyButton, Alert } from 'app/components/'
import { routeConstants as ROUTE, coinImage as COIN_IMAGE, coinName as COIN_NAME, currencyName as CURRENCY_NAME } from 'constants/index'
import { ICX_TOKEN_CONTRACT_ADDRESS } from 'constants/config'
import { convertNumberToText, calcTokenBalanceWithRate } from 'utils';
import DEFAULT_ICON from 'app/image/icon/icon_default.png';
import withLanguageProps from 'HOC/withLanguageProps';

const INIT_STATE = {
  wallet: {},
  currency: '원/KRW',
  showInfo: false,
  showCurrencyList: false,
  balanceStyle: {},

  showAlertNoBalance: false,
  showAlertNoSwapBalance: false,
  showAlertNoSwapGasBalance: false
}

@withRouter
@withLanguageProps
class CoinDetailContent extends Component {

  constructor(props) {
    super(props);
    const url = this.props.match.params.id;
    const isToken = this.props.match.params.id.includes("_");

    this.state = Object.assign({}, INIT_STATE, {
      account: !isToken ? url : url.split("_")[0],
      tokenId: !isToken ? '' : url.split("_")[1],
      isToken: isToken
    });
  }

  componentWillMount() {
    const { account, tokenId, isToken } = this.state;
    this.props.getRate('usd');
    if (isToken) {
      const wallet = this.props.wallets[account];
      const token = wallet.tokens[tokenId];
      this.props.fetchTokenBalance(tokenId, token.address, token.decimals, wallet.account, wallet.type);
    } else {
      const wallet = this.props.wallets[account];
      this.props.fetchCoinBalance(wallet.account, wallet.type);
    }
  }

  componentWillUnmount() {
    this.props.resetReducer();
  }

  componentDidUpdate(prevProps) {
    const { account, tokenId, isToken } = this.state;
    const getFontSize = (divWidth, emWidth) => {
      let fontSize = 0
      fontSize = 500 / (divWidth - emWidth);
      fontSize = Math.min(Math.max(fontSize, 0.4), 1) * 46;
      return fontSize
    }
    if (isToken) {
      const wallet = this.props.wallets[account];
      const token = wallet.tokens[tokenId];
      if (prevProps.wallets[account].tokens[tokenId].balanceLoading !== token.balanceLoading && !token.balanceLoading) {
        this.setState({
          balanceStyle: {
            fontSize: getFontSize(this.refs.balanceDiv.offsetWidth, this.refs.balanceEm.offsetWidth),
            visibility: 'visible',
          }
        })
      }
    } else {
      const wallet = this.props.wallets[account];
      if (prevProps.wallets[account].balanceLoading !== wallet.balanceLoading && !wallet.balanceLoading) {
        this.setState({
          balanceStyle: {
            fontSize: getFontSize(this.refs.balanceDiv.offsetWidth, this.refs.balanceEm.offsetWidth),
            visibility: 'visible',
          }
        })
      }
    }
  }

  toggleCurrencyList = () => {
    this.setState({
      showCurrencyList: !this.state.showCurrencyList
    })
  }

  setCurrencyList = (currencyType) => {
    this.props.getRate(currencyType);
    this.setState({
      showCurrencyList: false
    })
  }

  handleUpdateToken = () => {
    const { account, tokenId } = this.state;
    this.props.setSelectedWallet({
      account,
      tokenId
    });
    this.props.openPopup({
      popupType: 'updateToken'
    });
  }

  handleDeleteToken = () => {
    const { account, tokenId } = this.state;
    this.props.setSelectedWallet({
      account,
      tokenId
    });
    this.props.openPopup({
      popupType: 'deleteToken'
    });
  }

  handleSwapClick = (balance) => {
    const { account, tokenId } = this.state;
    const wallet = this.props.wallets[account];

    if (balance.eq(0)) {
      this.setState({
        showAlertNoSwapBalance: true
      });
      return false;
    }

    if (wallet.balance.eq(0)) {
      this.setState({
        showAlertNoSwapGasBalance: true
      });
      return false;
    }

    this.props.setSelectedWallet({
      account,
      tokenId
    })
    this.props.openPopup({
      popupType: 'swapToken'
    });
  }

  handleTransactionClick = (balance) => {
    const { account, tokenId } = this.state;
    const { history } = this.props;
    if (balance.eq(0)) {
      this.setState({
        showAlertNoBalance: true
      });
      return false;
    }
    this.props.setSelectedWallet({
      account,
      tokenId
    });
    history.push({
      pathname: ROUTE['transaction']
    });
    this.props.openPopup({
      popupType: 'sendTransaction_transaction'
    });
  }

  closeAlert = () => {
    this.setState({
      showAlertNoBalance: false,
      showAlertNoSwapBalance: false,
      showAlertNoSwapGasBalance: false
    });
  }

  setData = () => {
    const { account, tokenId, isToken } = this.state;
    let data;

    if (isToken) {
      const wallet = this.props.wallets[account]
      const token = wallet.tokens[tokenId];
      data = {
        walletName: wallet.name,
        name: token.name,
        coinType: token.symbol,
        walletCoinType: wallet.type,
        account: wallet.account,
        contractAddress: token.address,
        balanceLoading: token.balanceLoading,
        balance: token.balance,
        symbol: token.symbol,
        defaultSymbol: token.defaultSymbol,
        decimals: token.decimals,
        defaultDecimals: token.defaultDecimals,
        coinImage: COIN_IMAGE[token.symbol] || DEFAULT_ICON
      }
    } else {
      const wallet = this.props.wallets[account];
      data = {
        walletName: wallet.name,
        name: COIN_NAME[wallet.type],
        coinType: wallet.type,
        walletCoinType: wallet.type,
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
      showAlertNoBalance,
      showAlertNoSwapBalance,
      showAlertNoSwapGasBalance
    } = this.state;

    const {
      currency,
      rate,
      rateLoading,
      I18n
    } = this.props;

    const data = this.setData();
    const isSwapAvailable = false

    return (
      <div>
        <div className={`title-holder ${data.coinType}`}>
          <h1>{COIN_NAME[data.coinType] && (<em className="_icon"></em>)}
            {data.name}</h1>
        </div>

        <div className="wrap-holder bg">
          <h2>{data.walletName}</h2>
          <div className="coin-holder">
            <span className="c">
              <div ref="balanceDiv" style={this.state.balanceStyle}>
              { data.balanceLoading
                ? ( <div className="load"><LoadingComponent type="black" /></div> )
                : convertNumberToText(data.balance, 'transaction', true)}<em ref="balanceEm">{data.coinType.toUpperCase()}</em>
              </div>
            </span>
            {
              isToken ? (
                <span className="d">
                  <i className="_img"></i><em>{!data.balanceLoading && !rateLoading && (rate[data.defaultSymbol.toLowerCase()] ? convertNumberToText(calcTokenBalanceWithRate(data.balance, rate[data.defaultSymbol.toLowerCase()], data.defaultDecimals, data.decimals), currency, false) : '')}</em>
                  <div onClick={this.toggleCurrencyList} className={`money-group no ${this.state.showCurrencyList ? 'on' : ''}`}>{CURRENCY_NAME[currency]}<em className="_img"></em>
                    {this.state.showCurrencyList && (
                      <div className="drop-box one">
                        <div className="drop-layer">
                          <CurrencyMenuBar type="sub" onClickOut={this.toggleCurrencyList} setCurrencyList={this.setCurrencyList} coinType={data.coinType} />
                        </div>
                      </div>
                    )}
                  </div>
                </span>
              ) : (
                <span className="d">
                  <em>{!data.balanceLoading && !rateLoading && convertNumberToText(data.balance.toNumber() * rate[data.coinType], currency, false)}</em>
                  <div onClick={this.toggleCurrencyList} className={`money-group no ${this.state.showCurrencyList ? 'on' : ''}`}>{CURRENCY_NAME[currency]}<em className="_img"></em>
                    {this.state.showCurrencyList && (
                      <div className="drop-box one">
                        <div className="drop-layer">
                          <CurrencyMenuBar type="sub" onClickOut={this.toggleCurrencyList} setCurrencyList={this.setCurrencyList} coinType={data.coinType} />
                        </div>
                      </div>
                    )}
                  </div>
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
            <div className="qr"><em><QrcodeComponent scale={3} text={data.account} /></em></div>
          </div>
          { isToken && (<span onClick={this.handleUpdateToken} className="edit-token"><em className="_img"></em>{I18n.button.changeToken}</span>) }
          { isToken && (<span onClick={this.handleDeleteToken} className="del-token"><em className="_img"></em>{I18n.button.removeToken}</span>) }
        </div>
        <TransactionHistory
          account={data.account}
          tokenData={this.state.isToken && {
            contractAddress: data.contractAddress,
            symbol: data.symbol,
            defaultSymbol: data.defaultSymbol,
            decimals: data.decimals,
            defaultDecimals: data.defaultDecimals
          }}
          walletCoinType={data.walletCoinType}
          {...this.props}
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
        {
          showAlertNoSwapBalance && (
            <Alert
              handleCancel={this.closeAlert}
              text={I18n.error.alertNoSwapBalance}
              cancelText={I18n.button.confirm}
            />
          )
        }
        {
          showAlertNoSwapGasBalance && (
            <Alert
              handleCancel={this.closeAlert}
              text={I18n.error.alertNoSwapGasBalance}
              cancelText={I18n.button.confirm}
            />
          )
        }
      </div>
    );
  }
}

export default CoinDetailContent;
