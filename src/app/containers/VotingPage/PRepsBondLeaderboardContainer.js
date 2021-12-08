import { connect } from "react-redux";
import { PRepsBondLeaderboard } from "app/components/";
import { addPRepBond } from "redux/actions/pRepActions";

function mapStateToProps(state) {
  const {
    isBondMode,
    pReps,
    pRepsLoading: loading,
    pRepTypeCnt,
    bondedMap,
    editedMap,
    myBondsMap,
    myBonds,
  } = state.pRep;

  const updatePRepsLabel = (pReps) => {
    if (isBondMode) {
      return pReps.map((pRep) => ({
        ...pRep,
        isBonded: !!bondedMap[pRep.address],
        isEdited: !!editedMap[pRep.address],
        isInMyBonds: !!myBondsMap[pRep.address],
      }));
    }
    return pReps;
  };

  console.log(pReps);

  return {
    pReps: updatePRepsLabel(pReps),
    myBondsCnt: myBonds.length,
    isBondMode,
    loading,
    pRepTypeCnt,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addPRepBond: (address) => dispatch(addPRepBond(address)),
  };
}

const PRepsBondLeaderboardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PRepsBondLeaderboard);

export default PRepsBondLeaderboardContainer;
