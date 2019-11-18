import { connect } from 'react-redux';
import { MyStatusStakeVote } from 'app/components/';
import BigNumber from 'bignumber.js';
import { convertStakeValueToText, convertToPercent, convertNumberToText } from 'utils';
import { validateStake } from 'redux/reducers/iissReducer';

function mapStateToProps(state) {
  const { isLedger, ledgerWallet } = state.ledger
  const { isLoggedIn } = state.wallet.selectedWallet
  const { account } = state.wallet.selectedWallet
  const currentWallet = isLedger ? ledgerWallet : state.wallet.wallets[account] || {}
  const balance = new BigNumber(currentWallet.balance)
  const staked = state.iiss.staked[account] || {}
  const { value, unstake, unstakeBlockHeight, remainingBlocks, loading } = staked
  const icxBalance = balance
    .plus(value)
    .plus(unstake)
  const stakedValue = value && value.plus(unstake)
  const stakedPct = convertToPercent(stakedValue, icxBalance, 1)
  const stakedWidthPct = convertToPercent(stakedValue, icxBalance)
  const unstakedPct = (100 - stakedPct).toFixed(1)
  const unstakedWidthPct = (100 - stakedWidthPct).toString()
  const unstakingWidthPct = convertToPercent(unstake, icxBalance)
  const isUnstakingFull = unstakingWidthPct === '100'
  const isUnstakeExist = !!unstake
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
    wrapClassName: 'left-group',
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
      value: showHyphen(convertStakeValueToText(stakedValue, 'icx', true)),
    },
    li3: {
      label: 'myStatusStake_li3',
      value: showHyphen(convertStakeValueToText(balance, 'icx', true)),
    },
    isUnstakeExist,
    isUnstakingFull,
    isUnstakingEqualToStake,
    unstake: {
      label: 'myStatusStake_unstake1',
      value: showHyphen(convertStakeValueToText(unstake)),
      unstakeBlockHeight: showHyphen(convertNumberToText(unstakeBlockHeight, 'icx', true)),
      remainingBlocks,
      width: unstakingWidthPct,
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
