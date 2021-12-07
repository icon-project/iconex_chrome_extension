import React, { Component } from "react";
import ReactDOM from "react-dom";
import withLanguageProps from "HOC/withLanguageProps";
import { PRepsBondBar, LoadingComponent } from "app/components";
import { convertToPercent } from "utils";

const SORT_TYPE = {
  RANK: "RANK",
  MY_BOND: "MY_BOND",
};

@withLanguageProps
class PRepsBondTable extends Component {
  state = {
    isAsc: !!this.props.isLeaderboard,
    sortType: !this.props.isBondMode
      ? !!this.props.isLeaderboard
        ? ""
        : SORT_TYPE.MY_BOND
      : "",
    selectedPRepIndex: 0,
    maxAvailable: 0,
    maxAvailablePct: 0,
  };

  componentWillMount() {
    if (this.getIsMyPRepsTableInVoteMode()) {
      document.addEventListener("click", this.detectClickOut, false);
    }
  }

  componentWillUnmount() {
    if (this.getIsMyPRepsTableInVoteMode()) {
      document.removeEventListener("click", this.detectClickOut, false);
    }
  }

  detectClickOut = (e) => {
    if (!ReactDOM.findDOMNode(this).contains(e.target)) {
      this.setState({
        selectedPRepIndex: 0,
      });
    }
  };

  componentDidUpdate(prevProps) {
    const { myBondsCnt } = this.props;
    const { sortType } = this.state;

    if (
      this.getIsMyPRepsTableInVoteMode() &&
      myBondsCnt !== prevProps.myBondsCnt &&
      !prevProps.loading
    ) {
      this.setState({
        sortType: myBondsCnt > prevProps.myBondsCnt ? "" : sortType,
        selectedPRepIndex: 0,
      });
    }
  }

  getIsMyPRepsTableInVoteMode = () => {
    const { isBondMode, isLeaderboard } = this.props;
    return isBondMode && !isLeaderboard;
  };

  toggleSort = (_sortType) => {
    let { isAsc, sortType } = this.state;
    const { isLeaderboard } = this.props;

    if (this.getIsMyPRepsTableInVoteMode()) {
      return;
    }

    if (sortType !== _sortType) {
      isAsc = !!isLeaderboard;
    }
    this.setState({
      isAsc: !isAsc,
      sortType: _sortType,
    });
  };

  sortPReps = () => {
    const { data } = this.props;
    const { isAsc, sortType } = this.state;
    switch (sortType) {
      case SORT_TYPE.MY_BOND:
        return data.sort(
          ({ myDelegation: a, rank: c }, { myDelegation: b, rank: d }) =>
            (isAsc ? a - b : b - a) || c - d
        );
      case SORT_TYPE.RANK:
        return data.sort(({ rank: a }, { rank: b }) => (isAsc ? a - b : b - a));
      default:
        return data;
    }
  };

  selectPRepIndex = (index) => {
    const { selectedPRepIndex } = this.state;
    const { myAvailable, totalStaked, data } = this.props;
    if (selectedPRepIndex === index) return;
    if (this.getIsMyPRepsTableInVoteMode()) {
      const _newDelegation = data[index - 1].newDelegation;
      const maxAvailable = myAvailable.plus(_newDelegation);
      this.setState({
        maxAvailable,
        maxAvailablePct: convertToPercent(maxAvailable, totalStaked, 1),
        selectedPRepIndex: index,
        sortType: "",
      });
    }
  };

  render() {
    const {
      data,
      myBondsCnt,
      isLeaderboard,
      isBondMode,
      addPRep,
      deletePRep,
      updateMyBonds,
      loading = false,
      showAlert,
      showRankAndTotalBonds,
      showCPSData,
      I18n,
    } = this.props;

    const {
      isAsc,
      sortType,
      selectedPRepIndex,
      maxAvailable,
      maxAvailablePct,
    } = this.state;

    if (loading) {
      return (
        <div style={{ height: "300px" }}>
          <LoadingComponent type="black" />
        </div>
      );
    }

    const sortedData = this.sortPReps();
    const isMyPRepsTableInVoteMode = this.getIsMyPRepsTableInVoteMode();

    return (
      <table className={`table-typeG ${showRankAndTotalBonds ? "" : "hide"}`}>
        <thead>
          <tr>
            {showRankAndTotalBonds ? (
              <SortToggleButton
                label={I18n.pRepTable_rank}
                sortType={SORT_TYPE.RANK}
                curSortType={sortType}
                isAsc={isAsc}
                toggleSort={this.toggleSort}
              />
            ) : (
              <th>
                <span></span>
              </th>
            )}
            <th>
              <span>
                {I18n.pRepTable_name}
                <i className="_img"></i>
              </span>
            </th>
            {showRankAndTotalBonds ? (
              <th>
                <span>
                  {I18n.pRepTable_totalBonds}
                  <i className="_img"></i>
                </span>
              </th>
            ) : (
              <th>
                <span></span>
              </th>
            )}
            {showCPSData && <th>{I18n.pRepTable_governance}</th>}
            {showCPSData && <th>{I18n.pRepTable_sponsoredProjects}</th>}
            {isLeaderboard && <th>{I18n.pRepTable_server}</th>}
            {!isLeaderboard && (
              <SortToggleButton
                label={I18n.pRepTable_myBonds}
                sortType={SORT_TYPE.MY_BOND}
                curSortType={sortType}
                isAsc={isAsc}
                toggleSort={this.toggleSort}
              />
            )}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((el, i) => (
            <PRepsBondBar
              key={i}
              I18n={I18n}
              index={i + 1}
              data={el}
              myBondsCnt={myBondsCnt}
              isLeaderboard={isLeaderboard}
              isBondMode={isBondMode}
              isSelected={
                isMyPRepsTableInVoteMode && selectedPRepIndex === i + 1
              }
              isNotSelected={
                isMyPRepsTableInVoteMode &&
                selectedPRepIndex !== 0 &&
                selectedPRepIndex !== i + 1
              }
              maxAvailable={maxAvailable}
              maxAvailablePct={maxAvailablePct}
              showRankAndTotalBonds={showRankAndTotalBonds}
              showCPSData={showCPSData}
              selectPRepIndex={this.selectPRepIndex}
              addPRep={addPRep}
              deletePRep={deletePRep}
              updateMyBonds={updateMyBonds}
              showAlert={showAlert}
            />
          ))}
          {!isLeaderboard && data.length === 0 && (
            <tr>
              <td colSpan="5" className="nodata">
                <p>
                  {isBondMode
                    ? I18n.pRepTable_noData_p1
                    : I18n.pRepTable_noData_p}
                </p>
                {I18n.pRepTable_noData_p2}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }
}

function SortToggleButton({ label, curSortType, sortType, isAsc, toggleSort }) {
  return (
    <th onClick={() => toggleSort(sortType)} className="on">
      <span>
        {label}
        {curSortType === sortType && (
          <i className={`_img ${!isAsc ? "up" : "down"}`}></i>
        )}
      </span>
    </th>
  );
}

export default PRepsBondTable;
