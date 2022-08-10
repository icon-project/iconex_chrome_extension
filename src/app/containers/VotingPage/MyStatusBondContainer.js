import { connect } from 'react-redux';
import { MyStatusStakeBond } from 'app/components/';
import BigNumber from 'bignumber.js';
import {
  convertToPercent,
  convertStakeValueToText,
  convertNumberToText,
  convertUnbondValueToText,
  randomUint32
} from 'utils';
import {validateBond} from 'redux/reducers/iissReducer'
import axios from "axios";
import {ICX_WALLET_SERVER} from "../../../constants/config";

let lastBlock;
setLastBlock();

function setLastBlock() {
    let walletApi = axios.create({
      baseURL: ICX_WALLET_SERVER(),
      headers: {
        'Content-Type': 'application/json',
      }
    });
    let param = {
      jsonrpc: "2.0",
      method: "icx_getLastBlock",
      id: randomUint32()
    };
    return new Promise((resolve, reject) => {
      walletApi.post(`/api/v3`, JSON.stringify(param))
        .then(res => {
          if (res.data.result) {
            console.log("walletIcxApi icx_getLastBlock called", res.data.result);
            lastBlock = res.data.result;
          } else {
            throw new Error(res.data.error);
          }
        })
        .catch(error => {
          reject(error);
        })
  });
}

function mapStateToProps(state) {
  const { isLoggedIn } = state.wallet.selectedWallet
  const selectedAccount = state.wallet.selectedWallet.account
  const staked = state.iiss.staked[selectedAccount] || {}
  const { loading: stakedLoading } = staked
  const delegated = state.iiss.delegated[selectedAccount] || {}
  const available = delegated.available
  const bonded = state.iiss.bonded[selectedAccount] || {}
  const { totalBonded, totalUnbonding, unbonds, loading: bondedLoading } = bonded
  const value = available && available.plus(totalBonded).plus(totalUnbonding)
  const bondedValue = totalBonded && totalBonded.plus(totalUnbonding)
  const bondedPct = convertToPercent(totalBonded, value, 1)
  const bondedWidthPct = convertToPercent(bondedValue, value)

  const unbondingPct = convertToPercent(totalUnbonding, value, 1)
  const unbondingWidthPct = convertToPercent(totalUnbonding, value)

  const availablePct = (100 - bondedPct - unbondingPct).toFixed(1)
  const availableWidthPct = (100 - bondedWidthPct).toString()

  const isUnbondingFull = unbondingPct === '100'
  const isUnbondExist = totalUnbonding && !totalUnbonding.eq(0)
  const isUnbondingEqualToBond = bondedWidthPct === unbondingWidthPct

  const isNoBalance = value && validateBond(value)

  const showHyphen = (val) => isLoggedIn ? val : '-'
  const getGraphClassName = () => {
    if (!isLoggedIn || isNoBalance) {
      return 'no'
    } else if (isUnbondingFull) {
      return 'unstake'
    } else if (unbondingWidthPct === '100') {
      return 'notvoted'
    } else if (bondedPct === '100' && unbondingWidthPct > 0) {
      return 'unstake'
    } else if (bondedPct === '100') {
      return 'notavail'
    } else {
      return ''
    }
  }

  return {
    wrapClassName: 'center-group bond-group',
    graphClassName: getGraphClassName(),
    compType: 'bond',
    title: 'Bond',
    buttonLabel: 'bond',
    axis1: {
      label: 'myStatusBond_axis1',
      value: isNoBalance ? '-' : showHyphen(bondedPct),
      width: bondedWidthPct - unbondingWidthPct,
    },
    axis2: {
      label: 'myStatusBond_axis2',
      value: isNoBalance ? '-' : showHyphen(availablePct),
      width: availableWidthPct,
    },
    li1: {
      label: 'myStatusBond_li1',
      value: showHyphen(convertStakeValueToText(value, 'icx', true)),
    },
    li2: {
      label: 'myStatusBond_li2',
      value: showHyphen(convertStakeValueToText(totalBonded, 'icx', true)),
    },
    li3: {
      label: 'myStatusBond_li3',
      value: showHyphen(convertStakeValueToText(available, 'icx', true)),
    },
    li4: {
      label: 'myStatusBond_li4',
      value: showHyphen(convertStakeValueToText(totalUnbonding, 'icx', true)),
    },
    isUnbondExist,
    isUnbondingFull,
    isUnbondingEqualToBond,
    unbonds: {
      label: 'myStatusBond_unbond1',
      value: !!unbonds ? unbonds.map(unbond => ({
        address: unbond.address,
        value: showHyphen(convertUnbondValueToText(unbond.value)),
        expireBlockHeight: showHyphen(convertNumberToText(unbond.expireBlockHeight, 'icx', true)),
        remainingBlocks: new BigNumber(unbond.expireBlockHeight - lastBlock.height),
        blockTimeStamp: lastBlock.time_stamp
      })) : [],
      width: unbondingWidthPct,
      percent: showHyphen(unbondingPct)
    },
    isLoggedIn,
    loading: stakedLoading || bondedLoading,
    error: isNoBalance,
  };
}

function mapDispatchToProps(dispatch) {
  return {

  };
}

const MyStatusBondContainer = connect(mapStateToProps, mapDispatchToProps)(MyStatusStakeBond);

export default MyStatusBondContainer;