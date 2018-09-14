import React, { Component } from 'react';
import { ComboBox } from 'app/components/'
import { TxFeeAndDataContainer, CalculationTableContainer } from 'app/containers/'
import { isEmpty, checkValueLength, trimLeftZero, makeEthRawTx } from 'utils/utils'
import withLanguageProps from 'HOC/withLanguageProps';
import { IS_V3 } from 'constants/config'

const INIT_STATE = {
//  currencyIndex: 0,
//  isFullBalance: false,
}

@withLanguageProps
class QuantitySetter extends Component {

  constructor(props) {
    super(props);
    this.state = INIT_STATE;
    this.timeout = null;
  }

  componentWillUnmount() {
    clearTimeout(this.timeout)
  }

  handleInputChange = (e) => {
    const value = e.target.value.replace(/\s+/g, '');
    if (!isNaN(value) && checkValueLength(value) && !value.includes("+") && !value.includes("-")) {
      this.setCoinQuantity(value);
      this.props.toggleFullBalance(false);
    }
  }

  setCoinQuantity = (value) => {
    this.props.setCoinQuantity(value, true);
  }

  handleInputBlur = () => {
    this.props.setCoinQuantity(trimLeftZero(this.props.coinQuantity), false);
    this.props.setCoinQuantityError();
  }

  toggleCheckBox = (balance) => {

    let {
      isLoggedIn,
      isFullBalance
    } = this.props;

    if(!isLoggedIn) {
      return false
    }

    if(balance <= 0) {
      return false
    }

    if (!isFullBalance) {
      this.setCoinQuantity(balance)
      this.props.toggleFullBalance(true);
    }
    else {
      this.setCoinQuantity(0)
      this.props.toggleFullBalance(false);
    }
  }

  changeCoin = (index) => {
    const { selectedAccount, calcData } = this.props;
    this.props.setSelectedWallet({
      account: selectedAccount,
      tokenId: index === selectedAccount ? '' : index
    })

    this.props.toggleFullBalance(false);

    if (calcData.walletCoinType === 'eth') {
      this.props.setTxFeeLimit(index !== selectedAccount ? 55000 : 21000);
      this.props.setTxFeePrice(21);
    }

    this.props.setCalcData();
  }

  render() {

    const {
      calcData,
      coinQuantity,
      coinQuantityError,
      selectedTokenId,
      selectedAccount,
      isLoggedIn,
      I18n,
      swapPage,
      isFullBalance,
      isContractPage,
      isLedger
    } = this.props;

    const coinQuantityErrorText =
        coinQuantityError === 'notEnoughBalance' ? I18n.error[coinQuantityError](calcData.walletCoinType.toUpperCase())
                                                 : I18n.error[coinQuantityError];

    if (isContractPage) {
      return (
        <div className="-group">
          <p className="title">{I18n.transferPageLabel1}</p>
          <input
          	type="text"
          	className={`txt-type-normal ${coinQuantityError && 'error'}`}
          	placeholder={I18n.transferPagePlaceholder1}
          	disabled={!isLoggedIn}
          	value={coinQuantity || ''}
          	onChange={this.handleInputChange}
          	onBlur={() => this.handleInputBlur()}
          />
          <p className="error">{coinQuantityErrorText}</p>
        </div>
      )
    }

    return (
      <div className={`quantity-holder ${calcData.coinType === 'icx' ? '' : 'ethereum'}`}>
        <div className="group">
          <span className="label">{swapPage ? I18n.swapToken.swapQuantity : I18n.transferPageLabel1}</span>
          <div className="won-group">
            <input
              type="text"
              className={`txt-type-normal ${coinQuantityError && 'error'}`}
              placeholder={swapPage ? I18n.swapToken.inputPlaceholder : I18n.transferPagePlaceholder1}
              disabled={!isLoggedIn}
              value={coinQuantity || ''}
              onChange={this.handleInputChange}
              onBlur={() => this.handleInputBlur()}
            />
            <div className="all">
              <span>{I18n.transferPageAllCheckBtn}</span>
              <input
                id="quantity-setter-cbox-01"
                className="cbox-type"
                type="checkbox"
                name=""
                disabled={!isLoggedIn}
                checked={isFullBalance}
              />
              <label htmlFor="quantity-setter-cbox-01" className="_img" onClick={()=>{isLoggedIn && this.toggleCheckBox(calcData.totalBalance)}}></label>
              { IS_V3 && isLedger && (<button onClick={() => this.props.openPopup({ popupType: 'addToken', popupNum: 2 })} className="btn-type-copy w104"><span>{I18n.addToken.title1}</span></button>) }
            </div>
            {!swapPage ? (
                <ComboBox
                  disabled={!isLoggedIn}
                  list={!isEmpty(calcData) ? calcData.coinTypeObj : ['']}
                  index={selectedTokenId || selectedAccount}
                  setIndex={this.changeCoin}
                />
            ) : (
              <ComboBox
                disabled={true}
                list={{ICX: "ICX"}}
                index={"ICX"}
                setIndex={()=>{}}
                noArrow={true}
              />
            )}
            { isLoggedIn && (<span className="won">{calcData.sendQuantityWithRate !== '-' && <i className="_img"></i>}<em>{calcData.sendQuantityWithRate || 0 }</em> <em>USD</em></span>)}
            { isLoggedIn && (<p className="have">{I18n.contractBalance} {calcData.currentBalance.toString()} ICX</p>) }
            <p className="error">{coinQuantityErrorText}</p>
          </div>
        </div>
    {
      (isLoggedIn && !swapPage) && (calcData.coinType === 'icx' ? IS_V3 : true) && (
        <TxFeeAndDataContainer />
      )
    }
    {
      isLoggedIn && (
        <CalculationTableContainer
          swapPage={swapPage}
        />
      )
    }
      </div>
    )
  }
}

export default QuantitySetter;
