import React, { Component } from 'react';
import { ComboBox } from 'app/components/'
import { isEmpty, trimLeftZero, trimSpace, isValidICXInput } from 'utils/utils'
import withLanguageProps from 'HOC/withLanguageProps';

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
    const value = trimSpace(e.target.value);
    if (isValidICXInput(value)) {
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

    if (!isLoggedIn) {
      return false
    }

    if (balance <= 0) {
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
    } else {
      this.props.setTxFeeLimit(index !== selectedAccount ? 200000 : 100000);
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
      <div className="group">
        <span className="label">{I18n.transferPageLabel1}</span>
        <div className="won-group">
          <input
            type="text"
            className={`txt-type-normal ${coinQuantityError && 'error'}`}
            placeholder={I18n.transferPagePlaceholder1}
            disabled={!isLoggedIn}
            value={coinQuantity || ''}
            onChange={this.handleInputChange}
            onBlur={() => this.handleInputBlur()}
          />
          <div className="all">
            <input
              id="cbox-01"
              className="cbox-type"
              type="checkbox"
              name=""
              checked={isFullBalance}
            />
            <label htmlFor="cbox-01" className="_img" onClick={() => { isLoggedIn && this.toggleCheckBox(calcData.totalBalance) }}>{I18n.transferPageAllCheckBtn}</label>
            {isLedger && (<button onClick={() => this.props.openPopup({ popupType: 'addToken', popupNum: 1 })} className="btn-type-copy w104"><span>{I18n.addToken.title1}</span></button>)}
          </div>
          <ComboBox
            disabled={!isLoggedIn}
            list={!isEmpty(calcData) ? calcData.coinTypeObj : {}}
            index={selectedTokenId || selectedAccount}
            setIndex={this.changeCoin}
          />
          {isLoggedIn && (<span className={`won ${calcData.sendQuantityWithRate === '0' ? 'zero' : ''}`}>{calcData.sendQuantityWithRate || 0} <em>USD</em></span>)}
          {isLoggedIn && !isEmpty(calcData) && (<span className={`won ${calcData.currentBalance.toString() === '0' ? 'zero' : ''}`}>{I18n.contractBalance} {calcData.currentBalance.toString()}
            <em>{calcData.coinTypeObj[selectedTokenId || selectedAccount] && calcData.coinTypeObj[selectedTokenId || selectedAccount].toUpperCase()}</em>
          </span>)}
          <p className="error">{coinQuantityErrorText}</p>
        </div>
      </div>
    )
  }
}

export default QuantitySetter;
