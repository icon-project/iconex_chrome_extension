import { connect } from 'react-redux';
import BigNumber from 'bignumber.js'
import { Bond } from 'app/components/';
import {
  getBond,
  setBond,
  fetchMyStatusData,
} from 'redux/actions/iissActions'
import {
  getPRepData,
  resetBondMode,
} from 'redux/actions/pRepActions'
import { updateLedgerWalletBalance } from 'redux/actions/ledgerActions'
import { getEstimatedTxFee } from 'redux/actions/txFeeActions'
import { fetchCoinBalance, resetSelectedWallet } from 'redux/actions/walletActions'
import { store } from 'redux/store/store';
import { convertStakeValueToText, convertToPercent, convertNumberToText, toLoop } from 'utils'
import { ZERO_ADDRESS } from 'constants/index'

function mapStateToProps(state) {
  const { pRep, iiss, ledger } = state
  const { isLedger, ledgerWallet } = ledger
  let { account } = state.wallet.selectedWallet
  const currentWallet = isLedger ? ledgerWallet : state.wallet.wallets[account] || {}
  const { myBonded, myAvailable, pRepsLoading, myBonds, editedMap } = pRep
  const { txFeeLoading, txFeeLimit, txFeePrice } = state.txFee
  const bonded = iiss.bonded[account] || {}
  const { loading: bondedLoading } = bonded
  const txFee = txFeePrice.times(txFeeLimit)
  const usdRate = new BigNumber(state.rate.rate['icx'])
  const isNoBalance = currentWallet.balance.minus(txFee).lt(0)
  const isNoChange = Object.values(editedMap).length === 0
  const { loading: txLoading, result: txResult } = state.iiss.tx
  const totalBonded = myBonded.plus(myAvailable)

  return {
    myBonds,
    myVotesCnt: myBonds.length,
    myBonded: convertStakeValueToText(myBonded),
    myBondedPct: convertToPercent(myBonded, totalBonded, 1),
    txFeeLoading,
    txFeeLimit: convertNumberToText(txFeeLimit, 'icx', true),
    txFeePrice: convertNumberToText(txFeePrice, 'icx', true),
    txFee: convertNumberToText(txFee, 'icx', true),
    txFeeRate: convertNumberToText(txFee.times(usdRate), 'usd', false),
    selectedAccount: account,
    loading: pRepsLoading || bondedLoading,
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
      dispatch(getBond(account))
    },
    getEstimatedTxFee: () => {
      let { myBonds } = store.getState().pRep
      dispatch(
        getEstimatedTxFee({
          methodName: "setBond",
          contractAddress: ZERO_ADDRESS,
          inputObj: {
            bonds: myBonds.map(myBond => ({
              ...myBond,
              value: window.web3.toHex(toLoop(myBond.value))
            }))
          }
        })
      )
    },
    fetchMyStatusData: () => dispatch(fetchMyStatusData()),
    setBond: () => dispatch(setBond()),
    resetBondMode: () => dispatch(resetBondMode()),
    resetReducer: () => {
      dispatch(resetSelectedWallet())
    }
  };
}

const BondContainer = connect(mapStateToProps, mapDispatchToProps)(Bond);

export default BondContainer;
