import React, { Component } from 'react';
import InputRange from 'react-input-range';
import { nToBr, convertNumberToText, dataToHex } from 'utils';
import withLanguageProps from 'HOC/withLanguageProps';

const INIT_STATE = {
  gasLimitHelpLayer: false,
  gasPriceHelpLayer: false,
  dataHelpLayer: false,
  showDataInput: false
}

@withLanguageProps
class GasStepTable extends Component {

  constructor(props) {
    super(props);
    this.state = INIT_STATE;
  }

  componentWillMount() {
    const { isToken } = this.props
    // if token
    if (isToken) {
      this.props.setGasLimit(55000);
      this.props.setCalcData()
    }
  }

  toggleInfo = (e) => {
    const target = e.target.getAttribute('data-name');
    this.setState({
      [target]: !this.state[target]
    })
  }

  setGasLimit = (e) => {
    if (!isNaN(e.target.value)) {
      this.props.setGasLimit(e.target.value);
    }
  }

  setGasPriceByClick = (gasPrice) => {
    if (gasPrice < 1 || gasPrice > 99) {
      return false;
    }
    this.props.setGasPrice(gasPrice)
    this.props.setCalcData()
  }

  setData = (e) => {
    console.log(dataToHex(e.target.value))
    console.log(decodeURIComponent(escape(dataToHex(e.target.value))))
    this.props.setData(e.target.value);
  }

  handleDataBlur = () => {
    this.props.setDataError();
  }

  handleGasLimitBlur = () => {
    if (this.props.isContractPage) {
      this.props.setContractGasLimitError();
    } else {
      this.props.setGasLimitError();
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
      gasLimitHelpLayer,
      gasPriceHelpLayer,
      dataHelpLayer,
      showDataInput
    } = this.state;

    const {
      gasPrice, gasLimit, data, isToken, dataError, gasLimitError, I18n, calcData, isContractPage
    } = this.props;

    const { walletCoinType, gasPriceWithRate } = calcData;

    if (isContractPage) {
      return (
      <div className="-group">
        <div className="-group">
					<span className="title">{I18n[`transferPageLabel7_${walletCoinType}`]}<i onMouseOver={this.toggleInfo} onMouseLeave={this.toggleInfo} data-name="gasLimitHelpLayer" className="_img"></i>
            {
              gasLimitHelpLayer && (
                <div className="help-layer">
                  <p className="title">{I18n[`transferPageHelperTitle2_${walletCoinType}`]}</p>
                  <p className="txt">{nToBr(I18n[`transferPageHelperDesc2_${walletCoinType}`])}</p>
                </div>
              )
            }
					</span>
				  <input onChange={this.setGasLimit} type="text" className={`txt-type-normal ${gasLimitError && 'error'}`} placeholder={I18n[`transferPagePlaceholder5_${walletCoinType}`]} value={gasLimit} onBlur={this.handleGasLimitBlur} />
          <p className="error">{I18n.error[gasLimitError]}</p>
				</div>
        <div className="-group price">
					<span className="title">{I18n[`transferPageLabel10_${walletCoinType}`]}<i onMouseOver={this.toggleInfo} onMouseLeave={this.toggleInfo} data-name="gasPriceHelpLayer" className="_img"></i>
            {
              gasPriceHelpLayer && (
              <div className="help-layer">
                <p className="title">{I18n[`transferPageHelperTitle3_${walletCoinType}`]}</p>
                <p className="txt">{I18n[`transferPageHelperDesc3_${walletCoinType}`]}</p>
              </div>
              )
            }
					</span>
          <ul className="change-group">
						<li className="loop">
							<span className="b">{convertNumberToText(gasPrice, 'transaction', true)}<em>Loop</em></span>
							<span className="c"><i className="_img"></i><em>{gasPriceWithRate}</em> <em>USD</em></span>
						</li>
					</ul>
				</div>
      </div>
      )
    }

    return (
      <div id="gasTable">
        <div className="group">
          <span className="label">{I18n[`transferPageLabel7_${walletCoinType}`]}<i onMouseOver={this.toggleInfo} onMouseLeave={this.toggleInfo} data-name="gasLimitHelpLayer" className="_img"></i>
            {
              gasLimitHelpLayer && (
                <div className="help-layer">
                  <p className="title">{I18n[`transferPageHelperTitle2_${walletCoinType}`]}</p>
                  <p className="txt">{nToBr(I18n[`transferPageHelperDesc2_${walletCoinType}`])}</p>
                </div>
              )
            }
          </span>
          <p className="error gasLimit">{I18n.error[gasLimitError]}</p>
          <input onChange={this.setGasLimit} type="text" className={`txt-type-normal ${gasLimitError && 'error'}`} placeholder={I18n[`transferPagePlaceholder5_${walletCoinType}`]} value={gasLimit} onBlur={this.handleGasLimitBlur} />
        </div>
        <div className="group money">
          <span className="label">{I18n[`transferPageLabel10_${walletCoinType}`]}<i onMouseOver={this.toggleInfo} onMouseLeave={this.toggleInfo} data-name="gasPriceHelpLayer" className="_img"></i>
            {
              gasPriceHelpLayer && (
              <div className="help-layer">
                <p className="title">{I18n[`transferPageHelperTitle3_${walletCoinType}`]}</p>
                <p className="txt">{I18n[`transferPageHelperDesc3_${walletCoinType}`]}</p>
              </div>
              )
            }
          </span>
          {
            walletCoinType === 'icx' ? (
              <div className="controller">
    								<span className="a"><em>{convertNumberToText(gasPrice, 'transaction', true)}</em>Loop</span>
    						    <span className="won"><i className="_img"></i><em>{gasPriceWithRate}</em> <em>USD</em></span>
    					</div>
            ) : (
              <div className="controller">
                <span className="a"><em>{gasPrice}</em>Gwei</span>
                <button onClick={() => this.setGasPriceByClick(gasPrice - 1)} className="b minus"><em className="_img"></em></button>
                <button onClick={() => this.setGasPriceByClick(gasPrice + 1)} className="b plus"><em className="_img"></em></button>
                <span className="c">{I18n.transferPageSlow}</span>
                <InputRange
                  maxValue={99}
                  minValue={1}
                  value={gasPrice}
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
                  onChange={gasPrice => this.props.setGasPrice(gasPrice)}
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
								<button onClick={this.toggleDataInput} className="btn-type-copy w104"><span>{I18n[`dataInput${showDataInput ? 'Close' : 'Open'}`]}</span></button>
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

export default GasStepTable;
