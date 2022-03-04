import { connect } from 'react-redux';
import { PRepsBondTable } from 'app/components/';
import { convertStakeValueToText, convertToPercent } from 'utils'
import { deletePRepBond, updateMyBonds } from 'redux/actions/pRepActions'
import { fromLoop } from 'utils'
import BigNumber from "bignumber.js";

function mapStateToProps(state) {
  const { isBondMode } = state.pRep
  const { account, isLoggedIn } = state.wallet.selectedWallet
  const bonded = state.iiss.bonded[account] || {}
  const {
    pRepsMap,
    pRepsLoading,
    myBonds,
    myUnbonds,
    bondedMap,
    editedMap,
    unbondingMap,
    myBondsMap,
    myBonded,
    myUnbondsMap,
    myUnbonding,
    myAvailable,
  } = state.pRep
  const {
    bonds,
    loading: bondedLoading,
    totalBonded,
    available,
  } = bonded

  console.log("myBonds: ", myBonds);
  console.log("myUnbonds: ", myUnbonds);
  console.log("myBondsMap: ", myBondsMap);
  console.log("myUnbondsMap: ", myUnbondsMap);
  console.log("myBonded: ", convertStakeValueToText(myBonded));
  console.log("myUnbonding: ", convertStakeValueToText(myUnbonding));
  console.log("myAvailable: ", convertStakeValueToText(myAvailable));
  console.log("available: ", available);

  var totalBondedManual = fromLoop(0);
  for (var i = 0; i < myBonds.length; ++i) {
    totalBondedManual = totalBondedManual.plus(fromLoop(myBonds[i].value));
  }
  const totalStaked = available && new BigNumber(available).plus(totalBondedManual).plus(myUnbonding)
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
    myUnbonding,
    totalStaked,
    isBondMode,
    isLeaderboard: false,
    myBondsCnt: myBonds.length,
    loading: pRepsLoading || bondedLoading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    deletePRepBond: (address) => dispatch(deletePRepBond(address)),
    updateMyBonds: payload => dispatch(updateMyBonds(payload)),
  };
}

const MyPRepsBondTableContainer = connect(mapStateToProps, mapDispatchToProps)(PRepsBondTable);

export default MyPRepsBondTableContainer;
