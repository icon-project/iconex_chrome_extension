import React, { Component } from 'react'
import { PrepsTable } from 'app/components/'

class PrepsLeaderboard extends Component {
  render() {
    return (
        <div className="wrap-holder">
          <PrepsLeaderboardSearch />
          <PrepsTable 
            data={[
              {
                fluctuation: 3,
                prepType: 'P-Rep',
                prepName: 'SOMESING SOMESING SOMESINGSOMESING SOMESING SOMESI',
                totalVotes: '9,000,000,000.0009',
                totalVotesPct: '23.02',
                myVotes: '0',
                myVotesPct: '0',
                location: 'Singapore, Sweden', 
                isActive: true,
              },
              {
                fluctuation: -2,
                prepType: 'Sub P-Rep',
                prepName: 'SOMESING SOMESINGSOMESING SOMESING SOMESI',
                totalVotes: '4,000,000.0009',
                totalVotesPct: '13.02',
                myVotes: '0',
                myVotesPct: '0',
                location: 'Singapore, Sweden', 
                isActive: false,
              }
            ]}
            isLeaderboard={true}
            />
      </div>
    )
  }
}

const PrepsLeaderboardSearch = ({
  state = {
    isPrepChecked: false,
    isSubPrepChecked: false,
    isCandidateChecked: false,
  }, 
  action}) => (
  <div className="label-group">
    <span className="label">P-Reps</span>
    <div className="search-group">
      <span>
        <input id="cbox-01" className="cbox-type" type="checkbox" name=""/>
        <label htmlFor="cbox-01" className="label _img">P-Rep<em>(22)</em></label>
      </span>						
      <span>
        <input id="cbox-02" className="cbox-type" type="checkbox" name=""/>
        <label htmlFor="cbox-02" className="label _img">Sub P-Rep<em>(21)</em></label>
      </span>						
      <span>
        <input id="cbox-03" className="cbox-type" type="checkbox" name=""/>
        <label htmlFor="cbox-03" className="label _img">Candidate<em>(999)</em></label>
      </span>
      <span className="search on"><input type="text" className="txt-type-normal" placeholder="Search" value=""/><i className="_img"></i></span>
    </div>
  </div>
)

export default PrepsLeaderboard
