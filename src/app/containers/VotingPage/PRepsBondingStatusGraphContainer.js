import { connect } from 'react-redux';
import { PRepsBondingStatusGraph } from 'app/components/';
import { convertToPercent } from 'utils'

function mapStateToProps(state) {
  const {
  } = state.pRep
  const {
    myBonded,
    myAvailable,
  } = state.pRep
  const totalStaked = myBonded.plus(myAvailable)
  const myBondedPct = convertToPercent(myBonded, totalStaked, 1)
  const myAvailablePct = (100 - Number(myBondedPct)).toFixed(1)
  const getMyVotesCompGraphClass = () => {
    if (myAvailablePct === '100.0') {
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
    myAvailable,
    myAvailablePct,
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