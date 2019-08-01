import { connect } from 'react-redux';
import BigNumber from 'bignumber.js'
import { Vote } from 'app/components/';
import {
  getDelegation,
  setDelegation,
  fetchMyStatusData,
} from 'redux/actions/iissActions'
import {
  getPRepData,
  resetVoteMode,
} from 'redux/actions/pRepActions'
import { updateLedgerWalletBalance } from 'redux/actions/ledgerActions'
import { getEstimatedTxFee } from 'redux/actions/txFeeActions'
import { fetchCoinBalance, resetSelectedWallet } from 'redux/actions/walletActions'
import { store } from 'redux/store/store';
import { convertStakeValueToText, convertToPercent, convertNumberToText, toLoop } from 'utils'
import {
  ZERO_ADDRESS
} from 'constants/index'

function mapStateToProps(state) {
  const { pRep, iiss, ledger } = state
  const { isLedger, ledgerWallet } = ledger
  let { account } = state.wallet.selectedWallet
  const currentWallet = isLedger ? ledgerWallet : state.wallet.wallets[account] || {}
  const { myDelegated, myAvailable, pRepsLoading, myVotes, editedMap } = pRep
  const { txFeeLoading, txFeeLimit, txFeePrice } = state.txFee
  const delegated = iiss.delegated[account] || {}
  const { loading: delegatedLoading } = delegated
  const txFee = txFeePrice.times(txFeeLimit)
  const usdRate = new BigNumber(state.rate.rate['icx'])
  const isNoBalance = currentWallet.balance.minus(txFee).lt(0)
  const isNoChange = Object.values(editedMap).length === 0
  const { loading: txLoading, result: txResult } = state.iiss.tx
  const totalStaked = myDelegated.plus(myAvailable)

  return {
    myVotes,
    myVotesCnt: myVotes.length,
    myDelegated: convertStakeValueToText(myDelegated),
    myDelegatedPct: convertToPercent(myDelegated, totalStaked, 1),
    txFeeLoading,
    txFeeLimit: convertNumberToText(txFeeLimit, 'icx', true),
    txFeePrice: convertNumberToText(txFeePrice, 'icx', true),
    txFee: convertNumberToText(txFee, 'icx', true),
    txFeeRate: convertNumberToText(txFee.times(usdRate), 'usd', false),
    selectedAccount: account,
    loading: pRepsLoading || delegatedLoading,
    walletName: isLedger ? currentWallet.path : currentWallet.name,
    isLedger,
    isNoBalance,
    isNoChange,
    txLoading,
    txResult,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getData: () => {
      let { account } = store.getState().wallet.selectedWallet
      const { isLedger } = store.getState().ledger
      if (isLedger) {
        dispatch(updateLedgerWalletBalance())
      } else {
        dispatch(fetchCoinBalance(account, 'icx'))
      }
      dispatch(getPRepData())
      dispatch(getDelegation(account))
    },
    getEstimatedTxFee: () => {
      let { myVotes } = store.getState().pRep
      dispatch(
        getEstimatedTxFee({
          methodName: "setDelegation",
          contractAddress: ZERO_ADDRESS,
          inputObj: {
            delegations: myVotes.map(myVote => ({
              ...myVote,
              value: window.web3.toHex(toLoop(myVote.value))
            }))
          }
        })
      )
    },
    fetchMyStatusData: () => dispatch(fetchMyStatusData()),
    setDelegation: () => dispatch(setDelegation()),
    resetVoteMode: () => dispatch(resetVoteMode()),
    resetReducer: () => {
      dispatch(resetSelectedWallet())
    }
  };
}

const VoteContainer = connect(mapStateToProps, mapDispatchToProps)(Vote);

export default VoteContainer;
