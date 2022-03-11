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
          <li><span>{convertStakeValueToText(myBonded)}</span><em>ICX</em></li>
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