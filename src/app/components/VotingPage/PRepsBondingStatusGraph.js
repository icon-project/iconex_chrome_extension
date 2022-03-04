import React, { Component } from 'react'
import withLanguageProps from 'HOC/withLanguageProps'
import { convertStakeValueToText } from 'utils'

@withLanguageProps
class PRepsBondingStatusGraph extends Component {

  render() {
    const {
      I18n,
      myBonded,
      myBondedPct,
      myUnbonding,
      myUnbondingPct,
      myAvailable,
      myAvailablePct,
      totalBonded,
      totalBondedPct,
      isUnbondExist,
      graphClass,
    } = this.props
    const wrapGraphClass = ''
    const wrapClassName = 'myvote'
    const widthClassName = 'width'
    const barGraphClass = graphClass
    const TopLabel =
      (
        <ul>
          {isUnbondExist && (<li></li>)}
          {isUnbondExist && (<li style={{textAlign: "right"}}><em>Unbonding</em><span>{myUnbondingPct}</span>%</li>)}
          <li style={{color: "#00a1b3"}}><span>{myBondedPct}</span>%<em>Bonded</em></li>
          <li><em>Non-bonded</em><span>{myAvailablePct}</span>%</li>
        </ul>
      )
    const BottomLabel =
      (
        <ul>
          <li><span>{convertStakeValueToText(myBonded)}</span><em>ICX</em></li>
          <li style={{textAlign: "right"}}><span>{convertStakeValueToText(myAvailable)}</span><em>ICX</em></li>
          {isUnbondExist && (<li></li>)}
          {isUnbondExist && (<li style={{textAlign: "right"}}><span>{convertStakeValueToText(myUnbonding)}</span><em>ICX</em></li>)}
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
              {isUnbondExist && (<span className="mint-un" style={{ width: `${myUnbondingPct}%` }}><i><em></em></i></span>)}
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