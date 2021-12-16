import React, { Component } from 'react'
import {
  WalletSelectorContainer,
  MyStatusIScoreContainer,
  MyStatusStakeContainer,
  MyStatusVoteContainer,
  MyStatusBondContainer,
  MyPRepsTableContainer,
} from 'app/containers'
import { Alert } from 'app/components'
import withLanguageProps from 'HOC/withLanguageProps';
import { trackerAccountUrl as TRACKER_ACCOUNT_URL } from 'constants/config.js'


const ERR_MSG = {
  NO_I_SCORE: 'alertNoIScore',
  NOT_ENOUGH_FOR_STAKE: 'alertNotEnoughForStake',
  NO_DELEGATION: 'alertNoDelegation',
  NO_BOND: 'alertNoBond',
}

@withLanguageProps
export default class MyStatus extends Component {

  state = {
    alert: ''
  }

  componentDidMount() {
    window.scroll(0, 0)

    if (this.props.isLedger) {
      this.props.fetchAll({})
      this.props.fetchMyStatusData()
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isLoggedIn !== nextProps.isLoggedIn &&
      nextProps.isLoggedIn) {
      nextProps.fetchMyStatusData()
    }
  }

  handleClick = (compType, error) => {
    const {
      openPopup,
      openVoteMode,
      openBondMode
    } = this.props
    switch (compType) {
      case 'stake':
        if (error) {
          this.setState({
            alert: ERR_MSG.NOT_ENOUGH_FOR_STAKE
          })
          return
        }
        openPopup({
          popupType: 'stake'
        })
        break
      case 'vote':
        if (error) {
          this.setState({
            alert: ERR_MSG.NO_DELEGATION
          })
          return
        }
        openVoteMode()
        break
      case 'bond':
        if (error) {
          this.setState({
            alert: ERR_MSG.NO_BOND
          })
          return
        }
        openBondMode()
        break
      case 'iScore':
        if (error) {
          this.setState({
            alert: ERR_MSG.NO_I_SCORE
          })
          return
        }
        openPopup({
          popupType: 'claimIScore'
        })
        break
      default:
        break
    }
  }

  closeAlert = () => {
    this.setState({
      alert: ''
    })
  }

  render() {
    const { I18n, selectedAccount } = this.props
    const { alert } = this.state
    return (
      <div>
        <div className="wrap-holder exchange">
          <WalletSelectorContainer typeFilter='icx' />
          <div className="vote-holder">
            <MyStatusStakeContainer handleClick={this.handleClick} />
            <MyStatusVoteContainer handleClick={this.handleClick} />
            <MyStatusBondContainer handleClick={this.handleClick} />
            <MyStatusIScoreContainer handleClick={this.handleClick} />
          </div>
        </div>
        <div className="wrap-holder myvote">
          <div className="label-group">
            <span className="label">{I18n.myVote}</span>
          </div>
          <MyPRepsTableContainer showRankAndTotalVotes={true} />
          {selectedAccount && (<h4>{`${I18n.pRepTable_h4} : `}<a href={`${TRACKER_ACCOUNT_URL['icx']}${selectedAccount}#delegations`} target="_blank">https://tracker.icon.foundation/</a></h4>)}
        </div>
        {
          alert && (
            <Alert
              handleCancel={this.closeAlert}
              text={I18n.error[alert]}
              cancelText={I18n.button.confirm}
            />
          )
        }
      </div>
    )
  }
}
