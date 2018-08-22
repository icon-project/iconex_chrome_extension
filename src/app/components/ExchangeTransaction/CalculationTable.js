import React, { Component } from 'react';
import { LoadingComponent } from 'app/components/'
import withLanguageProps from 'HOC/withLanguageProps';

const INIT_STATE = {
  currencyIndex: 0,
  data: {},
  coinQuantity: '0',
  coinQuantityError: '',
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
    const { calcData: data, I18n, swapPage, txFeeLimit, txFeePrice, isContractPage } = this.props;
    const { walletCoinType } = data;
    const { txFeeHelpLayer } = this.state;
    return (
      <ul className="change-group">
        {/* if swap page */}
        {swapPage &&
        <li>
          {/* TODO loadingComponent */}
          <span className="a">{I18n.swapToken.gasLimit}</span>
          <span className="b num">{txFeeLimit === 0 ? '-' : txFeeLimit}</span>
        </li>
        }
        {swapPage &&
        <li>
          {/* TODO loadingComponent */}
          <span className="a">{I18n.swapToken.gasPrice}</span>
          <span className="b num">{txFeePrice === 0 ? '-': txFeePrice}<em>Gwei</em></span>
        </li>
        }
        <li style={isContractPage && {marginTop: 40}}>
          <span className="a">
            {I18n.transferPageLabel5_2}
            <i onMouseOver={this.toggleInfo} onMouseLeave={this.toggleInfo} data-name="txFeeHelpLayer" className="_img"></i>
            {
              txFeeHelpLayer && (
                <div className="help-layer">
                  <p className="title">{I18n[`transferPageHelperTitle1_${walletCoinType}`]}</p>
                  <p className="txt">{I18n[`transferPageHelperDesc1_${walletCoinType}`]}</p>
                </div>
              )
            }
          </span>
          {
            data.txFee ? (<span className={`b`}>{ swapPage && data.txFee === "0" ? '-' : data.txFee }<em>{`${data.walletCoinType === 'icx' ? 'ICX' : 'ETH'}`}</em></span>)
                       : (<span className={`load b`}><LoadingComponent type="black"/></span>)
          }
          {
            data.txFeeWithRate ? <span className={`c`}><em>{ !(swapPage && data.txFeeWithRate === "0") && <i className="_img"></i>}{ swapPage && data.txFeeWithRate === "0" ? '-' : data.txFeeWithRate }</em> <em>USD</em></span>
                               : swapPage ? (<span className='c'></span>) : (<span className={`load c`}><LoadingComponent type="black"/></span>)
          }
        </li>
        <li>
          <span className={`${data.resultBalance && data.resultBalance.includes("-") && 'minus'} a`}>{data.walletCoinType !== 'icx' ? I18n.transferPageLabel6_2 : I18n.transferPageLabel6_1}</span>
          {
            data.resultBalance ? <span className={`${data.resultBalance.includes("-") && 'minus'} b`}>{ data.resultBalance }<em>{data.coinType.toUpperCase()}</em></span>
                               : <span className={`load b`}><LoadingComponent type="black"/></span>
          }
          {
            data.resultBalanceWithRate ? <span className={`${data.resultBalanceWithRate && data.resultBalance.includes("-") && 'minus'} c`}><em>{data.resultBalanceWithRate !== '-' && <i className="_img"></i>}{data.resultBalanceWithRate}</em> <em>USD</em></span>
                                       : swapPage ? (<span className='c'></span>) : (<span className={`load c`}><LoadingComponent type="black"/></span>)
          }
        </li>
      </ul>
    )
  }
}

export default CalculationTable;
