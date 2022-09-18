import { connect } from 'react-redux';
import { PRepsBondTable } from 'app/components/';
import { convertToPercent} from 'utils'
import { deletePRepBond, updateMyBonds } from 'redux/actions/pRepActions'
import BigNumber from "bignumber.js";

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
    available,
  } = bonded

  const totalStaked = available && new BigNumber(available).plus(myBonded)
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
