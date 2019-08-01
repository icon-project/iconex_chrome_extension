import { connect } from 'react-redux';
import BigNumber from 'bignumber.js'
import { Stake } from 'app/components/';
import {
  getStake,
  setStake,
  getDelegation,
  fetchMyStatusData,
} from 'redux/actions/iissActions'
import { updateLedgerWalletBalance } from 'redux/actions/ledgerActions'
import { getEstimatedTxFee } from 'redux/actions/txFeeActions'
import { closePopup } from 'redux/actions/popupActions';
import { store } from 'redux/store/store';
import { MIN_UNSTAKE_VALUE } from 'constants/index'
import { fetchCoinBalance, resetSelectedWallet } from 'redux/actions/walletActions';
import { convertToPercent } from 'utils'

function mapStateToProps(state) {
  const { isLedger, ledgerWallet } = state.ledger
  const { account } = state.wallet.selectedWallet
  const currentWallet = isLedger ? ledgerWallet : state.wallet.wallets[account] || {}
  const staked = state.iiss.staked[account] || {}
  const delegated = state.iiss.delegated[account] || {}
  const { value, unstake } = staked
  const { totalDelegated } = delegated
  const balance = new BigNumber(currentWallet.balance)
  const { balanceLoading } = currentWallet
  const totalIcxBalance = value
    .plus(unstake)
    .plus(balance)
  const minUnstakeValue = balance.lt(MIN_UNSTAKE_VALUE) ? balance : MIN_UNSTAKE_VALUE
  const delegatedPct = convertToPercent(totalDelegated, totalIcxBalance, 1)
  const availableBalance = totalIcxBalance
    .minus(totalDelegated)
    .minus(minUnstakeValue)
  const availableMaxBalance = totalIcxBalance
    .minus(minUnstakeValue)
  const maxStakePct = convertToPercent(availableMaxBalance, totalIcxBalance, 1)
  const step = Number((100 / (maxStakePct - delegatedPct)).toFixed(8))
  console.log(step)
  const { loading: txLoading, result: txResult } = state.iiss.tx
  const { txFeeLoading, txFeeLimit, txFeePrice } = state.txFee
  const txFee = txFeeLimit.times(txFeePrice)

  return {
    staked,
    balance,
    totalDelegated,
    delegatedPct,
    maxStakePct,
    step: step > 100 ? 100 : step,
    totalIcxBalance,
    availableBalance,
    availableMaxBalance,
    walletName: isLedger ? currentWallet.path : currentWallet.name,
    loading: staked.loading || delegated.loading || balanceLoading,
    txFeeLoading,
    txFee,
    txLoading,
    txResult,
    isLedger,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getData: () => {
      const { account } = store.getState().wallet.selectedWallet
      const { isLedger } = store.getState().ledger
      if (isLedger) {
        dispatch(updateLedgerWalletBalance())
      } else {
        dispatch(fetchCoinBalance(account, 'icx'))
      }
      dispatch(getStake(account))
      dispatch(getDelegation(account))
    },
    setStake: value => {
      dispatch(setStake({ value }))
    },
    fetchMyStatusData: () => dispatch(fetchMyStatusData()),
    getEstimatedTxFee: payload => dispatch(getEstimatedTxFee(payload)),
    closePopup: () => dispatch(closePopup()),
    resetReducer: () => {
      dispatch(resetSelectedWallet())
    },
  };
}

const stakeContainer = connect(mapStateToProps, mapDispatchToProps)(Stake);

export default stakeContainer;
