import React, { Component } from 'react'
import { PrepsVotingStatusGraphContainer, PrepsLeaderboardContainer } from 'app/containers'

export default class Preps extends Component {
  render() {
    return (
      <div>
        <PrepsVotingStatusGraphContainer />
        <PrepsLeaderboardContainer />
      </div>
    )
  }
}
