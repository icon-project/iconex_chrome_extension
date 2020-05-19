import { connect } from 'react-redux';
import { SendTransaction } from 'app/components/';
import { openPopup, setPopupNum, closePopup } from 'redux/actions/popupActions';
import { sendCall, submitCall, resetEXTRPageReducer, resetEXTRInputReducer } from 'redux/actions/exchangeTransactionActions';
import { executeFunc, resetContractInputOutput } from 'redux/actions/contractActions';
import { confirmLedger, resetLedgerReducer, updateLedgerWalletBalance } from 'redux/actions/ledgerActions'
import { fetchAll, setLogInState, updateWalletBalance, resetSelectedWallet } from 'redux/actions/walletActions'
import {
  resetSignupReducer
} from 'redux/actions/signupActions';
import { logIn } from 'redux/actions/authActions';
import { setStake } from 'redux/actions/iissActions'
import { openVoteMode } from 'redux/actions/pRepActions'

function mapStateToProps(state) {
  return {
    wallets: state.wallet.wallets,
    selectedAccount: state.wallet.selectedWallet.account,
    privKey: state.wallet.selectedWallet.privKey,
    selectedTokenId: state.wallet.selectedWallet.tokenId,
    isToken: state.wallet.selectedWallet.isToken,
    recipientAddress: state.exchangeTransaction.recipientAddress,
    coinQuantity: state.exchangeTransaction.coinQuantity,
    calcData: state.exchangeTransaction.calcData,
    data: state.exchangeTransaction.data,
    dataType: state.exchangeTransaction.dataType,
    txFeePrice: state.exchangeTransaction.txFeePrice,
    txFeeLimit: state.exchangeTransaction.txFeeLimit,
    popupNum: state.popup.popupNum,
    tx: state.exchangeTransaction.tx,
    txLoading: state.exchangeTransaction.txLoading,
    sendTransactionError: state.exchangeTransaction.error,
    contractError: state.contract.error,
    language: state.global.language,

    funcList: state.contract.funcList,
    selectedFuncIndex: state.contract.selectedFuncIndex,
    funcInput: state.contract.funcInput,
    funcLoading: state.contract.funcLoading,
    funcResult: state.contract.funcResult,

    isLedger: state.ledger.isLedger,
    ledgerWallet: state.ledger.ledgerWallet,
    isLedgerConfirmed: state.ledger.isLedgerConfirmed,
    ledgerSignedRawTx: state.ledger.ledgerSignedRawTx,
  };
}

function mapDispatchToProps(dispatch) {
  return {

    closePopup: () => dispatch(closePopup()),
    openPopup: (s) => dispatch(openPopup(s)),
    setPopupNum: (n) => dispatch(setPopupNum(n)),
    sendCall: (privKey, data, isLedger) => dispatch(sendCall(privKey, data, isLedger)),
    setLogInState: (payload) => dispatch(setLogInState(payload)),
    submitCall: (payload, options) => dispatch(submitCall(payload, options)),
    resetEXTRPageReducer: () => dispatch(resetEXTRPageReducer()),
    resetInput: () => dispatch(resetEXTRInputReducer()),
    fetchAll: (wallets) => dispatch(fetchAll(wallets)),
    executeFunc: () => dispatch(executeFunc()),
    resetSelectedWallet: () => dispatch(resetSelectedWallet()),
    resetSignupReducer: () => dispatch(resetSignupReducer()),
    logIn: () => dispatch(logIn()),
    updateWalletBalance: (payload) => dispatch(updateWalletBalance(payload)),
    updateLedgerWalletBalance: () => dispatch(updateLedgerWalletBalance()),

    resetContractInputOutput: () => dispatch(resetContractInputOutput()),
    confirmLedger: (payload) => dispatch(confirmLedger(payload)),
    resetLedgerReducer: () => dispatch(resetLedgerReducer()),

    setStake: () => dispatch(setStake()),
    openVoteMode: () => dispatch(openVoteMode())
  };
}

const SendTransactionContainer = connect(mapStateToProps, mapDispatchToProps)(SendTransaction);

export default SendTransactionContainer;
