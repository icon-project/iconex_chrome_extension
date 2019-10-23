import { connect } from 'react-redux';
import { PRepsLeaderboard } from 'app/components/';
import { addPRep } from 'redux/actions/pRepActions'

function mapStateToProps(state) {
  const {
    isVoteMode,
    pReps,
    pRepsLoading: loading,
    pRepTypeCnt,
    votedMap,
    editedMap,
    myVotesMap,
    myVotes,
  } = state.pRep

  const updatePRepsLabel = (pReps) => {
    if (isVoteMode) {
      return pReps.map(pRep => ({
        ...pRep,
        isVoted: !!votedMap[pRep.address],
        isEdited: !!editedMap[pRep.address],
        isInMyVotes: !!myVotesMap[pRep.address],
      }))
    }
    return pReps
  }

  return {
    pReps: updatePRepsLabel(pReps),
    myVotesCnt: myVotes.length,
    isVoteMode,
    loading,
    pRepTypeCnt,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addPRep: (address) => dispatch(addPRep(address)),
  };
}

const PRepsLeaderboardContainer = connect(mapStateToProps, mapDispatchToProps)(PRepsLeaderboard);

export default PRepsLeaderboardContainer;
