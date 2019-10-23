import React, { Component } from 'react';
import { CurrencyMenuBar } from 'app/components/'
import { currencyUnit as CURRENCY_UNIT } from 'constants/index'
import { convertNumberToText, isEmpty, convertStakeValueToText } from 'utils'
import withLanguageProps from 'HOC/withLanguageProps';
import BigNumber from 'bignumber.js';

const INIT_STATE = {
  currency: 'USD',
  showCurrencyList: false
}

@withLanguageProps
class MyWalletHeaderLeft extends Component {

  constructor(props) {
    super(props);
    this.state = INIT_STATE;
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

  render() {
    const {
      showCurrencyList
    } = this.state
    const {
      I18n,
      dataSortedByCoin,
      graphData: {
        totalDelegated = new BigNumber(0),
        available = new BigNumber(0),
      }
    } = this.props;

    return (
      <div className="a-group">
        <div className="a">
          <span>{I18n.myWalletHeaderTotalValue}
            <em className="_img"></em>
            <div className="layer left">
              {I18n.myWalletHeaderInfo_1}<br />{I18n.myWalletHeaderInfo_2}
            </div>
          </span>
        </div>
        <div className="b">
          <span><em className={(this.props.totalBalance === 0 ? 'zero' : '')}>{convertNumberToText(this.props.totalBalance, this.props.currency, false)}</em></span>
          <span onClick={this.toggleCurrencyList} className={`unit ${showCurrencyList ? "on" : ""}`}>{CURRENCY_UNIT[this.props.currency]}<em className="_img"></em>
            {showCurrencyList && (
              <CurrencyMenuBar type="default" onClickOut={this.toggleCurrencyList} setCurrencyList={this.setCurrencyList} />
            )}
          </span>
          <p>{I18n.myWalletHeaderInfo_3}</p>
        </div>
        <div className="c">
          <span>{I18n.myWalletHeaderCoinNum}
            <em className={(!isEmpty(dataSortedByCoin) && Object.keys(dataSortedByCoin['coin']).length === 0) ? 'zero' : ''}>
              {!isEmpty(dataSortedByCoin) && Object.keys(dataSortedByCoin['coin']).length}
            </em>
            <em>{I18n.myWalletHeaderNumUnit}</em>
          </span>
          <span>{I18n.myWalletHeaderTokenNum}
            <em className={(!isEmpty(dataSortedByCoin) && Object.keys(dataSortedByCoin['token']).length === 0) ? 'zero' : ''}>
              {!isEmpty(dataSortedByCoin) && Object.keys(dataSortedByCoin['token']).length}
            </em>
            <em>{I18n.myWalletHeaderNumUnit}</em>
          </span>
          <span>{I18n.myWalletHeader_totalVote}
            <em>{convertStakeValueToText(totalDelegated.plus(available))}</em>
          </span>
        </div>
      </div>
    );
  }
}

export default MyWalletHeaderLeft;
