import React, { Component } from 'react';
import withClickOut from 'HOC/withClickOut'
import { currencyName as CURRENCY_NAME } from 'constants/index';

const INIT_STATE = {

}

@withClickOut
class CurrencyMenuBar extends Component {
  constructor(props) {
    super(props);
    this.state = INIT_STATE;
  }

  render() {
    const { coinType } = this.props
    const last = !coinType ? 'eth' : coinType === 'eth' ? 'icx' : 'eth'
    return (
      <ul className={`layer ${this.props.type}`}>
        <li data-currency="usd" onClick={this.props.setCurrencyList}>{CURRENCY_NAME['usd']}</li>
        <li data-currency="btc" onClick={this.props.setCurrencyList}>{CURRENCY_NAME['btc']}</li>
        <li data-currency={last} onClick={this.props.setCurrencyList}>{CURRENCY_NAME[last]}</li>
      </ul>
    )
  }
}

export default CurrencyMenuBar;
