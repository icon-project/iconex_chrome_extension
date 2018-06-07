import React, { Component } from 'react';
import InputRange from 'react-input-range';
import { nToBr } from 'utils';
import withLanguageProps from 'HOC/withLanguageProps';

const INIT_STATE = {
  gasLimitHelpLayer: false,
  gasPriceHelpLayer: false,
  dataHelpLayer: false,
}

@withLanguageProps
class EthereumGasTable extends Component {

  constructor(props) {
    super(props);
    this.state = INIT_STATE;
  }

  componentWillMount() {
    const { accountAddress, coinTypeIndex } = this.props
    // if token
    if (accountAddress !== coinTypeIndex) {
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
    if (gasPrice < 1 || gasPrice > 60) {
      return false;
    }
    this.props.setGasPrice(gasPrice)
    this.props.setCalcData()
  }

  setData = (e) => {
    this.props.setData(e.target.value);
  }

  handleDataBlur = () => {
    this.props.setDataError();
  }

  handleGasLimitBlur = () => {
    this.props.setGasLimitError();
  }

  render() {
    const {
      gasLimitHelpLayer,
      gasPriceHelpLayer,
      dataHelpLayer
    } = this.state;

    const {
      gasPrice, gasLimit, data, coinTypeIndex, accountAddress, dataError, gasLimitError, I18n
    } = this.props;

    return (
      <div id="gasTable">
        <div className="group">
          <span className="label">{I18n.transferPageLabel7}<i onMouseOver={this.toggleInfo} onMouseLeave={this.toggleInfo} data-name="gasLimitHelpLayer" className="_img"></i>
            {
              gasLimitHelpLayer && (
                <div className="help-layer">
                  <p className="title">{I18n.transferPageHelperTitle2}</p>
                  <p className="txt">{nToBr(I18n.transferPageHelperDesc2)}</p>
                </div>
              )
            }
          </span>
          <p className="error gasLimit">{I18n.error[gasLimitError]}</p>
          <input onChange={this.setGasLimit} type="text" className={`txt-type-normal ${gasLimitError && 'error'}`} placeholder={I18n.transferPagePlaceholder5} value={gasLimit} onBlur={this.handleGasLimitBlur} />
        </div>
        <div className="group money">
          <span className="label">{I18n.transferPageLabel10}<i onMouseOver={this.toggleInfo} onMouseLeave={this.toggleInfo} data-name="gasPriceHelpLayer" className="_img"></i>
            {
              gasPriceHelpLayer && (
              <div className="help-layer">
                <p className="title">{I18n.transferPageHelperTitle3}</p>
                <p className="txt">{I18n.transferPageHelperDesc3}</p>
              </div>
              )
            }
          </span>
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
        </div>
        {
          coinTypeIndex === accountAddress && (
            <div className="group">
              <span className="label">{I18n.transferPageLabel8}<em>{I18n.transferPageLabel9}</em><i onMouseOver={this.toggleInfo} onMouseLeave={this.toggleInfo} data-name="dataHelpLayer" className="_img"></i>
                {
                  dataHelpLayer && (
                  <div className="help-layer">
                    <p className="title">{I18n.transferPageHelperTitle4}</p>
                    <p className="txt">{I18n.transferPageHelperDesc4}</p>
                  </div>
                  )
                }
              </span>
              <input onChange={this.setData} type="text" className={`txt-type-normal ${dataError && 'error'}`} placeholder={I18n.transferPagePlaceholder4} value={data} onBlur={this.handleDataBlur} spellCheck="false" />
              <p className="error data">{I18n.error[dataError]}</p>
            </div>
          )
        }
      </div>
    )
  }
}

export default EthereumGasTable;
