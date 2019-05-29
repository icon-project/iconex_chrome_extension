import React, { Component } from 'react'
import Fragment from 'react-dot-fragment'
import { WalletSelectorContainer } from 'app/containers';

export default class MyStatus extends Component {
  render() {
    return (
    <div>
      <div className="wrap-holder exchange">
        <WalletSelectorContainer />

        <div className="vote-holder">
          <div className="left-group">
            <h1>Stake<span>Stake History</span></h1>
            <div className="bar-group "> 
              <span className="mint" style={{width: '20%'}}><i></i></span>
              <span className="mint-un" style={{width: '10%'}}><i><em></em></i></span>
              <span className="gray" style={{width: '70%'}}><i></i></span>
            </div>
            <ul>
              <li><span>64</span>%<em>Staked</em></li>
              <li><em>Unstaked</em><span>36</span>%</li>
            </ul>
            <h3>ICX Balance<span>150,000.00000008<em> ICX</em></span></h3>
            <h3>Staked ICX (Voting Power)<span>63,000.00000008<em> ICX</em></span></h3>
            <h3 className="unstake"><i className="_img"></i>Unstake 150,000.0000 ICX<p>완료 BLOCK 324,646</p></h3>
            <h3>Unstacked ICX<span>42,000.00000008<em> ICX</em></span></h3>
            <div className="btn-group">
              <button type="submit" className="btn-type-vote"><span>Unstake 71:59:59</span></button>&nbsp;	
              <button type="submit" className="btn-type-vote"><span>Stake</span></button>						
            </div>
          </div>
          
          <div className="right-group">
            <h1>Vote</h1>
            <div className="bar-group no"> 
              <span className="mint" style={{width: '100%'}}><i></i></span>
              <span className="mint-un" style={{width: '10%'}}><i></i></span>
              <span className="gray" style={{width: '0%'}}><i></i></span>
            </div>
            <ul>
              <li><span>100</span>%<em>Voted</em></li>
              <li><em>Available</em><span>0</span>%</li>
            </ul>
            <h3>Voting Power<span>150,000.00000008<em> ICX</em></span></h3>
            <h3>Voted Power<span>63,000.00000008<em> ICX</em></span></h3>
            <h3>Available Power<span>42,000.00000008<em> ICX</em></span></h3>
            <div className="btn-group">
              <button type="submit" className="btn-type-vote"><span>Vote</span></button>						
            </div>
          </div>

          <div className="center-group">
            <h1>I-Score<span>I-Score History</span></h1>
            <h3>Current I-Score<span>150,000.00000008<em> ISC</em></span></h3>
            <h3>You can receive<span>63,000.00000008<em> ICX</em></span></h3>
            <div className="btn-group">
              <button type="submit" className="btn-type-vote"><span>Claim</span></button>						
            </div>
          </div>
        </div>
      </div>

      <div className="wrap-holder myvote">
        <div className="label-group">
          <span className="label">My Vote</span>
        </div>
        <table className="table-typeG ">
          <thead>
            <tr>
              <th className=""><span>Rank<i className="_img up"></i></span></th>
              <th className="on"><span>Name<i className="_img"></i></span></th>
              <th><span>Total Votes (%)<i className="_img"></i></span></th>
              <th><span>My Votes (%)<i className="_img"></i></span></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><span>1</span><i className="_img">1</i></td>
              <td><span className="ellipsis"><em className="p-rep">P-Rep</em>SOMESING SOMESING SOMESINGSOMESING SOMESING SOMESI</span></td>
              <td>9,000,000,000.0009 (23.02%)</td>
              <td>9,000,000,000.0009 (23.02%)</td>
            </tr>
            <tr>
              <td><span>2</span><i className="_img down">1</i></td>
              <td><span className="ellipsis"><em className="p-rep">P-Rep</em>SOMESING SOMESING SOMESING</span></td>
              <td>9,000,000,000.0009 (23.02%)</td>
              <td>9,000,000,000.0009 (23.02%)</td>
            </tr>
            <tr>
              <td><span>3</span></td>
              <td><span className="ellipsis">SOMESING SOMESING SOMESING SOMESI</span></td>
              <td>9,000,000,000.0009 (23.02%)</td>
              <td>9,000,000,000.0009 (23.02%)</td>
            </tr>
            

            <tr>
              <td colSpan="5" className="nodata"><p>투표에 참여하여 ICON Network의 일원이 되어 주세요!</p>
              Voting Power로 사용한 ICX는 언제든지 돌려 받을 수 있으며, Network 발전 기여에 대한 보상으로 I-Score를 지급해 드립니다.</td>
            </tr>

          </tbody>
        </table>
        <h4>내역 조회 : <a href="">https://tracker.icon.foundation/</a></h4>
      </div>
    </div>
    )
  }
}
