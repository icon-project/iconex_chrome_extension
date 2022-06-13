import React, { Component } from 'react';
import withLanguageProps from 'HOC/withLanguageProps';
import { convertToPercent, convertStakeValueToText, convertIScoreToText } from 'utils'
import { validateStake, validateVote, validateBond, validateClaim } from 'redux/reducers/iissReducer';

@withLanguageProps
class WalletStakingBar extends Component {

  handleClick = (buttonType) => {
    const {
      account,
      balance,
      showAlert,
      iScore,
      staked,
      setSelectedWallet,
      openPopup,
    } = this.props

    switch (buttonType) {
      case 'stake':
        if (validateStake(balance.plus(staked.value).plus(staked.totalUnstake))) {
          showAlert('alertNotEnoughForStake', 'icx')
          return
        }
        break
      case 'vote':
        if (validateVote(staked.value)) {
          showAlert('alertNoDelegation', 'icx')
          return
        }
        break
      case 'bond':
        if (validateBond(staked.value)) {
          showAlert('alertNoBond', 'icx')
          return
        }
        break
      case 'claimIScore':
        if (validateClaim(iScore.value)) {
          showAlert('alertNoIScore', 'icx')
          return
        }
        break
      default:
        break
    }
    setSelectedWallet({
      account,
    })
    openPopup({
      popupType: `sendTransaction_${buttonType}`
    });
  }

  render() {
    const { staked, iScore, delegated, balance } = this.props
    const stakedAndUnstaking = staked.value.plus(staked.totalUnstake)
    const icxBalance = balance.plus(stakedAndUnstaking)
    const stakedValue = convertToPercent(stakedAndUnstaking, icxBalance, 1)
    const iScoreValue = convertIScoreToText(iScore.value)
    const available = convertStakeValueToText(delegated.available)
    return (
      <tr className="staked">
        <td>{`${stakedValue}%`}<span className="txt">Staked ICX</span></td>
        <td><p><span className="txt">Voting Power</span><em>{available}</em><span>ICX</span></p></td>
        <td><span className="txt">I-Score</span><em>{iScoreValue}</em><em>I-Score</em></td>
        <td>
          <button
            onClick={() => this.handleClick('stake')}
            className="btn success" style={{marginRight: '3px'}}>
            <span>Stake</span>
          </button>
          <button
            onClick={() => this.handleClick('vote')}
            className="btn warning" style={{marginRight: '3px'}}>
            <span>Vote</span>
          </button>
          <button
            onClick={() => this.handleClick('bond')}
            className="btn info" style={{marginRight: '3px'}}>
            <span>Bond</span>
          </button>
          <button
            onClick={() => this.handleClick('claimIScore')}
            className="btn danger">
            <span>Claim</span>
          </button>
        </td>
      </tr>
    )
  }
}

export default WalletStakingBar;
