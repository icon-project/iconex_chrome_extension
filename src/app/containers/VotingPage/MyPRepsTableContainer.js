import { connect } from 'react-redux';
import { PRepsTable } from 'app/components/';
import { convertToPercent } from 'utils'
import { deletePRep, updateMyVotes } from 'redux/actions/pRepActions'

function mapStateToProps(state) {
  const { isVoteMode } = state.pRep
  const { account, isLoggedIn } = state.wallet.selectedWallet
  const delegated = state.iiss.delegated[account] || {}
  const {
    pRepsMap,
    pRepsLoading,
    myVotes,
    votedMap,
    editedMap,
    myVotesMap,
    myDelegated,
    myAvailable,
  } = state.pRep
  const {
    delegations,
    loading: delegatedLoading,
    totalDelegated,
    available,
  } = delegated

  const totalStaked = available && available.plus(totalDelegated)

  const switchData = () => {
    const getPRepData = (address) => {
      let pRepData = pRepsMap[address]
      if (!pRepData) {
        pRepData = {
          address,
          rank: Infinity,
          isUnregistered: true
        }
      }
      return pRepData
    }
    if (isVoteMode) {
      return myVotes.map(({ value, address }) => {
        let pRepData = getPRepData(address)
        return {
          myDelegation: myVotesMap[address],
          myDelegationPct: convertToPercent(value, totalDelegated, 1),
          newDelegation: value,
          newDelegationPct: convertToPercent(value, totalStaked, 1),
          isVoted: !!votedMap[address],
          isEdited: !!editedMap[address],
          ...pRepData,
        }
      })
    } else {
      return (delegations || []).map(({ value, address }) => {
        let pRepData = getPRepData(address)
        return {
          myDelegation: value,
          myDelegationPct: convertToPercent(value, totalDelegated, 1),
          ...pRepData,
        }
      })
    }
  }

  const _pReps = isLoggedIn && switchData()
  const myDelegatedPct = convertToPercent(myDelegated, totalStaked)
  const myAvailablePct = (100 - Number(myDelegatedPct)).toFixed(1)

  return {
    data: _pReps || [],
    myDelegated,
    myDelegatedPct,
    myAvailablePct,
    myAvailable,
    totalStaked,
    isVoteMode,
    isLeaderboard: false,
    myVotesCnt: myVotes.length,
    loading: pRepsLoading || delegatedLoading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    deletePRep: (address) => dispatch(deletePRep(address)),
    updateMyVotes: payload => dispatch(updateMyVotes(payload)),
  };
}

const MyPRepsTableContainer = connect(mapStateToProps, mapDispatchToProps)(PRepsTable);

export default MyPRepsTableContainer;
