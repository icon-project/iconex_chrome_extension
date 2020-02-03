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
      unstakeTime: ''
    }
    // this.timer = null
  }

  componentWillReceiveProps(nextProps) {
    const { loading } = this.props
    if (loading !== nextProps.loading
      && !nextProps.loading
      && nextProps.isUnstakeExist
      && nextProps.isLoggedIn) {
      const {
        unstake: {
          remainingBlocks,
        } = {},
      } = nextProps
      this.setState({
        unstakeTime: this.convertTime(remainingBlocks)
      })
    }
  }

  // componentWillReceiveProps(nextProps) {
  //   const { loading } = this.props
  //   if (loading !== nextProps.loading 
  //     && !nextProps.loading 
  //     && nextProps.isUnstakeExist
  //     && nextProps.isLoggedIn) {
  //     const {
  //       unstake: {
  //         remainingBlocks,
  //       } = {},
  //     } = nextProps
  //     clearInterval(this.timer)
  //     let _unstakeTime = remainingBlocks * 2
  //     this.timer = setInterval(() => {
  //       this.setState({
  //         unstakeTime: _unstakeTime
  //       })
  //       _unstakeTime--
  //     }, 1000)
  //   }
  // }

  // componentWillUnmount() {
  //   clearInterval(this.timer)
  // }

  // convertSeconds = (sec) => {
  //   const hrs = Math.floor(sec / 3600);
  //   const min = Math.floor((sec - (hrs * 3600)) / 60);
  //   let seconds = sec - (hrs * 3600) - (min * 60);
  //   seconds = Math.round(seconds * 100) / 100
  //   let result = (hrs < 10 ? "0" + hrs : hrs);
  //   result += ":" + (min < 10 ? "0" + min : min);
  //   result += ":" + (seconds < 10 ? "0" + seconds : seconds);
  //   return result;
  // }


  convertTime = (remainingBlocks) => {
    const curTime = moment()
    const remainingTime = remainingBlocks.times(2)
    return curTime.add(remainingTime.toNumber(), 'seconds').format(DATE_FORMAT)
  }


  render() {
    const {
      I18n,
      compType,
      wrapClassName,
      graphClassName,
      title,
      axis1,
      axis2,
      li1,
      li2,
      li3,
      isUnstakeExist,
      isUnstakingFull,
      isUnstakingEqualToStake,
      unstake = {},
      isLoggedIn,
      handleClick,
      loading,
      buttonLabel,
      error,
    } = this.props

    const {
      unstakeTime
    } = this.state

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
          {isUnstakeExist && unstake.width !== "0" && (<span className="mint-un" style={{ width: `${unstake.width}%` }}><i><em></em></i></span>)}
          <span className="gray" style={{ width: `${axis2.width}%` }}><i></i></span>
        </div>
        <ul>
          <li><span>{axis1.value}</span>%<em>{I18n[axis1.label]}</em></li>
          <li><em>{I18n[axis2.label]}</em><span>{axis2.value}</span>%</li>
        </ul>
        <h3>{I18n[li1.label]}<span>{li1.value}<em> ICX</em></span></h3>
        <h3>{I18n[li2.label]}<span>{li2.value}<em> ICX</em></span></h3>
        {isUnstakeExist && (
          <h3 className="unstake">
            <i className="_img"></i>
            {`${I18n.myStatusStake_unstake1} ${unstake.value} ICX`}
            <p>{`${I18n.myStatusStake_unstake2} ${unstake.unstakeBlockHeight}`}</p>
            <p style={{ marginLeft: 20, marginTop: 3 }}>{`${I18n.myStatusStake_unstake3} ${unstakeTime}`}</p>
          </h3>)}
        <h3 style={isUnstakeExist ? { marginTop: 6 } : {}}>{I18n[li3.label]}<span>{li3.value}<em> ICX</em></span></h3>
        <div className="btn-group">
          {/* {
            isUnstakeExist && (
              <button
                disabled={!isLoggedIn}
                onClick={() => handleClick(compType, error)}
                type="submit"
                className="btn-type-vote"><span>{`Unstake ${unstakeTime}`}</span></button>
            )
          }
          &nbsp; */}
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