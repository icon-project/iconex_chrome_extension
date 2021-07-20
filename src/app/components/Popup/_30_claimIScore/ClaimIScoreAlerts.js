import React, { Component } from 'react'
import { Alert } from 'app/components'
import { IissLedgerIframeContainer } from 'app/containers'
import { txidUrl as TXID_URL } from 'constants/config.js'
import { check0xPrefix } from 'utils'

export default class ClaimIScoreAlerts extends Component {

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

  closeAlert = () => {
    this.setState({
      showAlert: false,
    }, () => {
      this.props.resetAlert()
    })
  }

  closeAlertAndPopup = () => {
    const { closePopup, fetchMyStatusData } = this.props
    this.setState({
      showAlert: false,
    }, () => {
      fetchMyStatusData()
      closePopup()
    })

    setTimeout(() => {
      fetchMyStatusData()
    }, 4000)
  }

  handleSubmit = () => {
    const { txResult } = this.props
    window.open(TXID_URL['icx'] + check0xPrefix(txResult), '_blank');
    this.closeAlertAndPopup()
  }

  render() {
    const {
      claimIScore,
      ALERT_MSG,
      I18n,
    } = this.props

    const {
      alert,
      showAlert,
    } = this.state

    let text = ''
    switch (alert) {
      case ALERT_MSG.NO_BALANCE:
        text = I18n.error.notEnoughBalance('ICX')
        break
      case ALERT_MSG.SUCCESS:
        text = I18n.stakeIcx.success('Claim')
        break
      default:
        break
    }

    if (!showAlert) {
      return (
        <div></div>
      )
    }

    if (alert === ALERT_MSG.SHOW_LEDGER) {
      return (
        <IissLedgerIframeContainer
          methodName={'claimIScore'}
          handleSubmit={claimIScore}
          handleCancel={this.closeAlert}
        />
      )
    }


    if (alert === ALERT_MSG.SUCCESS) {
      return (
        <Alert
          handleSubmit={this.handleSubmit}
          handleCancel={this.closeAlertAndPopup}
          text={text}
          cancelText={I18n.button.close}
          submitText={I18n.button.checkTx}
        />
      )
    }

    return (
      <Alert
        handleCancel={this.closeAlert}
        text={text}
        cancelText={I18n.button.confirm}
      />
    )
  }
}
