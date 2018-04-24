import React, { Component } from 'react';
import { CurrencyMenuBar } from 'components/'
import { currencyUnit as CURRENCY_UNIT } from 'constants/index'
import { convertNumberToText, isEmpty } from 'utils'
import withLanguageProps from 'HOC/withLanguageProps';

const INIT_STATE = {
  currency: 'USD',
  showInfo: false,
  showCurrencyList: false
}

@withLanguageProps
class MyWalletHeaderLeft extends Component {

  constructor(props) {
    super(props);
    this.state = INIT_STATE;
  }

  showInfo = () => {
    this.setState({
      showInfo: true
    })
  }

  hideInfo = () => {
    this.setState({
      showInfo: false
    })
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

  render() {
    const {
      dataSortedByCoin
    } = this.props;
    const { I18n } = this.props;

    return (
      <div className="a-group">
        <div className="a">
          <span>{I18n.myWalletHeaderTotalValue}<em onMouseOver={this.showInfo} onMouseLeave={this.hideInfo} className="_img"></em></span>
        </div>
        <div className="b small">
          <span>{!!this.props.totalBalance && <i className="_img"></i>}<em className={(this.props.totalBalance === 0 ? 'zero' : '')}>{convertNumberToText(this.props.totalBalance, this.props.currency, false)}</em></span>
          <span onClick={this.toggleCurrencyList} className="unit">{CURRENCY_UNIT[this.props.currency]}<em className="_img"></em>
            {this.state.showCurrencyList && (
              <CurrencyMenuBar type="default" onClickOut={this.toggleCurrencyList} setCurrencyList={this.setCurrencyList} />
            )}
          </span>
          <p>{I18n.myWalletHeaderInfo_3}</p>
        </div>
        <div className="c">
          <span>{I18n.myWalletHeaderCoinNum}<em className={(!isEmpty(dataSortedByCoin) && Object.keys(dataSortedByCoin['coin']).length === 0) ? 'zero' : ''}>{!isEmpty(dataSortedByCoin) && Object.keys(dataSortedByCoin['coin']).length}</em><em>{I18n.myWalletHeaderNumUnit}</em></span>
          <span>{I18n.myWalletHeaderTokenNum}<em className={(!isEmpty(dataSortedByCoin) && Object.keys(dataSortedByCoin['token']).length === 0) ? 'zero' : ''}>{!isEmpty(dataSortedByCoin) && Object.keys(dataSortedByCoin['token']).length}</em><em>{I18n.myWalletHeaderNumUnit}</em></span>
        </div>
        {
          this.state.showInfo && (
            <div className="layer left">
              {I18n.myWalletHeaderInfo_1}<br/>{I18n.myWalletHeaderInfo_2}
  					</div>
          )
        }
      </div>
    );
  }
}

export default MyWalletHeaderLeft;
