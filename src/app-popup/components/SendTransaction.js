import React, { Component } from 'react';
import withLanguageProps from 'HOC/withLanguageProps';
import { convertNumberToText, fromHexToDec, beautifyJson } from 'utils'
import { setIcxWalletServer, icx_getStepPrice, icx_fetchCoinBalanceApi, icx_getTxFeeInfoApi } from 'redux/api/walletIcxApi'
import { initialStepLimit } from 'redux/reducers/exchangeTransactionReducer'
import { routeConstants as ROUTE } from 'constants/index.js';
import { getCurrentServer, icxServerList } from 'constants/config'
import withClickOut from 'HOC/withClickOut'

@withLanguageProps
class SendTransaction extends Component {

  constructor(props) {
    super(props)
    const { wallet, stepLimit } = this.props.transaction
    const { account, name, balance } = wallet || {}
    this.state = {
      account,
      name,
      balance,
      stepLimit: stepLimit || '',
      stepLimitError: '',
      stepPrice: '',
      showServerList: false,
      viewData: false,
      isDisabled: false,
      showTimeList: false,
      time: 0,
      timeList: [0, 15, 30, 45, 60, 240, 360, 720, 1440]
    }
    this.cancelClicked = false
  }

  componentWillMount() {
    this.props.getRate('usd')
    this.getStepPrice()
    window.onunload = () => {
      if (!this.cancelClicked) {
        this.cancelTransaction(true)
      }
    }
  }

  getStepPrice = async () => {
    const stepPrice = await icx_getStepPrice()
    this.setState({ stepPrice })
  }

  updateBalance = async () => {
    const { account } = this.state
    const balance = await icx_fetchCoinBalanceApi(account)
    this.setState({ balance })
  }

  handleChange = async (e) => {
    if (!isNaN(e.target.value)) {
      this.setState({ stepLimit: e.target.value })
    }
    const validateValue = await this.validateForm(e)
    if (validateValue !== false) {
      console.log('no error')
      this.setState({
        stepLimitError: '',
        isDisabled: false
      })
    }

  }

  validateBalance = () => {
    const { stepLimit, stepPrice, balance } = this.state
    const { I18n } = this.props

    const stepLimitNum = Number(stepLimit)
    const stepPriceNum = !isNaN(stepPrice) ? stepPrice : 0
    const stepPriceIcx = window.web3.fromWei(stepPriceNum, 'ether')
    const _maxStepIcx = stepLimitNum * stepPriceIcx
    const balanceNum = !isNaN(balance) ? balance : 0
    const _balanceIcx = balanceNum - _maxStepIcx
    if (_balanceIcx < 0) {
      const notEnoughBalance = I18n.error['notEnoughBalance']('icx')
      this.setState({
        stepLimitError: notEnoughBalance,
        isDisabled: true
      })
      return false
    } else {
      this.setState({
        stepLimitError: '',
        isDisabled: false
      })
      return true
    }

  }

  validateForm = async (e) => {
    const inputValue = e.target.value
    const { I18n } = this.props

    // 1. check if inputValue is empty
    if (!inputValue) {
      this.setState({
        stepLimitError: I18n.error.enterGasPrice_step,
        isDisabled: true
      })
      return false
    }

    const { stepLimit } = this.state

    // 2. check if stepLimit > max or stepLimit < min
    const txFee = await icx_getTxFeeInfoApi()
    const maxStepLimit = Number(txFee.txFeeLimitMax.toString())
    const minStepLimit = initialStepLimit(false, txFee.txFeeLimitTable)
    const stepLimitNum = Number(stepLimit)

    if (stepLimitNum > maxStepLimit) {
      const stepLimitTooHigh = I18n.error['stepLimitTooHigh'](maxStepLimit)
      this.setState({
        stepLimitError: stepLimitTooHigh,
        isDisabled: true
      })
      return false
    } else if (stepLimitNum < minStepLimit) {
      const stepLimitTooLow = I18n.error['stepLimitTooLow'](minStepLimit)
      this.setState({
        stepLimitError: stepLimitTooLow,
        isDisabled: true
      })
      return false
    }

    // 3. check if balance < max fee
    this.validateBalance()

  }

  handleKeyPress = (e) => {
    if (this.state.stepLimit && e.key === 'Enter') {
      this.confirmTransaction();
    }
  }

  listClick = () => {
    this.setState({ showServerList: true })
  }

  listClickOut = () => {
    this.setState({ showServerList: false })
  }

  closePopup = () => {
    this.props.initExternalState()
    window.chrome.runtime.sendMessage({ type: 'CLOSE_POPUP' });
  }

  confirmTransaction = async () => {
    const { I18n } = this.props
    const { stepLimit, stepPrice, time } = this.state
    const validateBalance = await this.validateBalance()

    if (!validateBalance) {
      console.log('balance error')
      return
    }

    if (!stepLimit) {
      this.setState({ stepLimitError: I18n.error.enterGasPrice_step })
      return
    }

    if (time) {
      this.props.setScoreTime({ time })
    }

    this.cancelClicked = true
    this.props.setScoreStep({ stepLimit, stepPrice })
    this.props.history.push(ROUTE['check'])

  }

  cancelTransaction = closed => {
    this.cancelClicked = true
    window.chrome.tabs.sendMessage(this.props.tabId, { type: 'CANCEL_JSON-RPC' });
    if (!closed) {
      this.closePopup()
    }
  }

  toggleViewData = () => {
    this.setState({
      viewData: !this.state.viewData
    })
  }

  toggleList = () => {
    this.setState({
      showTimeList: !this.state.showTimeList
    })
  }

  setTime = (t) => {
    this.setState({
      time: t
    })
  }

  render() {
    const { name, balance, stepLimit, stepLimitError, stepPrice, showServerList, showTimeList, time, timeList, viewData } = this.state
    const { I18n, rate, transaction, host } = this.props
    const { icx: icxRate } = rate
    const { payload } = transaction
    const { params } = payload
    const { to, value, dataType, data } = params
    const valueIcx = window.web3.fromWei(fromHexToDec(value), 'ether')
    //const valueIcx = window.web3.fromWei(fromHexToDec(price), 'ether')
    const valueUsd = valueIcx * icxRate

    const stepPriceNum = !isNaN(stepPrice) ? stepPrice : 0
    const stepPriceIcx = window.web3.fromWei(stepPriceNum, 'ether')
    const stepPriceGloop = window.web3.fromWei(stepPriceNum, 'Gwei')
    const stepPriceUsd = stepPriceIcx * icxRate
    const maxStepIcx = stepLimit * stepPriceIcx // 예상 최대 수수료

    const maxStepUsd = maxStepIcx * icxRate
    const balanceNum = !isNaN(balance) ? balance : 0
    const balanceIcx = balanceNum - maxStepIcx
    const balanceUsd = balanceIcx * icxRate

    const currentServer = getCurrentServer('icx')
    const timeLabel = (t) => t % 60 === 0 ? `${t / 60} hour${t !== 60 ? 's' : ''}` : `${t} minutes`
    return (
      <div className="wrap remittance">
        <div className="tab-holder on">
          <ul className="one">
            <li>{I18n.transfer}</li>
          </ul>
          <p className="mainnet" onClick={this.listClick}>{currentServer}<em className="_img"></em></p>
          {showServerList &&
            <ServerList
              currentServer={currentServer}
              onClickOut={this.listClickOut}
              getStepPrice={this.getStepPrice}
              updateBalance={this.updateBalance}
            />
          }
        </div>
        <div className="content-wrap">
          <div className="scroll">
            <div className="list-holder">
              <span className="name">{I18n.transferPageLabel4}</span>
              <div className="align-r">
                <input type="text" className="txt-type-normal" placeholder={name} value="" spellCheck="false" disabled />
              </div>
            </div>
            <div className="list-holder coin-num">
              <span className="name">{I18n.transferPageLabel1}</span>
              <div className="align-r">
                <p>{convertNumberToText(valueIcx, 'icx', true)}<em>ICX</em></p>
                {/* <p className="zero">{convertNumberToText(icxRate, 'usd', false)}<em>USD</em></p> */}
                <p>{convertNumberToText(valueUsd, 'usd', false)}<em>USD</em></p>
              </div>
            </div>
            <div className="list-holder">
              <span className="name">{I18n.transferPageLabel3}</span>
              <div className="align-r">
                <p>{to}</p>
              </div>
            </div>
            <div className="list-holder">
              <span className="name">{I18n.transferPageLabel7_icx}</span>
              <div className="align-r">
                <input type="text" className={`txt-type-normal${stepLimitError ? ' error' : ''}`} spellCheck="false"
                  placeholder={I18n.transferPagePlaceholder5_icx}
                  value={stepLimit}
                  onChange={this.handleChange}
                  onBlur={this.validateForm}
                  onKeyPress={this.handleKeyPress}
                />
                {stepLimitError && <p className="error">{stepLimitError}</p>}
              </div>
            </div>
            <div className="list-holder price">
              <span className="name">{I18n.transferPageLabel10_icx}</span>
              <div className="align-r">
                <span>{convertNumberToText(stepPriceIcx, 'icx', true)}
                  <em>ICX ({convertNumberToText(stepPriceGloop, 'icx', true)} Gloop)</em>
                </span>
                <span>
                  {convertNumberToText(stepPriceUsd, 'usd', false)}<em>USD</em>
                </span>
              </div>
            </div>
            {dataType && data &&
              <div className="code-holder">
                <span className="name">Tx Data</span>
                {viewData ?
                  <span className="view on" onClick={this.toggleViewData}>{I18n.transferCollapseData}<i className="_img"></i></span>
                  :
                  <span className="view" onClick={this.toggleViewData}>{I18n.transferViewData}<i className="_img"></i></span>
                }
                {viewData &&
                  <div>
                    <p>
                      {beautifyJson({ dataType, data }, '\t')}
                    </p>
                  </div>
                }
              </div>
            }
            <div className="signing-holder">
              <span className="name">Enable auto signing</span>
              <div className="layer-group" onClick={this.toggleList}>{time === 0 ? 'Don’t automatically sign' : timeLabel(time)}<i className="_img"></i>
                {
                  showTimeList &&
                  <div className="drop-box">
                    <div className="drop-layer">
                      <ul>
                        {timeList.map((t, i) => {
                          return <li key={i} className={timeList[i] === time ? 'on' : ''} onClick={() => { this.setTime(t) }}><span>{t === 0 ? 'Don’t automatically sign' : timeLabel(t)}</span></li>
                        })}
                      </ul>
                    </div>
                  </div>
                }
              </div>

              <p>This allows to <span>{host}</span> to automatically sign similar transactions on your behalf. Automatic signing is valid until the given.</p>
            </div>
            <div className="list-holder">
              <ul className="change-holder">
                <li>
                  <span className="a">{I18n.transferPageLabel5_2}</span>
                  <p>
                    <span className="b">{convertNumberToText(maxStepIcx, 'icx', true)}<em>ICX</em></span>
                    <span className="c"><i className="_img"></i><em>{convertNumberToText(maxStepUsd, 'usd', false)}</em><em>USD</em></span>
                  </p>
                </li>
                <li>
                  <span className="a">{I18n.transferPageLabel6_2}</span>
                  <p>
                    <span className="b">{convertNumberToText(balanceIcx, 'icx', true)}<em>ICX</em></span>
                    <span className="c"><i className="_img"></i><em>{convertNumberToText(balanceUsd, 'usd', false)}</em><em>USD</em></span>
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer cols-2">
          <button className="btn-type-cancel" onClick={() => { this.cancelTransaction() }}><span>{I18n.button.cancel}</span></button>
          <button className="btn-type-ok" onClick={this.confirmTransaction} disabled={stepLimitError === '' ? false : true}><span>{I18n.button.transfer}</span></button>
        </div>
      </div>
    );
  }
}

@withClickOut
class ServerList extends Component {
  handleClick = server => {
    this.props.onClickOut()
    if (this.props.currentServer !== server) {
      localStorage.setItem(`icxServer`, server);
      setIcxWalletServer()
      this.props.getStepPrice()
      this.props.updateBalance()
    }
  }

  render() {
    const serverList = Object.keys(icxServerList).filter(server => server !== this.props.currentServer)
    return (
      <ul className="layer">
        {serverList.map(
          (key, index) => {
            const server = serverList[index]
            return <li key={index} onClick={() => { this.handleClick(server) }}><span>{server}</span></li>
          }
        )}
      </ul>
    )
  }

}

export default SendTransaction;
