import React, { Component } from 'react'
import { PRepsVotingStatusGraphContainer, PRepsLeaderboardContainer } from 'app/containers'
import { LoadingComponent } from 'app/components/';

export default class PReps extends Component {

  componentDidMount() {
    window.scroll(0, 0)
    this.props.getData()
  }

  render() {
    const { loading } = this.props

    if (loading) {
      return (
        <div>
          <LoadingComponent type='black' />
        </div>
      )
    }

    return (
      <div>
        <PRepsVotingStatusGraphContainer />
        <PRepsLeaderboardContainer />
      </div>
    )
  }
}
