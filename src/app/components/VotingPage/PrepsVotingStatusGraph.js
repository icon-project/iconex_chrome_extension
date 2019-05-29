import React, { Component } from 'react'

export default class PrepsVotingStatusGraph extends Component {
  render() {
    return (
        <div className="wrap-holder voted zero">
          <div>
            <p><i className="tri"></i> Total Voted Power (ICX)<span><em>300,000.0009</em>(31.98%)</span></p>
            <p>Total ICX Circulation : <em>123,000,000.0006</em> ICX</p>
          </div>
          <div className="bar-group">
            <span className="mint" style={{width: '0%'}}><i></i></span>
            <span className="gray" style={{width: '0%'}}><i></i></span>
            <span className="dot" style={{width: '100%'}}><i></i></span>
          </div>
          <div style={{marginLeft: '0%'}}>
            <p><i className="tri up"></i> Total Available Power (ICX)<span><em>300,000.0009</em>(31.98%)</span></p>
          </div>
        </div>
    )
  }
}
