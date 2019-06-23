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
    const { coinType, setCurrencyList, type } = this.props
    const last = !coinType ? 'eth' : coinType === 'eth' ? 'icx' : 'eth'
    return (
      <ul className={`${type === 'default' ? "layer default" : ""}`}>
        <li onClick={() => setCurrencyList('usd')}><span>{CURRENCY_NAME['usd']}</span></li>
        <li onClick={() => setCurrencyList('btc')}><span>{CURRENCY_NAME['btc']}</span></li>
        <li onClick={() => setCurrencyList(last)}><span>{CURRENCY_NAME[last]}</span></li>
      </ul>
    )
  }
}

export default CurrencyMenuBar;
