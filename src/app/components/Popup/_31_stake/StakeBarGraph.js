import React from 'react'

export default function StakeBarGraph({
  stakedPct,
  delegatedPct,
  unstakedPct,
  graphClass,
}) {
  return (
    <div className="bar-group">
      <span className="mint" style={{ width: `calc( ${stakedPct}% + 15.64px)` }}><i></i></span>
      <span className="gray" style={{ width: `calc( ${unstakedPct}% + 15.64px)` }}><i></i></span>
      {delegatedPct > 0 && 
        <span 
          className="mint-alpha" 
          style={{ width: graphClass === 'stake-full' ? `${delegatedPct}%` : `calc( ${delegatedPct}% + 15.64px)` }}>
          <i></i>
        </span>}
    </div>
  )
}
