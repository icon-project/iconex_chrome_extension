import React, { Component } from 'react';
import { LoadingComponent } from 'app/components/'
import withLanguageProps from 'HOC/withLanguageProps';

const INIT_STATE = {
  currencyIndex: 0,
  data: {},
  coinQuantity: '0',
  coinQuantityError: '',
  isFullBalance: false,
  txFeeHelpLayer: false
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
    const { data, pageType, I18n, swapPage, gasLimit, gasPrice } =this.props;
    const { txFeeHelpLayer } = this.state;
    return (
      <ul className="change-group">
        {/* if swap page */}
        {swapPage &&
        <li>
          {/* TODO loadingComponent */}
          <span className="a">{I18n.swapToken.gasLimit}</span>
          <span className="b num">{gasLimit === 0 ? '-' : gasLimit}</span>
        </li>
        }
        {swapPage &&
        <li>
          {/* TODO loadingComponent */}
          <span className="a">{I18n.swapToken.gasPrice}</span>
          <span className="b num">{gasPrice === 0 ? '-': gasPrice}<em>Gwei</em></span>
        </li>
        }
        {(pageType === 'transaction' || swapPage) &&
        <li>
          <span className="a">
            {data.coinType !== 'icx' ? I18n.transferPageLabel5_2 : I18n.transferPageLabel5_1}
            {data.coinType !== 'icx' && <i onMouseOver={this.toggleInfo} onMouseLeave={this.toggleInfo} data-name="txFeeHelpLayer" className="_img"></i>}
            {
              txFeeHelpLayer && (
                <div className="help-layer">
                  <p className="title">{I18n.transferPageHelperTitle1}</p>
                  <p className="txt">{I18n.transferPageHelperDesc1}</p>
                </div>
              )
            }
          </span>
          {
            data.txFee ? (<span className={`b`}>{ swapPage && data.txFee === "0" ? '-' : data.txFee }<em>{`${data.coinType === 'icx' ? data.coinType.toUpperCase() : 'ETH'}`}</em></span>)
                       : (<span className={`load b`}><LoadingComponent type="black"/></span>)
          }
          {
            data.txFeeWithRate ? <span className={`c`}><em>{ !(swapPage && data.txFeeWithRate === "0") && <i className="_img"></i>}{ swapPage && data.txFeeWithRate === "0" ? '-' : data.txFeeWithRate }</em> <em>USD</em></span>
                               : <span className={`load c`}><LoadingComponent type="black"/></span>
          }
        </li>
        }
        <li>
          <span className={`${data.resultBalance && data.resultBalance.includes("-") && 'minus'} a`}>{data.coinType !== 'icx' ? I18n.transferPageLabel6_2 : I18n.transferPageLabel6_1}</span>
          {
            data.resultBalance ? <span className={`${data.resultBalance.includes("-") && 'minus'} b`}>{ data.resultBalance }<em>{data.coinType.toUpperCase()}</em></span>
                               : <span className={`load b`}><LoadingComponent type="black"/></span>
          }
          {
            data.resultBalanceWithRate ? <span className={`${data.resultBalanceWithRate && data.resultBalance.includes("-") && 'minus'} c`}><em>{data.resultBalanceWithRate !== '-' && <i className="_img"></i>}{data.resultBalanceWithRate}</em> <em>USD</em></span>
                                       : <span className={`load c`}><LoadingComponent type="black"/></span>
          }
        </li>
      </ul>
    )
  }
}

export default CalculationTable;
