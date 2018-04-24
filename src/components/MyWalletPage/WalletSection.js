import React, { Component } from 'react';
import { WalletBar, WalletMenuBar } from 'components/'
import {
  currencyUnit as CURRENCY_UNIT,
  coinImage as COIN_IMAGE,
} from 'constants/index';
import { convertNumberToText } from 'utils'

const INIT_STATE = {
  showMenuBar: false,
  isExtended: true
}

class WalletSection extends Component {

  constructor(props) {
    super(props);
    this.state = INIT_STATE;
  }

  shouldComponentUpdate(nextProps, nextState){
    if (this.props.id !== nextProps.id) {
      return false;
    }
    return true;
  }

  componentWillReceiveProps(nextProps){
    if (this.props.isCoinView !== nextProps.isCoinView) {
      this.setState({
        isExtended: true
      })
    }
  }

  componentWillUnmount() {
    this.setState(INIT_STATE);
  }

  toggleMenuBar = () => {
    this.setState({
      showMenuBar: !this.state.showMenuBar
    })
  }

  toggleExtend = () => {
    this.setState({
      isExtended: !this.state.isExtended
    })
  }

  render() {

    const {
      walletSectionData,
      isCoinView,
      setPopupType,
      togglePopup,
      currency,
      setAccountAddress,
      setPopupNum
    } = this.props;

    const {
      walletSectionName,
      walletSectionBalance,
      walletSectionBalanceWithRate,
      coinType,
      account
    } = walletSectionData;

    const {
      isExtended
    } = this.state;

    const iconClass = (coinType) => {
      switch(coinType) {
        case 'icx':
          return 'c_icon'
        case 'eth':
          return 'c_ethereum'
        default:
          return ''
      }
    }

    return (
      <div className="wrap-holder">
        <div>
          <table className={`table-typeC ${isCoinView ? 'coin' : ''} ${isExtended ? 'open' : ''}`}>
            <thead>
              <tr>
                <th className="a">
                  <em className={`${isExtended && iconClass(coinType)} ${COIN_IMAGE[coinType] && 'icon'}`}>
                    {COIN_IMAGE[coinType] && (<img alt={coinType} src={COIN_IMAGE[coinType]} />)}
                  </em>{walletSectionName}
                  {!isCoinView && (<span><em className="token_num">{walletSectionData.data.length}</em></span>)}
                </th>
                <th className={`b ${isCoinView ? 'coin' : ''}`}>
                </th>
                {
                  isCoinView && (
                    <th className="c">
                        <span className="m_icx"><em>{convertNumberToText(walletSectionBalance, coinType, true)}</em>{coinType.toUpperCase()}</span>
                        <span className="m_usd">{walletSectionBalanceWithRate !== null && <i className="_img"></i>}<em>{walletSectionBalanceWithRate !== null ? convertNumberToText(walletSectionBalanceWithRate, currency, false) : '-'}</em>{CURRENCY_UNIT[currency]}</span>
                    </th>
                  )
                }
                {
                  !isCoinView && (
                    <th className="c">
                       <span>
                         {!!walletSectionBalanceWithRate && <i className="_img"></i>}
                         <em>{convertNumberToText(walletSectionBalanceWithRate, currency, false)}</em>{'  '+ CURRENCY_UNIT[currency]}
                       </span>
                    </th>
                  )
                }
                <th className="d"></th>
                <th className="e">{!isCoinView && (<span onClick={this.toggleMenuBar}><em className="_img"></em></span>)}</th>
              </tr>
            </thead>
            { isExtended && (
              <tbody>
                {
                  walletSectionData.data.map((barData, i) => (
                    <WalletBar
                      key={i}
                      data={barData}
                      currency={currency}
                      togglePopup={togglePopup}
                      setPopupType={setPopupType}
                      isCoinView={isCoinView}
                      setAccountAddress={setAccountAddress}
                      setPopupNum={setPopupNum}
                      />
                  ))
                }
              </tbody>
            )}
          </table>
          {
            !isCoinView && (
              <div onClick={this.toggleExtend} className="extend">
                <span className={isExtended && "on"}><em className="_img"></em></span>
              </div>
            )
          }
        </div>
        <div className="layer-wallet">
        { this.state.showMenuBar && (
            <WalletMenuBar account={account} onClickOut={this.toggleMenuBar} {...this.props} />
        )}
        </div>
      </div>
    );
  }
}

export default WalletSection;
