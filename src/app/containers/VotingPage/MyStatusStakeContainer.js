import { connect } from 'react-redux';
import { MyStatusStakeVote } from 'app/components/';
import BigNumber from 'bignumber.js';
import {convertStakeValueToText, convertToPercent, convertNumberToText, randomUint32} from 'utils';
import { validateStake } from 'redux/reducers/iissReducer';
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
  const { isLedger, ledgerWallet } = state.ledger
  const { isLoggedIn } = state.wallet.selectedWallet
  const { account } = state.wallet.selectedWallet
  const currentWallet = isLedger ? ledgerWallet : state.wallet.wallets[account] || {}
  const balance = new BigNumber(currentWallet.balance)
  const staked = state.iiss.staked[account] || {}
  const { value, totalUnstake, unstakes, loading } = staked
  const icxBalance = balance
    .plus(value)
    .plus(totalUnstake)
  const stakedValue = value && value.plus(totalUnstake)
  const stakedPct = convertToPercent(value, icxBalance, 1)
  const stakedWidthPct = convertToPercent(stakedValue, icxBalance)
  const unstakingPct = convertToPercent(totalUnstake, icxBalance, 1)
  const unstakingWidthPct = convertToPercent(totalUnstake, icxBalance)
  const unstakedPct = (100 - stakedPct - unstakingPct).toFixed(1)
  const unstakedWidthPct = (100 - stakedWidthPct).toString()
  const isUnstakingFull = unstakingWidthPct === '100'
  const isUnstakeExist = totalUnstake && !totalUnstake.eq(0)
  const isUnstakingEqualToStake = stakedWidthPct === unstakingWidthPct
  const isNoBalance = balance && balance.eq(0)
  const isBalanceLT1 = balance && validateStake(icxBalance)
  const showHyphen = (val) => isLoggedIn ? val : '-'
  const getGraphClassName = () => {
    if (!isLoggedIn || isNoBalance) {
      return 'no'
    } else if (isUnstakingFull) {
      return 'unstake'
    } else if (unstakedWidthPct === '100') {
      return 'notvoted'
    } else if (stakedWidthPct === '100' && unstakingWidthPct > 0) {
      return 'unstake'
    } else if (stakedWidthPct === '100') {
      return 'notavail'
    } else {
      return ''
    }
  }

  return {
    wrapClassName: 'center-group stake-group',
    graphClassName: getGraphClassName(),
    compType: 'stake',
    title: 'Stake',
    buttonLabel: 'adjust',
    axis1: {
      label: 'myStatusStake_axis1',
      value: isNoBalance ? '-' : showHyphen(stakedPct),
      width: stakedWidthPct - unstakingWidthPct,
    },
    axis2: {
      label: 'myStatusStake_axis2',
      value: isNoBalance ? '-' : showHyphen(unstakedPct),
      width: unstakedWidthPct,
    },
    li1: {
      label: 'myStatusStake_li1',
      value: showHyphen(convertStakeValueToText(icxBalance, 'icx', true)),
    },
    li2: {
      label: 'myStatusStake_li2',
      value: showHyphen(convertStakeValueToText(balance, 'icx', true)),
    },
    li3: {
      label: 'myStatusStake_li3',
      value: showHyphen(convertStakeValueToText(value, 'icx', true)),
    },
    li4: {
      label: 'myStatusStake_li4',
      value: showHyphen(convertStakeValueToText(totalUnstake, 'icx', true)),
    },
    isUnstakeExist,
    isUnstakingFull,
    isUnstakingEqualToStake,
    unstakes: {
      label: 'myStatusStake_unstake1',
      value: !!unstakes ? unstakes.map(unstake => ({
        unstake: showHyphen(convertStakeValueToText(unstake.unstake)),
        unstakeBlockHeight: showHyphen(convertNumberToText(unstake.unstakeBlockHeight, 'icx', true)),
        remainingBlocks: new BigNumber(unstake.unstakeBlockHeight - lastBlock.height),
        blockTimeStamp: lastBlock.time_stamp
      })) : [],
      width: unstakingWidthPct,
      percent: showHyphen(unstakingPct),
    },
    isLoggedIn,
    loading,
    error: isBalanceLT1,
  }
}

function mapDispatchToProps(dispatch) {
  return {

  };
}

const MyStatusStakeContainer = connect(mapStateToProps, mapDispatchToProps)(MyStatusStakeVote);

export default MyStatusStakeContainer;
