import { connect } from 'react-redux';
import { PRepsBondTable } from 'app/components/';
import { convertToPercent } from 'utils'
import { deletePRep, updateMyBonds } from 'redux/actions/pRepActions'
import { fromLoop } from 'utils'

function mapStateToProps(state) {
  const { isBondMode } = state.pRep
  const { account, isLoggedIn } = state.wallet.selectedWallet
  const bonded = state.iiss.bonded[account] || {}
  const {
    pRepsMap,
    pRepsLoading,
    myBonds,
    bondedMap,
    editedMap,
    myBondsMap,
    myBonded,
    myAvailable,
  } = state.pRep
  const {
    bonds,
    loading: bondedLoading,
    totalBonded,
    available,
  } = bonded

  var totalBondedManual = fromLoop(0);
  for (var i = 0; i < myBonds.length; ++i) {
    totalBondedManual = totalBondedManual.plus(fromLoop(myBonds[i].value));
  }
  const totalStaked = available && available.plus(totalBondedManual)

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
    if (isBondMode) {
      return myBonds.map(({ value, address }) => {
        let pRepData = getPRepData(address)
        return {
          myBond: myBondsMap[address],
          myBondPct: convertToPercent(10, 100, 1),
          newBond: value,
          newBondPct: convertToPercent(10, 100, 1),
          isBonded: !!bondedMap[address],
          isEdited: !!editedMap[address],
          ...pRepData,
        }
      })
    } else {
      return (bonds || []).map(({ value, address }) => {
        let pRepData = getPRepData(address)
        console.log(pRepData)
        return {
          myBond: value,
          myBondPct: convertToPercent(10, 100, 1),
          ...pRepData,
        }
      })
    }
  }

  const _pReps = isLoggedIn && switchData()
  const myBondedPct = convertToPercent(myBonded, totalStaked)
  const myAvailablePct = (100 - Number(myBondedPct)).toFixed(1)

  return {
    data: _pReps || [],
    myBonded,
    myBondedPct,
    myAvailablePct,
    myAvailable,
    totalStaked,
    isBondMode,
    isLeaderboard: false,
    myBondsCnt: myBonds.length,
    loading: pRepsLoading || bondedLoading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    deletePRep: (address) => dispatch(deletePRep(address)),
    updateMyBonds: payload => dispatch(updateMyBonds(payload)),
  };
}

const MyPRepsBondTableContainer = connect(mapStateToProps, mapDispatchToProps)(PRepsBondTable);

export default MyPRepsBondTableContainer;
