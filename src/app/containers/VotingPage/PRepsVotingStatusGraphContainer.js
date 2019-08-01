import { connect } from 'react-redux';
import { PRepsVotingStatusGraph } from 'app/components/';
import { convertToPercent } from 'utils'

function mapStateToProps(state) {
  const {
    totalSupply,
    totalNetworkStaked,
    totalNetworkDelegated,
    isVoteMode,
  } = state.pRep
  const totalNetworkAvailable = totalNetworkStaked.minus(totalNetworkDelegated)
  const totalNetworkDelegatedWidthPct = convertToPercent(totalNetworkDelegated, totalSupply)
  const totalNetworkDelegatedPct = convertToPercent(totalNetworkDelegated, totalSupply, 1)
  const totalNetworkAvailableWidthPct = convertToPercent(totalNetworkAvailable, totalSupply)
  const totalNetworkAvailablePct = convertToPercent(totalNetworkAvailable, totalSupply, 1)
  const totalSupplyWidthPct = (100 - totalNetworkDelegatedWidthPct - totalNetworkAvailableWidthPct).toString()
  const getPRepCompGraphClass = () => {
    if (convertToPercent(totalNetworkStaked, totalSupply) === '0') {
      return 'zero'
    } else if (totalNetworkDelegatedWidthPct === '0') {
      return 'notvoted'
    } else if (totalNetworkAvailableWidthPct === '0') {
      return 'notavail'
    } else {
      return ''
    }
  }

  const {
    myDelegated,
    myAvailable,
  } = state.pRep
  const totalStaked = myDelegated.plus(myAvailable)
  const myDelegatedPct = convertToPercent(myDelegated, totalStaked, 1)
  const myAvailablePct = (100 - Number(myDelegatedPct)).toFixed(1)
  const getMyVotesCompGraphClass = () => {
    if (myAvailablePct === '100.0') {
      return 'notvoted'
    } else if (myDelegatedPct === '100.0') {
      return 'notavail'
    } else {
      return ''
    }
  }

  const myVotesCompData = {
    isVoteMode,
    myDelegated,
    myDelegatedPct,
    myAvailable,
    myAvailablePct,
    graphClass: getMyVotesCompGraphClass(),
  }

  const pRepCompData = {
    isVoteMode,
    totalSupply,
    totalSupplyWidthPct,
    totalNetworkDelegated,
    totalNetworkDelegatedPct,
    totalNetworkDelegatedWidthPct,
    totalNetworkAvailable,
    totalNetworkAvailablePct,
    totalNetworkAvailableWidthPct,
    graphClass: getPRepCompGraphClass(),
  }

  return isVoteMode ? myVotesCompData : pRepCompData
}

function mapDispatchToProps(dispatch) {
  return {

  };
}

const PRepsVotingStatusGraphContainer = connect(mapStateToProps, mapDispatchToProps)(PRepsVotingStatusGraph);

export default PRepsVotingStatusGraphContainer;