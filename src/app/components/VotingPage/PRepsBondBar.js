import React from "react";
import BigNumber from "bignumber.js";
import {
  convertStakeValueToText,
  trimSpace,
  isValidICXInput,
  map,
} from "utils";
import { MyBondsInput, PRepsBarInputRange } from "app/components";
import { pRepType as P_REP_TYPE } from "constants/index";
import { trackerAccountUrl as TRACKER_ACCOUNT_URL } from "constants/config.js";

class PRepsBondBar extends React.Component {
  constructor(props) {
    super(props);
    const { data } = props;
    const { newBond } = data;
    this.state = {
      isInputMode: false,
      inputValue: newBond,
      rangeBondedPct: new BigNumber(0),
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
        rangeBondedPct: map({
          value: data.newBond,
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
    const { data, updateMyBond, maxAvailable, showAlert } = this.props;
    const { myBond, address } = data;
    const { inputValue } = this.state;

    let _value = !e.target.value ? new BigNumber(0) : new BigNumber(inputValue);

    if (_value.gt(maxAvailable)) {
      showAlert(maxAvailable);
      this.setState({
        isInputMode: false,
        inputValue: data.newBond,
      });
      return;
    }

    updateMyBond({
      address,
      value: _value,
      isEdited: !myBond.eq(_value),
    });
    this.setState({
      isInputMode: false,
      rangeBondedPct: map({
        value: _value,
        x1: new BigNumber(0),
        y1: maxAvailable,
        x2: new BigNumber(0),
        y2: new BigNumber(100),
      }),
    });
  };

  handleChangeRange = (_rangeBondedPct) => {
    const { data, maxAvailable, updateMyBond } = this.props;
    const { myBond, address } = data;

    _rangeBondedPct = new BigNumber(_rangeBondedPct);
    if (_rangeBondedPct <= 0) {
      _rangeBondedPct = new BigNumber(0);
    } else if (_rangeBondedPct >= 100) {
      _rangeBondedPct = new BigNumber(100);
    }

    let _newBond = new BigNumber(
      maxAvailable.times(_rangeBondedPct).div(100).toFixed(4, 1)
    );

    this.setState(
      {
        inputValue: _newBond,
        rangeBondedPct: _rangeBondedPct,
      },
      () => {
        updateMyBond({
          address,
          value: _newBond,
          isEdited: !myBond.eq(_newBond),
        });
      }
    );
  };

  viewDetail = () => {
    const {
      isBondMode,
      data: { address },
    } = this.props;
    if (!isBondMode) {
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
      isBondMode,
      myBondsCnt,
      showRankAndTotalBonds,
      maxAvailablePct,
      selectPRepIndex,
      addPRep,
      deletePRep,
    } = this.props;

    const {
      address,
      grade,
      name,
      bonded,
      bondedPct,
      city,
      country,
      rank,
      myBond,
      myBondPct,
      governance,
      sponsoredProjects,
      isUnregistered = false,
      isBonded = false,
      isEdited = false,
      isInMyVotes = false,
    } = data;

    const { isInputMode, inputValue, rangeBondedPct, step } = this.state;

    const getLabel = () => {
      let result = !isUnregistered
        ? `${Object.values(P_REP_TYPE)[grade]}`
        : "Unregistered";
      if (isBonded) result += " / Voted";
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
          {isBondMode && (
            <AddDeleteButton
              I18n={I18n}
              address={address}
              isPlus={!!isLeaderboard}
              isInMyVotes={isInMyVotes}
              myBondsCnt={myBondsCnt}
              isBonded={isBonded}
              addPRep={addPRep}
              deletePRep={deletePRep}
            />
          )}
          {showRankAndTotalBonds ? (
            <span>{!isUnregistered ? rank : "-"}</span>
          ) : (
            <span></span>
          )}
          {isSelected && (
            <div className="controller-group">
              <PRepsBarInputRange
                isInputMode={isInputMode}
                rangeBondedPct={rangeBondedPct.toNumber()}
                handleChangeRange={this.handleChangeRange}
                step={step}
              />
              <p>
                {I18n.votePage.max}
                <em>{`${maxAvailablePct}%`}</em>
              </p>
              <p className="cnt">{`${index}/${myBondsCnt}`}</p>
            </div>
          )}
        </td>
        <td>
          <span onClick={this.viewDetail} className="ellipsis">
            <em className="p-rep">{getLabel()}</em>
            {!isUnregistered ? name : address}
          </span>
        </td>
        {showRankAndTotalBonds ? (
          <td>
            {!isUnregistered
              ? `${convertStakeValueToText(bonded)} (${bondedPct}%)`
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
        {!isLeaderboard && isBondMode && (
          <MyBondsInput
            data={data}
            inputValue={inputValue}
            isInputMode={isInputMode}
            handleFocusInput={this.handleFocusInput}
            handleBlurInput={this.handleBlurInput}
            handleChangeInput={this.handleChangeInput}
          />
        )}
        {!isLeaderboard && !isBondMode && (
          <td>{`${convertStakeValueToText(
            myBond
          )} ($BondedtionPct}%)`}</td>
        )}
      </tr>
    );
  }
}

const AddDeleteButton = ({
  I18n,
  address,
  isPlus,
  isBonded,
  myBondsCnt,
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
      } else if (myBondsCnt === 100) {
        result.text = I18n.votePage.add_cntFull;
        result.isDisable = true;
      } else {
        result.text = I18n.votePage.add;
      }
    } else {
      if (isBonded) {
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

export default PRepsBondBar;
