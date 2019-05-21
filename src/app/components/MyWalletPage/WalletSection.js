import React, { Component } from 'react';
import Fragment from 'react-dot-fragment';
import { WalletStakingBar, WalletBar, WalletMenuBar } from 'app/components/'
import {
  currencyUnit as CURRENCY_UNIT,
  coinImage as COIN_IMAGE,
  copyState as COPY_STATE,
} from 'constants/index';
import { convertNumberToText, handleCopy } from 'utils/utils'
import withLanguageProps from 'HOC/withLanguageProps';

const INIT_STATE = {
  isExtended: true,
  copyState: COPY_STATE['off'],
  tokenList: []
}

@withLanguageProps
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

  showMenuBar = (e) => {
    e.stopPropagation()
    const { index, showMenuBar } = this.props
    showMenuBar(index)
  }

  closeMenuBar = () => {
    const { closeMenuBar } = this.props
    closeMenuBar()
  }

  handleCopy = (e) => {
    e.stopPropagation()
    const { index } = this.props
    const { copyState } = this.state
    handleCopy(`span.copyKey${index}`, copyState, this.setState.bind(this))
  }

  toggleExtend = () => {
    this.setState({
      isExtended: !this.state.isExtended
    })
  }

  getIcon = (isToken, symbol) => {
    const iconClass = isToken 
      ? this.getIconColor(symbol[0].toUpperCase().charCodeAt(0))
      : symbol === 'icx' ? '' : 'ethereum'
    const iconInitial = isToken
      ? symbol[0].toUpperCase()
      : ''

    return <i className={`_icon ${iconClass}`}>{iconInitial}</i>
  }

  getIconColor = (index) => {
    const colorNum = Math.abs(index - 65) % 12;
    switch(colorNum) {
      case 0:
        return 'A'
      case 1:
        return 'B'
      case 2:
        return 'C'
      case 3:
        return 'D'
      case 4:
        return 'E'
      case 5:
        return 'F'
      case 6:
        return 'G'
      case 7:
        return 'H'
      case 8:
        return 'I'
      case 9:
        return 'J'
      case 10:
        return 'K'
      case 11:
        return 'L'
      default:
        return ''
    }
  }

  render() {

    const {
      walletSectionData,
      isCoinView,
      openPopup,
      currency,
      setPopupNum,
      setSelectedWallet,
      showMenuIndex,
      index,
      showAlert,
      I18n
    } = this.props;

    const {
      walletSectionName,
      walletSectionBalance,
      walletSectionBalanceWithRate,
      coinType,
      walletCoinType,
      account
    } = walletSectionData;

    const {
      isExtended,
      copyState,
    } = this.state;

    const wrapSelectClass = (showMenuIndex, index) => {
      if (showMenuIndex !== -1) {
        if (showMenuIndex === index) {
          return 'select'
        } else {
          return 'no-select'
        }
      } else {
        return ''
      }
    }
     
    const myWalletBar = walletSectionData.data.map((barData, i) => (
      <WalletBar
        key={i}
        index={i}
        data={barData}
        currency={currency}
        isCoinView={isCoinView}
        walletCoinType={walletCoinType || coinType}
        openPopup={openPopup}
        setPopupNum={setPopupNum}
        setSelectedWallet={setSelectedWallet}
        showAlert={showAlert}
        getIcon={this.getIcon}
        />
    ))

    const myWalletStakingBar = walletSectionData.data.map((barData, i) => (
        <Fragment key={i}>
          <WalletStakingBar
          />
          <WalletBar
            index={i}
            data={barData}
            currency={currency}
            isCoinView={isCoinView}
            walletCoinType={walletCoinType || coinType}
            openPopup={openPopup}
            setPopupNum={setPopupNum}
            setSelectedWallet={setSelectedWallet}
            showAlert={showAlert}
            getIcon={this.getIcon}
          />
        </Fragment>
    ))

    const isToken = !!walletCoinType
    const icon = isCoinView && this.getIcon(isToken, coinType)

    return (
      <div 
        onClick={!isExtended && this.toggleExtend}
        className={`${wrapSelectClass(showMenuIndex, index)} wrap-holder`}
        >
        <div>
          <table className={`table-typeC ${isCoinView ? 'coin' : ''} ${isExtended ? 'open' : ''}`}>
            <colgroup>
              <col />
              <col />
              <col />
            </colgroup>
            <thead>
              <tr>
                <th className="a" colSpan="2">
                  {icon}
                  {walletSectionName}      
                  {!isCoinView && (<span><em className="token_num">{walletSectionData.data.length}</em></span>)}
                </th>
                <th className="c" >
                  {!isCoinView && (
                      <p className={copyState === COPY_STATE['on'] ? 'complete' : ''} onClick={this.handleCopy}>
                        {copyState === COPY_STATE['on'] ? (<em>{I18n.button.copyFinish}</em>) : (<em>{I18n.button.copyDepositAddress}</em>)}
                        <span className={`copyKey${index}`}>{account}</span>
                      </p>
                    )}
                </th>
                {
                  isCoinView && (
                    <th className="c">
                        <span className="m_icx"><em>{convertNumberToText(walletSectionBalance, coinType, true)}</em>{coinType.toUpperCase()}</span>
                        <span className="m_usd">{walletSectionBalanceWithRate !== null && <i className="_img"></i>}<em>{walletSectionBalanceWithRate !== null ? convertNumberToText(walletSectionBalanceWithRate, currency, false) : '-'}</em>{CURRENCY_UNIT[currency]}</span>
                    </th>
                  )
                }
                <th className="e">{!isCoinView && (<span onClick={this.showMenuBar}><em className="_img"></em></span>)}</th>
              </tr>

            </thead>
            { isExtended && (
              !isCoinView ?
                <tbody>
                  { coinType === 'icx' && <WalletStakingBar /> }
                  { myWalletBar }
                </tbody>
              :
                <tbody>
                  { coinType === 'icx' ? myWalletStakingBar : myWalletBar }
                </tbody>
            )}
          </table>
          {
            !isCoinView && isExtended && (
              <div className="extend">
                <span onClick={this.toggleExtend} className={isExtended && "on"}><em className="_img"></em></span>
              </div>
            )
          }
        </div>
        { showMenuIndex === index && (
          <div className="layer-wallet">
            <WalletMenuBar account={account} onClickOut={this.closeMenuBar} {...this.props} />
          </div>
        )}
      </div>
    );
  }
}

export default WalletSection;
