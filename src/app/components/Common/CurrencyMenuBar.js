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
      <div className="drop-layer">
        <ul>
          <li data-currency="usd" onClick={this.props.setCurrencyList}><span>{CURRENCY_NAME['usd']}</span></li>
          <li data-currency="btc" onClick={this.props.setCurrencyList}><span>{CURRENCY_NAME['btc']}</span></li>
          <li data-currency={last} onClick={this.props.setCurrencyList}><span>{CURRENCY_NAME[last]}</span></li>
        </ul>
      </div>
    )
  }
}

export default CurrencyMenuBar;
