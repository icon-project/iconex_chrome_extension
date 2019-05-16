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

  getColorNum = (index) => {
    const colorNum = index % 12;
    switch(colorNum) {
      case 1:
        return 'A'
      case 2:
        return 'B'
      case 3:
        return 'C'
      case 4:
        return 'D'
      case 5:
        return 'E'
      case 6:
        return 'F'
      case 7:
        return 'G'
      case 8:
        return 'H'
      case 9:
        return 'I'
      case 10:
        return 'J'
      case 11:
        return 'K'
      case 0:
        return 'L'
      default:
        return ''
    }
  }

  getIconColor = (params) => {
      // params === index or coinType
      // if index, !isCoinView
      if(typeof params === 'number') {
        const index = params
        // if Coin, ignore it
        if(index === 0) {
          return;
        }
        return this.getColorNum(index)
      } else {
        // if coinType, isCoinView
        const { tokenArray } = this.props
        const coinType = params
        const tokenIndex = tokenArray.indexOf(coinType) + 1
        return this.getColorNum(tokenIndex)
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
        getIconColor={this.getIconColor}
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
            getIconColor={this.getIconColor}
          />
        </Fragment>
    ))

    

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
                  {/* <em className={`${isExtended && iconClass(coinType)} ${COIN_IMAGE[coinType] && 'icon'}`}>
                    {COIN_IMAGE[coinType] && (<img alt={coinType} src={COIN_IMAGE[coinType]} />)}
                  </em> */}
                  {isCoinView && (<i className={`_icon ${coinType === 'icx' ? '' : coinType === 'eth' ?  'ethereum' : this.getIconColor(coinType)}`}>{coinType === 'icx' || coinType === 'eth'  ? '' : coinType[0]}</i>)}
                  {walletSectionName}
                  
                  {!isCoinView && (<span><em className="token_num">{walletSectionData.data.length}</em></span>)}
                </th>
                {/* <th className={`b ${isCoinView ? 'coin' : ''}`}>
                </th> */}
                {/* <th class="c" ><p><em>Copy Address</em>hx1234567890123456789012345678901234567890</p></th> */}
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
                {/* {
                  !isCoinView && (
                    <th className="c">
                       <span>
                         {!!walletSectionBalanceWithRate && <i className="_img"></i>}
                         <em>{convertNumberToText(walletSectionBalanceWithRate, currency, false)}</em>{'  '+ CURRENCY_UNIT[currency]}
                       </span>
                    </th>
                  )
                } */}
                {/* <th className="d"></th> */}
                <th className="e">{!isCoinView && (<span onClick={this.showMenuBar}><em className="_img"></em></span>)}</th>
              </tr>

            </thead>
            { isExtended && (
              !isCoinView ?
              <tbody>
                { coinType === 'icx' && 
                  <WalletStakingBar />
                }
                {myWalletBar}
              </tbody>
              :
              <tbody>{coinType === 'icx' ? myWalletStakingBar : myWalletBar}</tbody>
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
