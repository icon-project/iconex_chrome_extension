import { connect } from 'react-redux';
import { PRepsBondingStatusGraph } from 'app/components/';
import {convertStakeValueToText, convertToPercent} from 'utils'

function mapStateToProps(state) {
  const {
  } = state.pRep
  const {
    myBonded,
    myUnbonding,
    myAvailable,
  } = state.pRep
  const totalStaked = myBonded.plus(myAvailable).plus(myUnbonding)
  const myBondedPct = convertToPercent(myBonded, totalStaked, 1)
  const myUnbondingPct = convertToPercent(myUnbonding, totalStaked, 1)
  const myAvailablePct = (100 - Number(myBondedPct) - Number(myUnbondingPct)).toFixed(1)
  const totalBonded = myBonded.plus(myUnbonding)
  const totalBondedPct = convertToPercent(totalBonded, totalStaked, 1)
  const isUnbondExist = myUnbonding && !myUnbonding.eq(0)
  const getMyVotesCompGraphClass = () => {
    if(myUnbondingPct === '100.0') {
      return 'unstake'
    } else if (myAvailablePct === '100.0') {
      return 'notbonded'
    } else if (myBondedPct === '100.0') {
      return 'notavail'
    } else {
      return ''
    }
  }

  const myBondsCompData = {
    myBonded,
    myBondedPct,
    myUnbonding,
    myUnbondingPct,
    myAvailable,
    myAvailablePct,
    totalBonded,
    totalBondedPct,
    isUnbondExist,
    graphClass: getMyVotesCompGraphClass(),
  }

  return myBondsCompData;
}

function mapDispatchToProps(dispatch) {
  return {

  };
}

const PRepsBondingStatusGraphContainer = connect(mapStateToProps, mapDispatchToProps)(PRepsBondingStatusGraph);

export default PRepsBondingStatusGraphContainer;