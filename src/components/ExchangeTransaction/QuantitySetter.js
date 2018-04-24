import React, { Component } from 'react';
import { ComboBox, CalculationTable } from 'components/'
import { EthereumGasTableContainer } from 'containers/'
import { isEmpty, checkValueLength, trimLeftZero } from 'utils/utils'
import withLanguageProps from 'HOC/withLanguageProps';

const INIT_STATE = {
  currencyIndex: 0,
  isFullBalance: false,
}

const CURRENCY = ['ICX', 'ETH', 'BTC']

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

  componentWillReceiveProps(nextProps) {
    const { accountAddress, coinTypeIndex } = nextProps;

    if ((this.props.accountAddress !== accountAddress && accountAddress)
     || (this.props.coinTypeIndex !== coinTypeIndex && coinTypeIndex)) {
      this.setState({
        currencyIndex: 0,
        isFullBalance: false,
      });
    }

    if(this.props.totalResultLoading !== nextProps.totalResultLoading && !nextProps.totalResultLoading && accountAddress) {
      this.props.setCalcData();
    }

    if (this.props.isInputReset !== nextProps.isInputReset) {
      this.setState({
        isFullBalance: false,
      });
    }
  }

  handleInputChange = (e) => {
    if (!isNaN(e.target.value) && checkValueLength(e.target.value) && !e.target.value.includes("+") && !e.target.value.includes("-")) {
      this.props.setCoinQuantity(e.target.value);
      this.setState({
        isFullBalance: false
      })

    if (typeof this.props.checkGasInfo === 'function') {
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        this.props.checkGasInfo()
      }, 250)
      }
    }
  }

  handleInputBlur = () => {
    this.props.setCoinQuantityError();
    this.props.setCoinQuantity(trimLeftZero(this.props.coinQuantity));
  }

  toggleCheckBox = (balance) => {

    let {
      isLoggedIn,
      swapPage
    } = this.props;

    if(!isLoggedIn) {
      return false
    }

    if(balance <= 0) {
      return false
    }

    if (!this.state.isFullBalance) {
      this.props.setCoinQuantity(balance)
      this.setState({
        isFullBalance: !this.state.isFullBalance
      }, () => {
        if (swapPage) {
          this.props.checkGasInfo()
        }
      })
    }
    else {
      this.setState({
        isFullBalance: !this.state.isFullBalance
      })
    }
  }

  setCurrencyIndex = (index) => {
    this.setState({currencyIndex: index})
  }

  setCoinTypeIndex = (index) => {
    const { accountAddress } = this.props;
    this.props.setAccountAddress({
      isLoggedIn: true,
      accountAddress: accountAddress,
      coinTypeIndex: index
    });

    this.setState({
      isFullBalance: false
    }, () => {
      const { accountAddress, coinTypeIndex } = this.props
      this.props.setGasLimit(accountAddress === coinTypeIndex ? 21000 : 55000);
      this.props.setCalcData()
    });
  }

  render() {

    const {
      isFullBalance,

      currencyIndex,
    } = this.state;

    const {
      calcData,
      coinQuantity,
      coinQuantityError,
      coinTypeIndex,
      accountAddress,
      pageType,
      pageTypeText,
      isLoggedIn,
      I18n,
      swapPage,
      gasLimit,
      gasPrice,
      setGasLimit,
      setGasPrice,
      setCalcData,
      gasLoading
    } = this.props;

    return (
      <div className={`quantity-holder ${calcData.coinType === 'icx' ? '' : 'ethereum'}`}>
        <div className="group">
          <span className="label">{swapPage ? I18n.swapToken.swapQuantity : I18n.transferPageLabel1}</span>
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
            </div>
            {(pageType === 'transaction' && !swapPage) && (
                <ComboBox
                  disabled={!isLoggedIn}
                  list={!isEmpty(calcData) ? calcData.coinTypeObj : ['']}
                  index={coinTypeIndex || accountAddress}
                  setIndex={this.setCoinTypeIndex}
                />
            )}
            {swapPage &&
              <ComboBox
                disabled={true}
                list={{ICX: "ICX"}}
                index={"ICX"}
                setIndex={()=>{}}
              />
            }
            {pageType === 'exchange' &&
              <div className="a-group">
                <span className="_img"></span>
              </div>
            }
            {pageType === 'exchange' &&
              <div className="b-group">
                <span className={`txt ${isLoggedIn && calcData.coinQuantityNumber !== 0 ? 'txtNumber' : ''}`}>{isLoggedIn && calcData.coinQuantityNumber !== 0 ? calcData.coinQuantityNumber : I18n.transferPageLabel2}</span>
                <ComboBox
                  disabled={!isLoggedIn}
                  list={!isEmpty(calcData) ? calcData.currencyList : CURRENCY}
                  index={currencyIndex}
                  setIndex={this.setCurrencyIndex}
                />
              </div>
            }
            {isLoggedIn && (<span className="won">{calcData.sendQuantityWithRate !== '-' && <i className="_img"></i>}<em>{calcData.sendQuantityWithRate || 0 }</em> <em>USD</em></span>)}
            <p className="error">{I18n.error[coinQuantityError]}</p>
          </div>
        </div>
    {
      (isLoggedIn && calcData.coinType !== 'icx' && !swapPage) && (
        <EthereumGasTableContainer />
      )
    }
    {
      isLoggedIn && (
        <CalculationTable
          data={calcData}
          pageType={pageType}
          pageTypeText={pageTypeText}
          swapPage={swapPage}
          gasLimit={gasLimit}
          gasPrice={gasPrice}
          gasLoading={gasLoading}
          setGasLimit={setGasLimit}
          setGasPrice={setGasPrice}
          setCalcData={setCalcData}
        />
      )
    }
      </div>
    );
  }
}

export default QuantitySetter;
