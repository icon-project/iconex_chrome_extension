import React, { Component } from 'react'
import moment from 'moment'
import { dateFormat as DATE_FORMAT } from 'constants/index';
import { LoadingComponent } from 'app/components'
import withLanguageProps from 'HOC/withLanguageProps';

@withLanguageProps
class MyStatusStakeVote extends Component {

  constructor(props) {
    super(props)
    this.state = {
      curTime: moment()
    }
    // this.timer = null
  }

  componentWillReceiveProps(nextProps) {
    const { loading } = this.props
    if (loading !== nextProps.loading
      && !nextProps.loading
      && nextProps.isUnstakeExist
      && nextProps.isLoggedIn) {
      this.setState({
        curTime: moment()
      })
    }
  }

  convertTime = (remainingBlocks) => {
    const { curTime } = this.state
    const remainingTime = remainingBlocks.times(2)
    return curTime.clone().add(remainingTime.toNumber(), 'seconds').format(DATE_FORMAT)
  }

  render() {
    const {
      I18n,
      compType,
      wrapClassName,
      graphClassName,
      axis1,
      axis2,
      li1,
      li2,
      li3,
      li4,
      isUnstakeExist,
      isUnstakingFull,
      isUnstakingEqualToStake,
      unstakes = {},
      isLoggedIn,
      handleClick,
      loading,
      buttonLabel,
      error,
    } = this.props

    if (loading) {
      return (
        <div className={`${wrapClassName} ${!isLoggedIn ? 'disabled' : ''}`}>
          <LoadingComponent type='black' />
        </div>
      )
    }

    return (
      <div className={`${wrapClassName} ${!isLoggedIn ? 'disabled' : ''}`}>
        <h1>{I18n[compType]}</h1>
        <div className={`bar-group ${graphClassName}`}>
          {(!isUnstakingFull && !isUnstakingEqualToStake) && (<span className="mint" style={{ width: `${axis1.width}%` }}><i></i></span>)}
          {isUnstakeExist && unstakes.width !== "0" && (<span className="mint-un" style={{ width: `${unstakes.width}%` }}><i><em></em></i></span>)}
          <span className="gray" style={{ width: `${axis2.width}%` }}><i></i></span>
        </div>
        <ul>
          <li><span>{axis1.value}</span>%<em>{I18n[axis1.label]}</em></li>
          <li><em>{I18n[axis2.label]}</em><span>{axis2.value}</span>%</li>
          {isUnstakeExist && (<li><em>{I18n[unstakes.label]}</em><span>{unstakes.percent}</span>%</li>)}
        </ul>
        {/*<h3>{I18n[li1.label]}<span>{li1.value}<em> ICX</em></span></h3>*/}
        <h3>{I18n[li2.label]}<span>{li2.value}<em> ICX</em></span></h3>
        <h3>{I18n[li3.label]}<span>{li3.value}<em> ICX</em></span></h3>
        {isUnstakeExist && <h3>{I18n[li4.label]}<span>{li4.value}<em> ICX</em></span></h3>}
        {isUnstakeExist && unstakes.value.map((unstake, i) => {
          return (
            <h3 key={i} className="unstake">
              <i className="_img"></i>
              {`${I18n.myStatusStake_unstake1} ${unstake.unstake} ICX`}
              <p>{`${I18n.myStatusStake_unstake2} ${unstake.unstakeBlockHeight}`}</p>
              <p>{`${I18n.myStatusStake_unstake3} ${this.convertTime(unstake.remainingBlocks)}`}</p>
            </h3>
          )
        })}
        <div className="btn-group">
          <button
            disabled={!isLoggedIn}
            onClick={() => handleClick(compType, error)}
            type="submit"
            className="btn-type-vote"><span>{I18n.button[buttonLabel]}</span></button>
        </div>
      </div>
    )
  }
}

export default MyStatusStakeVote