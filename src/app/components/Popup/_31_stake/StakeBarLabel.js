
import React from 'react'

export default function StakeBarLabel({
  I18n,
  stakedPct,
  delegatedPct,
  unstakedPct,
}) {
  const calcValue = (val) => `calc(${val}% + 15.64px)`
  return (
    <div className="txt-group">
      <p style={{ left: calcValue(stakedPct) }}>{I18n.myStatusStake_axis1}<span>{`${stakedPct}%`}</span></p>
      <p style={{ left: `${stakedPct > 92 ? '92%' : stakedPct < 4 ? calcValue(5) : calcValue(stakedPct)}` }}>{I18n.myStatusStake_axis2}<span>{`${unstakedPct}%`}</span></p>
      {delegatedPct > 0 && <p style={{ left: `calc(${4}% + 15.64px)` }}>{I18n.myStatusStake_axis3}<span>{`${delegatedPct}%`}</span></p>}
    </div>
  )
}