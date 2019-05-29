import React, { Component } from 'react'
import { PrepsBar } from 'app/components'

export default class PrepsTable extends Component {
  render() {
    const { isLeaderboard, data } = this.props
    return (
      <table className="table-typeG">
        <thead>
          <tr>
            <th className="on"><span>Rank<i className="_img up"></i></span></th>
            <th><span>Name<i className="_img"></i></span></th>
            <th><span>Total Votes (%)<i className="_img"></i></span></th>
            { isLeaderboard && <th>Server Location</th> }
            { isLeaderboard && <th>Active</th> }
            { !isLeaderboard && <th><span>My Votes (%)</span></th> }
          </tr>
        </thead>
        <tbody>
          {
            data.map((data, i) => (
                <PrepsBar 
                  key={i}
                  isLeaderboard={isLeaderboard}
                  index={i+1}
                  data={data}
                />
            ))
          }
        </tbody>
      </table>
    )
  }
}
