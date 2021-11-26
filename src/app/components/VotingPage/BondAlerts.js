import React, { Component } from 'react'
import { Alert } from 'app/components'
import { IissLedgerIframeContainer } from 'app/containers'
import { txidUrl as TXID_URL } from 'constants/config.js'
import { convertStakeValueToText, toLoop } from 'utils'
import withLanguageProps from 'HOC/withLanguageProps';


@withLanguageProps
export default class BondAlerts extends Component {

  state = {
    alert: '',
    showAlert: false
  }

  componentWillReceiveProps(nextProps) {
    const { ALERT_MSG } = nextProps

    if (this.props.alert !== nextProps.alert && nextProps.alert) {
      this.setState({
        showAlert: true,
        alert: nextProps.alert,
      })
    }

    if (this.props.txLoading !== nextProps.txLoading
      && !nextProps.txLoading
      && !!nextProps.txResult) {
      this.setState({
        showAlert: true,
        alert: ALERT_MSG.SUCCESS,
      })
    }
  }

  handleSubmit = () => {
    this.props.handleCancel()
    this.setState({
      showAlert: false,
    })
    setTimeout(() => {
      this.props.fetchMyStatusData()
    }, 4000)
  }

  closeAlert = () => {
    this.setState({
      showAlert: false,
    }, () => {
      this.props.handleCancel()
    })
  }

  render() {
    const {
      ALERT_MSG,
      I18n,
      txResult,
      maxAvailable,
      setDelegation,
      input,
      myVotesCnt,
      txFee,
      txFeeRate,
      myDelegated,
      myDelegatedPct,
    } = this.props

    const {
      alert,
      showAlert,
    } = this.state

    let text = ''
    switch (alert) {
      case ALERT_MSG.NO_CHANGE:
        text = I18n.error.alertNoChange
        break
      case ALERT_MSG.NO_BALANCE:
        text = I18n.error.notEnoughBalance('ICX')
        break
      case ALERT_MSG.GT_MAX:
        text = I18n.error.alertGTMax(convertStakeValueToText(maxAvailable, true), 'Voting Power')
        break
      default:
        break
    }

    if (!showAlert) {
      return (
        <div></div>
      )
    }

    switch (alert) {
      case ALERT_MSG.SHOW_LEDGER:
        return (
          <IissLedgerIframeContainer
            methodName={'setDelegation'}
            input={{
              delegations: input.map(item => ({
                ...item,
                value: window.web3.toHex(toLoop(item.value))
              }))
            }}
            handleSubmit={setDelegation}
            handleCancel={this.closeAlert}
          />
        )
      case ALERT_MSG.CONFIRM:
        return (
          <div style={{ position: 'fixed' }} className="popup-wrap common-voting">
            <div className="dimmed fade-in"></div>
            <div className="popup moving-down">
              {/* <p className="txt_box">Unstake 취소 수수료가 발생합니다.<br />취소하시겠습니까?</p> */}
              <p className="txt_box">{I18n.votePage.confirm_title}</p>
              <div className="fee">
                {/* <p><span className="label">· 소요 시간</span><span className="txt">즉시취소</span></p> */}
                <p><span className="label">{I18n.votePage.confirm_li1}</span><span>{myVotesCnt}<em className="slash">/</em>100</span></p>
                <p><span className="label">{I18n.votePage.confirm_li2}</span><span>{myDelegated} ({myDelegatedPct}%)</span></p>
                <div className="dot"></div>
                {/* <p><span className="label">{I18n.estimatedStepAndPrice}</span><span>{`${txFeeLimit} / ${txFeePrice}`}<em>ICX</em></span></p> */}
                <p><span className="label">{I18n.transferPageLabel5_2}</span><span>{txFee}<em>ICX</em></span></p>
                <p><span className="label"></span><span>{txFeeRate}<em>USD</em></span></p>
              </div>
              <div className="btn-holder full">
                <button onClick={this.closeAlert} className="btn-type-fill size-half"><span>{I18n.button.cancel}</span></button>
                <button onClick={setDelegation} className="btn-type-normal size-half"><span>{I18n.button.vote}</span></button>
              </div>
            </div>
          </div>
        )
      case ALERT_MSG.SUCCESS:
        return (
          <div id="popup" style={{ position: 'fixed' }} className={`popup-wrap ledger send`}>
            <div>
              <div className="dimmed"></div>
              <div className="popup">
                <p className="txt_box">{I18n.votePage.success1}</p>
                <p className="txt" ref={ref => { if (ref) ref.innerHTML = I18n.votePage.success2 }}></p>
                <a href={TXID_URL['icx'] + txResult} target="_blank" rel="noopener noreferrer"><p className="mint">{I18n.sendTransaction.openTracker}</p></a>
                <div className="btn-holder full">
                  <button onClick={this.handleSubmit} className="btn-type-normal size-full"><span>{I18n.button.close}</span></button>
                </div>
              </div>
            </div>
          </div>
        )
      default:
        return (
          <Alert
            text={text}
            handleCancel={this.closeAlert}
            cancelText={I18n.button.confirm}
          />
        )
    }
  }
}
