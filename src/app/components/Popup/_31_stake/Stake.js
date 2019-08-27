/* eslint-disable array-callback-return */

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import BigNumber from 'bignumber.js'
import withLanguageProps from 'HOC/withLanguageProps';
import {
  LoadingComponent,
  StakeBarLabel,
  StakeBarGraph,
  StakeInputRange,
  StakeAlerts,
} from 'app/components'
import { TxFeeTableContainer } from 'app/containers'
import {
  convertStakeValueToText,
  convertToPercent,
  trimSpace,
  isValidICXInput,
  map,
  toLoop,
  nToBr,
} from 'utils'
import {
  ZERO_ADDRESS,
  MIN_UNSTAKE_VALUE,
} from 'constants/index'
import {
  routeConstants as ROUTE
} from 'constants/index.js';

const INIT_STATE = {
  inputStakedValue: new BigNumber(0),
  stakedPct: 0,
  unstaked: 0,
  unstakedPct: 0,
  rangeStakedPct: new BigNumber(0),
  isInputMode: false,
  alert: '',
}

const ALERT_MSG = {
  NO_BALANCE: 'NO_BALANCE',
  NO_CHANGE: 'NO_CHANGE',
  FULL: 'FULL',
  GT_MAX: 'GT_MAX',
  LT_MIN: 'LT_MIN',
  SUCCESS_STAKE: 'SUCCESS_STAKE',
  SUCCESS_UNSTAKE: 'SUCCESS_UNSTAKE',
  SHOW_LEDGER: 'SHOW_LEDGER',
}

@withRouter
@withLanguageProps
class Stake extends Component {
  constructor(props) {
    super(props);
    this.state = INIT_STATE;
  }

  componentDidMount() {
    this.props.getData()
  }

  componentWillUnmount() {
    if (this.props.location.pathname === ROUTE['home']) {
      this.props.resetReducer()
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.loading !== nextProps.loading
      && !nextProps.loading) {
      this.initData(nextProps)
    }
  }

  getEstimatedStep = (inputStakedValue) => {
    this.props.getEstimatedTxFee({
      methodName: "setStake",
      contractAddress: ZERO_ADDRESS,
      inputObj: {
        value: window.web3.toHex(toLoop(inputStakedValue))
      },
    })
  }

  initData = (nextProps) => {
    const {
      staked: { value, unstake },
      totalDelegated,
      balance,
      totalIcxBalance,
      availableMaxBalance,
    } = nextProps
    const inputStakedValue = value.plus(unstake)
    const _rangeStakedPct = map({
      value: inputStakedValue,
      x1: totalDelegated,
      y1: availableMaxBalance,
      x2: new BigNumber(0),
      y2: new BigNumber(100),
    })
    const _stakedPct = convertToPercent(inputStakedValue, totalIcxBalance, 1)
    
    this.setState({
      inputStakedValue,
      stakedPct: _stakedPct,
      unstaked: balance,
      unstakedPct: (100 - Number(_stakedPct)).toFixed(1),
      rangeStakedPct: _rangeStakedPct,
    }, () => {
      this.getEstimatedStep(inputStakedValue)
    })
  }

  handleFocusInput = () => {
    const { inputStakedValue } = this.state
    this.setState({
      isInputMode: true,
      inputStakedValue: inputStakedValue.eq(0) ? '' : inputStakedValue
    })
  }

  handleChangeInput = (e) => {
    const value = trimSpace(e.target.value)
    if (isValidICXInput(value, 4)) {
      this.setState({
        inputStakedValue: value,
      })
    }
  }

  handleBlurInput = (e) => {
    const {
      inputStakedValue,
    } = this.state
    const {
      totalDelegated,
      totalIcxBalance,
      availableMaxBalance,
    } = this.props
    let _stakedValue = !e.target.value
      ? new BigNumber(0)
      : new BigNumber(inputStakedValue)
    let alertMsg = ''

    if (_stakedValue.lt(totalDelegated)) {
      _stakedValue = totalDelegated
      alertMsg = ALERT_MSG.LT_MIN
    } else if (_stakedValue.gt(availableMaxBalance)) {
      _stakedValue = availableMaxBalance
      alertMsg = ALERT_MSG.GT_MAX
    }

    const _stakedPct = convertToPercent(_stakedValue, totalIcxBalance, 1)
    const _unstaked = totalIcxBalance.minus(_stakedValue)
    const _unstakedPct = (100.0 - Number(_stakedPct)).toFixed(1)
    const _rangeStakedPct = map({
      value: _stakedValue,
      x1: totalDelegated,
      y1: availableMaxBalance,
      x2: new BigNumber(0),
      y2: new BigNumber(100),
    })

    this.setState({
      isInputMode: false,
      inputStakedValue: _stakedValue,
      stakedPct: _stakedPct,
      unstaked: _unstaked,
      unstakedPct: _unstakedPct,
      rangeStakedPct: _rangeStakedPct,
      alert: alertMsg,
    }, () => {
      this.getEstimatedStep(_stakedValue)
    })
  }

  handleKeyPress = (e, inputRef) => {
    if (e.key === 'Enter') {
      inputRef.blur()
      this.handleBlurInput(e)
    }
  }

  handleChangeRange = (_rangeStakedPct) => {
    const {
      availableBalance,
      availableMaxBalance,
      totalDelegated,
      totalIcxBalance,
    } = this.props

    _rangeStakedPct = new BigNumber(_rangeStakedPct)
    if (_rangeStakedPct <= 0) {
      _rangeStakedPct = new BigNumber(0)
    } else if (_rangeStakedPct >= 100) {
      _rangeStakedPct = new BigNumber(100)
    }

    let _stakedValue = availableBalance
      .times(_rangeStakedPct)
      .div(100)
    _stakedValue = new BigNumber(
      map({
        value: _stakedValue,
        x1: new BigNumber(0),
        y1: availableBalance,
        x2: totalDelegated,
        y2: availableMaxBalance,
      }).toFixed(4, 1)
    )

    const _stakedPct = convertToPercent(_stakedValue, totalIcxBalance, 1)
    const _unstaked = totalIcxBalance.minus(_stakedValue)
    const _unstakedPct = (100.0 - Number(_stakedPct)).toFixed(1)

    this.setState({
      inputStakedValue: _stakedValue,
      stakedPct: _stakedPct,
      unstaked: _unstaked,
      unstakedPct: _unstakedPct,
      rangeStakedPct: _rangeStakedPct,
    })
  }

  handleChangeComplete = () => {
    const { inputStakedValue } = this.state
    this.getEstimatedStep(inputStakedValue)
  }

  closePopup = () => {
    this.props.closePopup()
  }

  handleMouseDownSubmit = () => {
    const {
      txFeeLoading,
      loading,
      setStake,
      txLoading,
      delegatedPct,
      staked,
      balance,
      isLedger,
      txFee,
    } = this.props
    const { 
      isInputMode,
      inputStakedValue,
    } = this.state

    if (!isInputMode && !txFeeLoading && !loading && !txLoading) {
      if (inputStakedValue.eq(staked.value) && 
        delegatedPct === '100.0') {
        this.setState({
          alert: ALERT_MSG.FULL,
        })
        return
      }

      if (inputStakedValue.eq(staked.value)) {
        this.setState({
          alert: ALERT_MSG.NO_CHANGE,
        })
        return
      }
      
      if (balance.minus(txFee).lt(0)) {
        this.setState({
          alert: ALERT_MSG.NO_BALANCE,
        })
        return
      }

      if (isLedger) {
        this.setState({
          alert: ALERT_MSG.SHOW_LEDGER,
        })
      } else {
        setStake(inputStakedValue)
      }
    }
  }

  resetAlert = () => {
    this.setState({
      alert: '',
    })
  }

  render() {
    const {
      I18n,
      loading,
      totalDelegated,
      txLoading,
      walletName,
      delegatedPct,
      step,
      totalIcxBalance,
      estimatedUnstakeTime,
      staked: {
        value,
      }
    } = this.props

    const {
      isInputMode,
      inputStakedValue,
      stakedPct,
      unstaked,
      unstakedPct,
      rangeStakedPct,
      alert,
    } = this.state

    let inputRef;

    const isStake = inputStakedValue.gte(value)
    const Title = (<p className="txt_box">Stake <span>({walletName})</span></p>)
    const getStakeBarClass = () => {
      if (delegatedPct === '100.0') {
        return 'full'
      } else if (unstakedPct === '100.0') {
        return 'zero'
      } else if (unstakedPct === '0.0') {
        let res = 'stake-full'
        if (Number(delegatedPct) > 98) res += ' vote-full'
        return res
      } else if (totalIcxBalance.minus(totalDelegated).lte(MIN_UNSTAKE_VALUE)) {
        return 'fill fill-no-balance'
      }
      return 'fill'
    }

    return (
      <div>
        <div className="dimmed"></div>
        <div className={`popup moving-down ${getStakeBarClass()}`}>
          {Title}
          {
            loading ? (
              <div style={{ height: '540px' }}>
                <LoadingComponent type='black' />
              </div>
            ) : (
                <div>
                  <div className="sum-holder">
                    <StakeBarLabel I18n={I18n} delegatedPct={delegatedPct} {...this.state} />
                    <StakeBarGraph graphClass={getStakeBarClass()} delegatedPct={delegatedPct} {...this.state} />
                    <h4>{I18n.stakeIcx.desc}</h4>
                  </div>
                  <div className="box">
                    <div className="txt">{`· ${I18n.myStatusStake_axis1} (ICX)`}
                    <span>
                        <input
                          type="text"
                          className={`txt-type-normal ${isInputMode && 'input-mode'}`}
                          placeholder=""
                          value={isInputMode ? inputStakedValue : ''}
                          onFocus={this.handleFocusInput}
                          onBlur={this.handleBlurInput}
                          onChange={this.handleChangeInput}
                          onKeyPress={(e) => this.handleKeyPress(e, inputRef)}
                          ref={node => inputRef = node}
                          disabled={getStakeBarClass() === 'full' ? true : false}
                        />
                        {
                          !isInputMode && <em onClick={() => inputRef.focus()}>{`${convertStakeValueToText(inputStakedValue)} (${stakedPct}%)`}</em>
                        }
                      </span>
                    </div>
                    <div className="txt"><i className="_img"></i>{`Voted ${convertStakeValueToText(totalDelegated)} ICX (${delegatedPct}%)`}</div>
                    <div className="txt">{`· ${I18n.myStatusStake_axis2} (ICX)`}<i className="_img tooltip info-i"></i>
                      <div className="help-layer">
                        <p className="txt">{nToBr(I18n.stakeIcx.help)}</p>
                        <div className="tri"></div>
                      </div>
                      <span>{`${convertStakeValueToText(unstaked)} (${unstakedPct}%)`}</span>
                    </div>
                    <div className="bar-group controller">
                      <h4>{I18n.stakeIcx.min}<span>{I18n.stakeIcx.max}</span></h4>
                      <StakeInputRange
                        isInputMode={isInputMode}
                        rangeStakedPct={rangeStakedPct.toNumber()}
                        handleChangeRange={this.handleChangeRange}
                        handleChangeComplete={this.handleChangeComplete}
                        step={step}
                      />
                    </div>
                  </div>
                  {
                    !isStake ? (
                      <p className="txt-time">{I18n.stakeIcx.estimatedTime}<span>{estimatedUnstakeTime}</span></p>
                    ) : (
                      <p style={{ height: 48 }} className="txt-time">{I18n.stakeIcx.estimatedTime}<span>-</span></p>
                    )
                  }
                  <div className="dot"></div>
                  <TxFeeTableContainer />
                  <div className="btn-holder">
                    <button 
                      onClick={this.closePopup} 
                      className="btn-type-fill size-half">
                        <span>{I18n.button.cancel}</span>
                    </button>
                    <button
                      onMouseDown={this.handleMouseDownSubmit}
                      className="btn-type-normal size-half">
                      {
                        txLoading
                          ? (<LoadingComponent type='white' />)
                          : (<span>{I18n.button.submit}</span>)
                      }
                    </button>
                  </div>
                </div>
              )
          }
        </div>
        <StakeAlerts
          inputStakedValue={inputStakedValue}
          ALERT_MSG={ALERT_MSG}
          alert={alert}
          resetAlert={this.resetAlert}
          {...this.props} />
      </div>
    );
  }
}

export default Stake;
