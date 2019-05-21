import React, { Component } from 'react';
import withLanguageProps from 'HOC/withLanguageProps';


@withLanguageProps
class WalletStakingBar extends Component {


  render() {

      return (
        <tr className="staked">
          <td>64%<span className="txt">Staked ICX</span></td>
          <td><p><span className="txt">Voting Power</span><em>856,456,123,451.00000000</em><span>ICX</span></p></td>
          <td><span className="txt">I-Score</span><em>99,672,384</em><em>ISC</em></td>
          <td><button className="btn-type-exchange" ><span>Stake</span></button><button className="btn-type-exchange" ><span>Vote</span></button><button className="btn-type-exchange"><span>Claim</span></button></td>
        </tr>
      )
  }
}

export default WalletStakingBar;
