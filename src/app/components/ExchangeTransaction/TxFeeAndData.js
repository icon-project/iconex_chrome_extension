import React, { Component } from 'react';
import InputRange from 'react-input-range';
import { nToBr, convertNumberToText, calcIcxMessageKB } from 'utils';
import withLanguageProps from 'HOC/withLanguageProps';
import { initialStepLimit } from 'redux/reducers/exchangeTransactionReducer'

const INIT_STATE = {

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
    const value = e.target.value.replace(/\s+/g, '');
    if (!isNaN(value)) {
      this.props.setTxFeeLimit(value);
      this.props.setTxFeeModified(true);
    }
  }

  setTxFeePriceByClick = (gasPrice) => {
    if (gasPrice < 1 || gasPrice > 99) {
      return false;
    }
    this.props.setTxFeePrice(gasPrice)
    this.props.setTxFeeModified(true);
    this.props.setCalcData()
  }

  setData = (e) => {
    if (this.props.calcData.walletCoinType === 'icx' && calcIcxMessageKB({
      data: e.target.value,
      dataType: this.props.dataType
    }) > 250) {
      return;
    }
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

  setDataType = (e) => {
    const selectedDataType = e.currentTarget.getAttribute('data-type')
    this.props.setDataType(selectedDataType);
  }

  render() {

    const {
      txFeePrice,
      txFeeLimit,
      data,
      isToken,
      dataError,
      txFeeLimitError,
      I18n,
      calcData,
      isContractPage,
      txFeeLimitTable,
      txFeeLimitMax,
      dataType
    } = this.props;

    const { walletCoinType, txFeePriceWithRate } = calcData;

    const txFeeLimitErrorText =
      txFeeLimitError === 'stepLimitTooLow' ? I18n.error[txFeeLimitError](initialStepLimit(isToken, txFeeLimitTable)) :
        txFeeLimitError === 'stepLimitTooHigh' ? I18n.error[txFeeLimitError](txFeeLimitMax.toString()) :
          txFeeLimitError === 'notEnoughBalance' ? I18n.error[txFeeLimitError](calcData.walletCoinType.toUpperCase()) :
            I18n.error[txFeeLimitError];

    const dataKB = calcIcxMessageKB({
      data,
      dataType
    });

    if (isContractPage) {
      return (
        <div className="-group">
          <div className="-group">
            <span className="title">{I18n[`transferPageLabel7_${walletCoinType}`]}<i className="_img tooltip info-i"></i>
              <div className="help-layer">
                <p className="title">{I18n[`transferPageHelperTitle2_${walletCoinType}`]}</p>
                <p className="txt">{I18n[`transferPageHelperDesc2_${walletCoinType}`]}</p>
              </div>
            </span>
            <input onChange={this.setTxFeeLimit} type="text" className={`txt-type-normal ${txFeeLimitError && 'error'}`} placeholder={I18n[`transferPagePlaceholder5_${walletCoinType}`]} value={txFeeLimit} onBlur={this.handleTxFeeLimitBlur} />
            <p className="error">{txFeeLimitErrorText}</p>
          </div>
          <div className="-group price">
            <span className="title">{I18n[`transferPageLabel10_${walletCoinType}`]}<i className="_img tooltip info-i"></i>
              <div className="help-layer">
                <p className="title">{I18n[`transferPageHelperTitle3_${walletCoinType}`]}</p>
                <p ref={ref => { if (ref) ref.innerHTML = I18n[`transferPageHelperDesc3_${walletCoinType}`] }} className="txt"></p>
              </div>
            </span>
            <div className="controller">
              <span className="a loop">{convertNumberToText(window.web3.fromWei(txFeePrice, 'ether'), 'transaction', true)}<em>ICX ({convertNumberToText(window.web3.fromWei(txFeePrice, 'gwei'), 'transaction', true)} Gloop)</em></span>
              <span className="won"><i className="_img"></i><em>{txFeePriceWithRate}</em> <em>USD</em></span>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div id="gasTable">
        {walletCoinType === 'eth' && (
          <div className="group">
            <span className="label">{I18n[`transferPageLabel7_${walletCoinType}`]}<i className="_img tooltip info-i"></i>
              <div className="help-layer">
                <p className="title">{I18n[`transferPageHelperTitle2_${walletCoinType}`]}</p>
                <p className="txt">{I18n[`transferPageHelperDesc2_${walletCoinType}`]}</p>
              </div>
            </span>
            <input onChange={this.setTxFeeLimit} type="text" className={`txt-type-normal ${txFeeLimitError && 'error'}`} placeholder={I18n[`transferPagePlaceholder5_${walletCoinType}`]} value={txFeeLimit} onBlur={this.handleTxFeeLimitBlur} />
            <p className="error gasLimit">{txFeeLimitErrorText}</p>
          </div>
        )}
        {walletCoinType === 'eth' && (
          <div className="group money">
            <span className="label">{I18n[`transferPageLabel10_${walletCoinType}`]}<i className="_img tooltip info-i"></i>
              <div className="help-layer">
                <p className="title">{I18n[`transferPageHelperTitle3_${walletCoinType}`]}</p>
                <p ref={ref => { if (ref) ref.innerHTML = I18n[`transferPageHelperDesc3_${walletCoinType}`] }} className="txt"></p>
              </div>
            </span>
            <div className="controller">
              <span className="a">{txFeePrice}<em>Gwei</em></span>

              <button onClick={() => this.setTxFeePriceByClick(txFeePrice - 1)} className="b minus"><em className="_img"></em></button>
              <button onClick={() => this.setTxFeePriceByClick(txFeePrice + 1)} className="b plus"><em className="_img"></em></button>
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
                onChange={txFeePrice => {
                  this.props.setTxFeePrice(txFeePrice);
                  this.props.setTxFeeModified(true);
                }}
                onChangeComplete={() => this.props.setCalcData()} />
              <ul id="dragBar">
                <li>1 <em>({I18n.transferPageSlow})</em></li>
                <li>99 <em>({I18n.transferPageFast})</em></li>
              </ul>
            </div>
          </div>
        )}
        {
          !isToken && (
            <div className="group datainput">
              <span className="label">{I18n.transferPageLabel8}<em>{I18n.transferPageLabel9}</em><i className="_img tooltip info-i"></i>
                <div className="help-layer">
                  <p className="title">{I18n[`transferPageHelperTitle4_${walletCoinType}`]}</p>
                  <p className="txt">{I18n[`transferPageHelperDesc4_${walletCoinType}`]}</p>
                </div>
              </span>
              {
                walletCoinType === 'icx' && (
                  <div className="-holder">
                    <ul className="coin">
                      <li onClick={this.setDataType} data-type='utf8'>
                        <input id="rbox-01" className="rbox-type" type="radio" name="rbox-1" checked={dataType === 'utf8'} readOnly />
                        <label htmlFor="rbox-01" className="_img">UTF-8</label>
                      </li>
                      <li onClick={this.setDataType} data-type='hex'>
                        <input id="rbox-02" className="rbox-type" type="radio" name="rbox-1" checked={dataType === 'hex'} readOnly />
                        <label htmlFor="rbox-02" className="_img">HEX</label>
                      </li>
                    </ul>
                  </div>
                )
              }
            </div>
          )
        }
        {
          !isToken && (
            <div className={`input-group ${dataError && 'error'}`}>
              <textarea style={walletCoinType === 'eth' ? { marginTop: '-40px', resize: 'none' } : { resize: 'none' }} onChange={this.setData} onBlur={this.handleDataBlur} value={data} placeholder={`${I18n.transferPageLabel8} ${I18n.transferPageLabel9}`}></textarea>
              <p className="error data">{I18n.error[dataError]}</p>
              {walletCoinType === 'icx' && (<p><span>≒ {dataKB}KB</span> / 250KB</p>)}
            </div>
          )
        }
      </div>
    )
  }
}

export default TxFeeAndData;
