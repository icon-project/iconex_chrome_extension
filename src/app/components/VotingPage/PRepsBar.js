import React from "react";
import BigNumber from "bignumber.js";
import {
  convertStakeValueToText,
  trimSpace,
  isValidICXInput,
  map,
} from "utils";
import { MyVotesInput, PRepsBarInputRange } from "app/components";
import { pRepType as P_REP_TYPE } from "constants/index";
import { trackerAccountUrl as TRACKER_ACCOUNT_URL } from "constants/config.js";

class PRepsBar extends React.Component {
  constructor(props) {
    super(props);
    const { data } = props;
    const { newDelegation } = data;
    this.state = {
      isInputMode: false,
      inputValue: newDelegation,
      rangeDelegatedPct: new BigNumber(0),
      step: 0,
    };
  }

  componentWillUpdate(nextProps) {
    if (
      this.props.isSelected !== nextProps.isSelected &&
      nextProps.isSelected
    ) {
      const { data, maxAvailable, maxAvailablePct } = nextProps;
      this.setState({
        rangeDelegatedPct: map({
          value: data.newDelegation,
          x1: new BigNumber(0),
          y1: maxAvailable,
          x2: new BigNumber(0),
          y2: new BigNumber(100),
        }),
        step: Number((100 / maxAvailablePct).toFixed(8)),
      });
    }
  }

  handleFocusInput = () => {
    this.setState({
      isInputMode: true,
    });
  };

  handleChangeInput = (e) => {
    const value = trimSpace(e.target.value);
    if (isValidICXInput(value, 4)) {
      this.setState({
        inputValue: value,
      });
    }
  };

  handleBlurInput = (e) => {
    const { data, updateMyVotes, maxAvailable, showAlert } = this.props;
    const { myDelegation, address } = data;
    const { inputValue } = this.state;

    let _value = !e.target.value ? new BigNumber(0) : new BigNumber(inputValue);

    if (_value.gt(maxAvailable)) {
      showAlert(maxAvailable);
      this.setState({
        isInputMode: false,
        inputValue: data.newDelegation,
      });
      return;
    }

    updateMyVotes({
      address,
      value: _value,
      isEdited: !myDelegation.eq(_value),
    });
    this.setState({
      isInputMode: false,
      rangeDelegatedPct: map({
        value: _value,
        x1: new BigNumber(0),
        y1: maxAvailable,
        x2: new BigNumber(0),
        y2: new BigNumber(100),
      }),
    });
  };

  handleChangeRange = (_rangeDelegatedPct) => {
    const { data, maxAvailable, updateMyVotes } = this.props;
    const { myDelegation, address } = data;

    _rangeDelegatedPct = new BigNumber(_rangeDelegatedPct);
    if (_rangeDelegatedPct <= 0) {
      _rangeDelegatedPct = new BigNumber(0);
    } else if (_rangeDelegatedPct >= 100) {
      _rangeDelegatedPct = new BigNumber(100);
    }

    let _newDelegation = new BigNumber(
      maxAvailable.times(_rangeDelegatedPct).div(100).toFixed(4, 1)
    );

    this.setState(
      {
        inputValue: _newDelegation,
        rangeDelegatedPct: _rangeDelegatedPct,
      },
      () => {
        updateMyVotes({
          address,
          value: _newDelegation,
          isEdited: !myDelegation.eq(_newDelegation),
        });
      }
    );
  };

  viewDetail = () => {
    const {
      isVoteMode,
      data: { address },
    } = this.props;
    if (!isVoteMode) {
      window.open(`${TRACKER_ACCOUNT_URL["icx"]}${address}`, "_blank");
    }
  };

  render() {
    const {
      I18n,
      data,
      index,
      isLeaderboard = false,
      isSelected = false,
      isNotSelected = false,
      showCPSData = false,
      isVoteMode,
      myVotesCnt,
      showRankAndTotalVotes,
      maxAvailablePct,
      selectPRepIndex,
      addPRep,
      deletePRep,
    } = this.props;

    const {
      address,
      grade,
      name,
      delegated,
      delegatedPct,
      city,
      country,
      rank,
      myDelegation,
      myDelegationPct,
      governance,
      sponsoredProjects,
      isUnregistered = false,
      isVoted = false,
      isEdited = false,
      isInMyVotes = false,
    } = data;

    const { isInputMode, inputValue, rangeDelegatedPct, step } = this.state;

    const getLabel = () => {
      let result = !isUnregistered
        ? `${Object.values(P_REP_TYPE)[grade]}`
        : "Unregistered";
      if (isVoted) result += " / Voted";
      if (isEdited) result += " / Edited";
      return result;
    };

    return (
      <tr
        onClick={() => selectPRepIndex(index)}
        className={`
          ${isSelected ? "select" : ""}
          ${isNotSelected ? "disabled" : ""}
          `}
      >
        <td>
          {isVoteMode && (
            <AddDeleteButton
              I18n={I18n}
              address={address}
              isPlus={!!isLeaderboard}
              isInMyVotes={isInMyVotes}
              myVotesCnt={myVotesCnt}
              isVoted={isVoted}
              addPRep={addPRep}
              deletePRep={deletePRep}
            />
          )}
          {showRankAndTotalVotes ? (
            <span>{!isUnregistered ? rank : "-"}</span>
          ) : (
            <span></span>
          )}
          {isSelected && (
            <div className="controller-group">
              <PRepsBarInputRange
                isInputMode={isInputMode}
                rangeDelegatedPct={rangeDelegatedPct.toNumber()}
                handleChangeRange={this.handleChangeRange}
                step={step}
              />
              <p>
                {I18n.votePage.max}
                <em>{`${maxAvailablePct}%`}</em>
              </p>
              <p className="cnt">{`${index}/${myVotesCnt}`}</p>
            </div>
          )}
        </td>
        <td>
          <span onClick={this.viewDetail} className="ellipsis">
            <em className="p-rep">{getLabel()}</em>
            {!isUnregistered ? name : address}
          </span>
        </td>
        {showRankAndTotalVotes ? (
          <td>
            {!isUnregistered
              ? `${convertStakeValueToText(delegated)} (${delegatedPct}%)`
              : "-"}
          </td>
        ) : (
          <td></td>
        )}
        {showCPSData && (
          <td>
            <span className="ellipsis">{governance ? "YES" : "NO"}</span>
          </td>
        )}
        {showCPSData && (
          <td>
            <span className="ellipsis">{sponsoredProjects}</span>
          </td>
        )}
        {isLeaderboard && (
          <td>
            <span className="ellipsis">{`${city}, ${country}`}</span>
          </td>
        )}
        {!isLeaderboard && isVoteMode && (
          <MyVotesInput
            data={data}
            inputValue={inputValue}
            isInputMode={isInputMode}
            handleFocusInput={this.handleFocusInput}
            handleBlurInput={this.handleBlurInput}
            handleChangeInput={this.handleChangeInput}
          />
        )}
        {!isLeaderboard && !isVoteMode && (
          <td>{`${convertStakeValueToText(
            myDelegation
          )} (${myDelegationPct}%)`}</td>
        )}
      </tr>
    );
  }
}

const AddDeleteButton = ({
  I18n,
  address,
  isPlus,
  isVoted,
  myVotesCnt,
  isInMyVotes,
  isMyVotesFull = false,
  addPRep,
  deletePRep,
}) => {
  const getData = () => {
    const result = {
      text: "",
      width: "auto",
      isDisable: false,
    };
    if (isPlus) {
      if (isInMyVotes) {
        result.text = I18n.votePage.add_added;
        result.isDisable = true;
      } else if (myVotesCnt === 100) {
        result.text = I18n.votePage.add_cntFull;
        result.isDisable = true;
      } else {
        result.text = I18n.votePage.add;
      }
    } else {
      if (isVoted) {
        result.text = I18n.votePage.delete_voted;
        result.isDisable = true;
      } else {
        result.text = I18n.votePage.delete;
      }
    }
    return result;
  };
  const { text, width, isDisable } = getData();
  const handleClick = (e) => {
    e.stopPropagation();
    if (isDisable) return;
    if (isPlus) {
      return addPRep(address);
    } else {
      return deletePRep(address);
    }
  };
  return (
    <em onClick={handleClick}>
      <i
        className={`
        _img 
        tooltip 
        ${isPlus ? "plus" : ""}
        ${isDisable ? "disabled" : ""}
      `}
      ></i>
      <div className="help-layer" style={{ width }}>
        <p className="txt">{text}</p>
        <div className="tri"></div>
      </div>
    </em>
  );
};

export default PRepsBar;
