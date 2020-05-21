import React, { Component } from 'react';
import { LoadingComponent } from 'app/components/'
import withLanguageProps from 'HOC/withLanguageProps';
import { convertNumberToText } from 'utils'

const INIT_STATE = {
  currencyIndex: 0,
  data: {},
  coinQuantity: '0',
  coinQuantityError: ''
}

@withLanguageProps
class CalculationTable extends Component {

  constructor(props) {
    super(props);
    this.state = INIT_STATE;
  }

  toggleInfo = (e) => {
    const target = e.target.getAttribute('data-name');
    this.setState({
      [target]: !this.state[target]
    })
  }

  render() {
    const { calcData: data, I18n } = this.props;
    const { walletCoinType, txFeeLimit, txFeePrice } = data;
    return (
      <div className="table-holder common">
        <table>
          <colgroup>
            <col />
            <col />
            <col />
            <col />
            <col />
          </colgroup>
          <thead>
          </thead>
          <tbody>
            {
              data.walletCoinType === 'icx' && (
                <tr>
                  <td>{I18n.estimatedStepAndPrice}</td>
                  <td>{convertNumberToText(txFeeLimit, 'icx', true)} <em> / </em> {convertNumberToText(txFeePrice, 'icx', true)}</td>
                  <td>ICX</td>
                  <td></td>
                  <td></td>
                </tr>
              )
            }
            <tr>
              <td>{I18n.transferPageLabel5_2}<i className="_img tooltip info-i"></i>
                <div className="help-layer">
                  <p className="title">{I18n[`transferPageHelperTitle1_${walletCoinType}`]}</p>
                  <p className="txt">{I18n[`transferPageHelperDesc1_${walletCoinType}`]}</p>
                </div>
              </td>
              {
                data.txFee
                  ? (<td>{data.txFee}</td>)
                  : (<td><LoadingComponent type="black" /></td>)
              }
              <td>{`${data.walletCoinType === 'icx' ? 'ICX' : 'ETH'}`}</td>
              {
                data.txFeeWithRate
                  ? (<td>{data.txFeeWithRate}</td>)
                  : (<td><LoadingComponent type="black" /></td>)
              }
              <td>USD</td>
            </tr>
            <tr>
              <td>{I18n.transferPageLabel6_2}</td>
              {
                data.resultBalance
                  ? (<td>{data.resultBalance}</td>)
                  : (<td><LoadingComponent type="black" /></td>)
              }
              <td>{data.coinType ? data.coinType.toUpperCase() : '' }</td>
              {
                data.resultBalanceWithRate
                  ? (<td>{data.resultBalanceWithRate}</td>)
                  : (<td><LoadingComponent type="black" /></td>)
              }
              <td>USD</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default CalculationTable;
