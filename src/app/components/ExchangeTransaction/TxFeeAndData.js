import React, { Component } from 'react';
import InputRange from 'react-input-range';
import { nToBr, convertNumberToText, dataToHex } from 'utils';
import BigNumber from 'bignumber.js';
import withLanguageProps from 'HOC/withLanguageProps';

const INIT_STATE = {
  txFeeLimitHelpLayer: false,
  txFeePriceHelpLayer: false,
  dataHelpLayer: false,
  showDataInput: false
}

@withLanguageProps
class TxFeeAndData extends Component {

  constructor(props) {
    super(props);
    this.state = INIT_STATE;
  }

  componentWillMount() {
    const { calcData, isToken } = this.props
    const { walletCoinType } = calcData;
    if (walletCoinType === 'icx') {
      this.props.getTxFeeInfo({});
    } else {
      if (isToken) {
        this.props.setTxFeeLimit(55000);
      }
    }
  }

  toggleInfo = (e) => {
    const target = e.target.getAttribute('data-name');
    this.setState({
      [target]: !this.state[target]
    })
  }

  setTxFeeLimit = (e) => {
    if (!isNaN(e.target.value)) {
      this.props.setTxFeeLimit(e.target.value);
    }
  }

  setTxFeePriceByClick = (gasPrice) => {
    if (gasPrice < 1 || gasPrice > 99) {
      return false;
    }
    this.props.setTxFeePrice(gasPrice)
    this.props.setCalcData()
  }

  setData = (e) => {
    this.props.setData(e.target.value);
  }

  handleDataBlur = () => {
    this.props.setDataError();
  }

  handleTxFeeLimitBlur = () => {
    if (this.props.isContractPage) {
      this.props.setContractTxFeeLimitError();
    } else {
      this.props.setTxFeeLimitError();
    }
  }

  toggleDataInput = () => {
    if (this.state.showDataInput) {
      this.props.setData('');
      this.props.setDataError();
    }
    this.setState({
      showDataInput: !this.state.showDataInput
    })
  }

  render() {
    const {
      txFeeLimitHelpLayer,
      txFeePriceHelpLayer,
      dataHelpLayer,
      showDataInput
    } = this.state;

    const {
      txFeePrice, txFeeLimit, data, isToken, dataError, txFeeLimitError, I18n, calcData, isContractPage
    } = this.props;

    const { walletCoinType, txFeePriceWithRate } = calcData;

    if (isContractPage) {
      return (
      <div className="-group">
        <div className="-group">
					<span className="title">{I18n[`transferPageLabel7_${walletCoinType}`]}<i onMouseOver={this.toggleInfo} onMouseLeave={this.toggleInfo} data-name="txFeeLimitHelpLayer" className="_img"></i>
            {
              txFeeLimitHelpLayer && (
                <div className="help-layer">
                  <p className="title">{I18n[`transferPageHelperTitle2_${walletCoinType}`]}</p>
                  <p className="txt">{nToBr(I18n[`transferPageHelperDesc2_${walletCoinType}`])}</p>
                </div>
              )
            }
					</span>
				  <input onChange={this.setTxFeeLimit} type="text" className={`txt-type-normal ${txFeeLimitError && 'error'}`} placeholder={I18n[`transferPagePlaceholder5_${walletCoinType}`]} value={txFeeLimit} onBlur={this.handleTxFeeLimitBlur} />
          <p className="error">{I18n.error[txFeeLimitError]}</p>
				</div>
        <div className="-group price">
					<span className="title">{I18n[`transferPageLabel10_${walletCoinType}`]}<i onMouseOver={this.toggleInfo} onMouseLeave={this.toggleInfo} data-name="txFeePriceHelpLayer" className="_img"></i>
            {
              txFeePriceHelpLayer && (
              <div className="help-layer">
                <p className="title">{I18n[`transferPageHelperTitle3_${walletCoinType}`]}</p>
                <p ref={ref => {if (ref) ref.innerHTML = I18n[`transferPageHelperDesc3_${walletCoinType}`]}} className="txt"></p>
              </div>
              )
            }
					</span>
          <ul className="change-group">
						<li className="loop">
							<span className="b">{convertNumberToText(window.web3.fromWei(txFeePrice, 'ether'), 'transaction', true)}<em>ICX ({convertNumberToText(window.web3.fromWei(txFeePrice, 'gwei'), 'transaction', true)} Gloop)</em></span>
							<span className="c"><i className="_img"></i><em>{txFeePriceWithRate}</em> <em>USD</em></span>
						</li>
					</ul>
				</div>
      </div>
      )
    }

    return (
      <div id="gasTable">
        <div className="group">
          <span className="label">{I18n[`transferPageLabel7_${walletCoinType}`]}<i onMouseOver={this.toggleInfo} onMouseLeave={this.toggleInfo} data-name="txFeeLimitHelpLayer" className="_img"></i>
            {
              txFeeLimitHelpLayer && (
                <div className="help-layer">
                  <p className="title">{I18n[`transferPageHelperTitle2_${walletCoinType}`]}</p>
                  <p className="txt">{nToBr(I18n[`transferPageHelperDesc2_${walletCoinType}`])}</p>
                </div>
              )
            }
          </span>
          <p className="error gasLimit">{I18n.error[txFeeLimitError]}</p>
          <input onChange={this.setTxFeeLimit} type="text" className={`txt-type-normal ${txFeeLimitError && 'error'}`} placeholder={I18n[`transferPagePlaceholder5_${walletCoinType}`]} value={txFeeLimit} onBlur={this.handleTxFeeLimitBlur} />
        </div>
        <div className="group money">
          <span className="label">{I18n[`transferPageLabel10_${walletCoinType}`]}<i onMouseOver={this.toggleInfo} onMouseLeave={this.toggleInfo} data-name="txFeePriceHelpLayer" className="_img"></i>
            {
              txFeePriceHelpLayer && (
              <div className="help-layer">
                <p className="title">{I18n[`transferPageHelperTitle3_${walletCoinType}`]}</p>
                <p ref={ref => {if (ref) ref.innerHTML = I18n[`transferPageHelperDesc3_${walletCoinType}`]}} className="txt"></p>
              </div>
              )
            }
          </span>
          {
            walletCoinType === 'icx' ? (
              <div className="controller">
								<span className="a loop"><em>{convertNumberToText(window.web3.fromWei(txFeePrice, 'ether'), 'transaction', true)}</em>ICX ({convertNumberToText(window.web3.fromWei(txFeePrice, 'gwei'), 'transaction', true)} Gloop)</span>
                <span className="won"><i className="_img"></i><em>{txFeePriceWithRate}</em> <em>USD</em></span>
    					</div>
            ) : (
              <div className="controller">
                <span className="a"><em>{txFeePrice}</em>Gwei</span>

                <button onClick={() => this.setTxFeePriceByClick(txFeePrice - 1)} className="b minus"><em className="_img"></em></button>
                <button onClick={() => this.setTxFeePriceByClick(txFeePrice + 1)} className="b plus"><em className="_img"></em></button>
                <span className="c">{I18n.transferPageSlow}</span>
                <InputRange
                  maxValue={99}
                  minValue={1}
                  value={txFeePrice}
                  step={1}
                  classNames={{
                    minLabel: 'none',
                    maxLabel: 'none',
                    valueLabel: 'none',
                    inputRange: 'drag-holder',
                    track: 'bg',
                    activeTrack: 'bar',
                    sliderContainer: 'drag-wrap',
                    slider: 'drag'
                  }}
                  onChange={txFeePrice => this.props.setTxFeePrice(txFeePrice)}
                  onChangeComplete={() => this.props.setCalcData()} />
                <ul>
                  <li>1</li>
                  <li>10</li>
                  <li>20</li>
                  <li>30</li>
                  <li>40</li>
                  <li>50</li>
                  <li>60</li>
                  <li>70</li>
                  <li>80</li>
                  <li>90</li>
                  <li>99</li>
                </ul>
                <span>{I18n.transferPageFast}</span>
              </div>
            )
          }
        </div>
        {
          !isToken && (
            <div className="group datainput">
							<span className="label">{I18n.transferPageLabel8}<em>{I18n.transferPageLabel9}</em><i onMouseOver={this.toggleInfo} onMouseLeave={this.toggleInfo} data-name="dataHelpLayer" className="_img"></i>
                {
                  dataHelpLayer && (
                  <div className="help-layer">
                    <p className="title">{I18n[`transferPageHelperTitle4_${walletCoinType}`]}</p>
                    <p className="txt">{I18n[`transferPageHelperDesc4_${walletCoinType}`]}</p>
                  </div>
                  )
                }
							</span>
							<div className="-holder">
								<button onClick={this.toggleDataInput} className="btn-type-copy"><span>{I18n[`dataInput${showDataInput ? 'Close' : 'Open'}`]}</span></button>
							</div>
						</div>
          )
        }
        {
          !isToken && showDataInput && (
            <div className={`input-group ${dataError && 'error'}`}>
							<textarea onChange={this.setData} onBlur={this.handleDataBlur} value={data} placeholder={`${I18n.transferPageLabel8} ${I18n.transferPageLabel9}`}></textarea>
              <p className="error data">{I18n.error[dataError]}</p>
							{/* <p><span>{data.length}</span>/500</p> */}
							{/* <button className="btn-type-search2 auto"><span>적정 Step 한도 조회</span></button> */}
						</div>
          )
        }
      </div>
    )
  }
}

export default TxFeeAndData;
