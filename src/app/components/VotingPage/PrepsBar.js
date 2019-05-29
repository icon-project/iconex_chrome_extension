import React from 'react'

const PrepsBar = ({
  isLeaderboard = false,
  index = 0,
  data,
}) => {
  const { 
    fluctuation = 0,
    prepType = '',
    prepName = '',
    totalVotes = 0,
    totalVotesPct = 0,
    myVotes = 0,
    myVotesPct = 0,
    location = '', 
    isActive = false,
  } = data
  return (
    <tr>
      <td>
        <span>{index}</span>
        { fluctuation && 
            <i className={`_img ${fluctuation < 0 ? 'down' : ''}`}>{Math.abs(fluctuation)}</i>
        }
      </td>
      <td>
        <span className="ellipsis">
          <em className="p-rep">{prepType}</em>
          {prepName}
        </span>
      </td>
      <td>{totalVotes} ({totalVotesPct}%)</td>
      { isLeaderboard && (<td><span className="ellipsis">{location}</span></td>) }
      { isLeaderboard && (<td><i className={isActive ? 'on' : ''}></i></td>) }
      { !isLeaderboard && (<td>{myVotes} ({myVotesPct}%)</td>) }
    </tr>
  )
}

export default PrepsBar