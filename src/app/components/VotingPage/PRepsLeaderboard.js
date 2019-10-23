import React, { Component } from 'react'
import withLanguageProps from 'HOC/withLanguageProps'
import { PRepsTable } from 'app/components/'
import { pRepType as P_REP_TYPE } from 'constants/index'

@withLanguageProps
class PRepsLeaderboard extends Component {

  state = {
    checked: [true, true, true],
    keyword: '',
  }

  handleInputChange = (e) => {
    this.setState({
      keyword: e.target.value,
    })
  }

  filterData = ({
    index
  }) => {
    const { checked } = this.state
    const _checked = [...checked]
    _checked[index] = !_checked[index]

    this.setState({
      checked: _checked,
    })
  }

  render() {
    const {
      I18n,
      isVoteMode,
      pRepTypeCnt,
      pReps,
      addPRep,
      myVotesCnt,
    } = this.props
    const {
      checked,
      keyword,
    } = this.state
    const wrapClassName = isVoteMode ? 'choice' : ''
    const pRepsFiltered = pReps
      .filter(pRep => checked[pRep.grade])
      .filter(pRep => pRep.name.toLowerCase().includes(keyword.toLowerCase()))

    return (
      <div className={`wrap-holder ${wrapClassName}`}>
        <PRepsLeaderboardSearch
          I18n={I18n}
          pRepTypeCnt={pRepTypeCnt}
          filterData={this.filterData}
          handleInputChange={this.handleInputChange}
          checked={checked} />
        <PRepsTable
          data={pRepsFiltered}
          isLeaderboard={true}
          isVoteMode={isVoteMode}
          myVotesCnt={myVotesCnt}
          addPRep={addPRep}
        />
      </div>
    )
  }
}

const PRepsLeaderboardSearch = ({
  I18n,
  pRepTypeCnt,
  filterData,
  checked,
  keyword,
  handleInputChange
}) => (
    <div className="label-group">
      <span className="label">P-Reps</span>
      <div className="search-group">
        {
          Object.values(P_REP_TYPE).map((pRepType, i) => (
            <SearchCheckBox
              key={i}
              id={i + 1}
              label={pRepType}
              cnt={pRepTypeCnt[i]}
              checked={checked[i]}
              filterData={filterData} />
          ))
        }
        <span className="search on">
          <input
            type="text"
            className="txt-type-normal"
            placeholder={I18n.button.search}
            value={keyword}
            onChange={handleInputChange} />
          <i className="_img"></i>
        </span>
      </div>
    </div>
  )

const SearchCheckBox = ({ id, label, cnt, checked, filterData }) => (
  <span>
    <input
      id={`cbox-0${id}`}
      className="cbox-type"
      type="checkbox"
      name=""
      checked={checked}
      onChange={e => filterData({
        index: id - 1,
      })} />
    <label
      htmlFor={`cbox-0${id}`}
      className="label _img">{label}
      <em>({cnt})</em>
    </label>
  </span>
)

export default PRepsLeaderboard
