import React, { Component } from 'react'
import withLanguageProps from 'HOC/withLanguageProps'
import { convertStakeValueToText } from 'utils'

@withLanguageProps
class PRepsVotingStatusGraph extends Component {

  render() {
    const {
      I18n,
      isVoteMode,

      myDelegated,
      myDelegatedPct,
      myAvailable,
      myAvailablePct,

      totalSupply,
      totalSupplyWidthPct,
      totalNetworkDelegated,
      totalNetworkDelegatedPct,
      totalNetworkDelegatedWidthPct,
      totalNetworkAvailable,
      totalNetworkAvailablePct,
      totalNetworkAvailableWidthPct,

      graphClass,
    } = this.props
    const wrapGraphClass = isVoteMode ? '' : graphClass
    const wrapClassName = isVoteMode ? 'myvote' : 'voted'
    const widthClassName = isVoteMode ? 'width-m' : ''
    const barGraphClass = isVoteMode ? graphClass : ''
    const TopLabel = isVoteMode
      ? (
        <ul>
          <li><span>{myDelegatedPct}</span>%<em>Delegated</em></li>
          <li><em>Non-delegated</em><span>{myAvailablePct}</span>%</li>
        </ul>
      )
      : (
        <div>
          <p>
            <i className="tri"></i> {I18n.pRep_totalDelegated}
            <span>
              <em>{convertStakeValueToText(totalNetworkDelegated)}</em>
              ({totalNetworkDelegatedPct}%)
            </span>
          </p>
          <p>{I18n.pRep_totalSupply} : <em>{convertStakeValueToText(totalSupply)}</em> ICX</p>
        </div>
      )
    const BottomLabel = isVoteMode
      ? (
        <ul>
          <li><span>{convertStakeValueToText(myDelegated)}</span><em>ICX</em></li>
          <li><span>{convertStakeValueToText(myAvailable)}</span><em>ICX</em></li>
        </ul>
      )
      : (
        <div style={{ marginLeft: `${totalNetworkDelegatedPct}%` }}>
          <p>
            <i className="tri up"></i> {I18n.pRep_available}
            <span>
              <em>{convertStakeValueToText(totalNetworkAvailable)}</em>
              ({totalNetworkAvailablePct}%)
            </span>
          </p>
        </div>
      )
    return (
      <div className={`
          wrap-holder 
          ${widthClassName} 
          ${wrapClassName} 
          ${wrapGraphClass}
        `}>
        {TopLabel}
        {
          isVoteMode ?
            (
              <div className={`bar-group ${barGraphClass}`}>
                <span className="mint" style={{ width: `${myDelegatedPct}%` }}><i></i></span>
                <span className="gray" style={{ width: `${myAvailablePct}%` }}><i></i></span>
              </div>
            ) :
            (
              <div className={`bar-group`}>
                <span className="mint" style={{ width: `${totalNetworkDelegatedWidthPct}%` }}><i></i></span>
                <span className="gray" style={{ width: `${totalNetworkAvailableWidthPct}%` }}><i></i></span>
                <span className="dot" style={{ width: `${totalSupplyWidthPct}%` }}><i></i></span>
              </div>
            )
        }
        {BottomLabel}
      </div>
    )
  }
}

export default PRepsVotingStatusGraph



// <div class="wrap-holder voted notavail">
// 				<div>
// 					<p><i class="tri"></i> Total Voted Power (ICX)<span><em>300,000.0009</em>(1%)</span></p>
// 					<p>Total ICX Circulation : <em>123,000,000.0006</em> ICX</p>
// 				</div>
// 				<div class="bar-group">
// 					<span class="mint" style="width: 10%;"><i></i></span>
// 					<span class="gray" style="width: 0%;"><i></i></span>
// 					<span class="dot" style="width: 90%;"><i></i></span>
// 				</div>
// 				<div style="margin-left: 0%;">
// 					<p><i class="tri up"></i> Total Available Power (ICX)<span><em>300,000.0009</em>(0%)</span></p>
// 				</div>
// 			</div>


// <div class="wrap-holder voted notvoted">
// 				<div>
// 					<p><i class="tri"></i> Total Voted Power (ICX)<span><em>300,000.0009</em>(1%)</span></p>
// 					<p>Total ICX Circulation : <em>123,000,000.0006</em> ICX</p>
// 				</div>
// 				<div class="bar-group">
// 					<span class="mint" style="width: 0%;"><i></i></span>
// 					<span class="gray" style="width: 10%;"><i></i></span>
// 					<span class="dot" style="width: 90%;"><i></i></span>
// 				</div>
// 				<div style="margin-left: 0%;">
// 					<p><i class="tri up"></i> Total Available Power (ICX)<span><em>300,000.0009</em>(0%)</span></p>
// 				</div>
// 			</div>


// <div class="wrap-holder voted">
// 				<div>
// 					<p><i class="tri"></i> Total Voted Power (ICX)<span><em>300,000.0009</em>(31.98%)</span></p>
// 					<p>Total ICX Circulation : <em>123,000,000.0006</em> ICX</p>
// 				</div>
// 				<div class="bar-group">
// 					<span class="mint" style="width: 20%;"><i></i></span>
// 					<span class="gray" style="width: 30%;"><i></i></span>
// 					<span class="dot" style="width: 50%;"><i></i></span>
// 				</div>
// 				<div style="margin-left: 20%;">
// 					<p><i class="tri up"></i> Total Available Power (ICX)<span><em>300,000.0009</em>(31.98%)</span></p>
// 				</div>
// 			</div>