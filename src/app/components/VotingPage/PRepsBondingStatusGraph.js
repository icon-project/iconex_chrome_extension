import React, { Component } from 'react'
import withLanguageProps from 'HOC/withLanguageProps'
import { convertStakeValueToText } from 'utils'

@withLanguageProps
class PRepsBondingStatusGraph extends Component {

  render() {
    const {
      I18n,
      myDelegated,
      myBondedPct,
      myAvailable,
      myAvailablePct,

      graphClass,
    } = this.props
    const wrapGraphClass = ''
    const wrapClassName = 'myvote'
    const widthClassName = 'width'
    const barGraphClass = graphClass
    const TopLabel =
      (
        <ul>
          <li><span>{myBondedPct}</span>%<em>Bonded</em></li>
          <li><em>Non-bonded</em><span>{myAvailablePct}</span>%</li>
        </ul>
      )
    const BottomLabel =
      (
        <ul>
          <li><span>{convertStakeValueToText(myDelegated)}</span><em>ICX</em></li>
          <li><span>{convertStakeValueToText(myAvailable)}</span><em>ICX</em></li>
        </ul>
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
          (
            <div className={`bar-group ${barGraphClass}`}>
              <span className="mint" style={{ width: `${myBondedPct}%` }}><i></i></span>
              <span className="gray" style={{ width: `${myAvailablePct}%` }}><i></i></span>
            </div>
          )
        }
        {BottomLabel}
      </div>
    )
  }
}

export default PRepsBondingStatusGraph



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