import React, { Component } from 'react'
import { Alert } from 'app/components'
import { IissLedgerIframeContainer } from 'app/containers'
import { convertStakeValueToText, check0xPrefix, toLoop } from 'utils'
import { txidUrl as TXID_URL } from 'constants/config.js'

export default class StakeAlerts extends Component {

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
      const isStake = nextProps.inputStakedValue.gte(nextProps.staked.value)
      this.setState({
        showAlert: true,
        alert: isStake ? ALERT_MSG.SUCCESS_STAKE : ALERT_MSG.SUCCESS_UNSTAKE
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
  }

  handleSubmit = () => {
    const { txResult } = this.props
    window.open(TXID_URL['icx'] + check0xPrefix(txResult), '_blank');
    this.closeAlertAndPopup()
  }

  render() {
    const {
      ALERT_MSG,
      I18n,
      availableMaxBalance,
      totalDelegated,
      setStake,
      inputStakedValue,
    } = this.props

    const {
      alert,
      showAlert,
    } = this.state

    let text = ''
    switch (alert) {
      case ALERT_MSG.FULL:
        text = I18n.error.alertFull
        break
      case ALERT_MSG.NO_CHANGE:
        text = I18n.error.alertNoChange
        break
      case ALERT_MSG.NO_BALANCE:
        text = I18n.error.notEnoughBalance('ICX')
        break
      case ALERT_MSG.LT_MIN:
        text = I18n.error.alertLTMin(convertStakeValueToText(totalDelegated), 'Stake')
        break
      case ALERT_MSG.GT_MAX:
        text = I18n.error.alertGTMax(convertStakeValueToText(availableMaxBalance, true), 'Stake')
        break
      case ALERT_MSG.SUCCESS_STAKE:
        text = I18n.stakeIcx.success('Stake')
        break
      case ALERT_MSG.SUCCESS_UNSTAKE:
        text = I18n.stakeIcx.success('Unstake')
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
          methodName={'setStake'}
          input={{
            value: window.web3.toHex(toLoop(inputStakedValue))
          }}
          handleSubmit={() => setStake(inputStakedValue)}
          handleCancel={this.closeAlert}
        />
      )
    }

    if (alert === ALERT_MSG.SUCCESS_STAKE ||
      alert === ALERT_MSG.SUCCESS_UNSTAKE) {
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
