import { connect } from 'react-redux';
import { store } from 'redux/store/store';
import { ZERO_ADDRESS } from 'constants/index'
import { ClaimIScore } from 'app/components/';
import { resetSelectedWallet } from 'redux/actions/walletActions'
import { getEstimatedTxFee } from 'redux/actions/txFeeActions'
import { queryIScore, claimIScore, fetchMyStatusData, } from 'redux/actions/iissActions'
import { closePopup } from 'redux/actions/popupActions';
import { convertIScoreToText } from 'utils'

function mapStateToProps(state) {
  const { isLedger, ledgerWallet } = state.ledger
  const { account } = state.wallet.selectedWallet
  const iScore = state.iiss.iScore[account] || {}
  const currentWallet = isLedger ? ledgerWallet : state.wallet.wallets[account] || {}
  const { value, estimatedICX, loading } = iScore
  const {
    txFeeLoading,
    txFeeLimit,
    txFeePrice,
  } = state.txFee
  const { loading: txLoading, result: txResult } = state.iiss.tx
  const txFee = txFeeLimit.times(txFeePrice)
  const isNotEnoughBalance = currentWallet.balance.minus(txFee).lt(0)

  return {
    iScore: convertIScoreToText(value),
    estimatedICX: convertIScoreToText(estimatedICX),
    isNotEnoughBalance,
    walletName: isLedger ? currentWallet.path : currentWallet.name,
    loading: loading || txFeeLoading,
    txLoading,
    txResult,
    isLedger,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getData: () => {
      const { account } = store.getState().wallet.selectedWallet
      dispatch(queryIScore(account))
      dispatch(getEstimatedTxFee({
        methodName: "claimIScore",
        contractAddress: ZERO_ADDRESS,
      }))
    },
    fetchMyStatusData: () => dispatch(fetchMyStatusData()),
    claimIScore: () => dispatch(claimIScore()),
    closePopup: () => dispatch(closePopup()),
    resetReducer: () => {
      dispatch(resetSelectedWallet())
    },
  };
}

const claimIScoreContainer = connect(mapStateToProps, mapDispatchToProps)(ClaimIScore);

export default claimIScoreContainer;
