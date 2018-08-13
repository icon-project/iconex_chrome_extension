import { connect } from 'react-redux';
import { SendTransaction } from 'app/components/';
import {  openPopup, setPopupNum, closePopup } from 'redux/actions/popupActions';
import { sendCall, submitCall, resetEXTRPageReducer, setEXTRLogInState, resetEXTRInputReducer, setCalcData } from 'redux/actions/exchangeTransactionActions';
import { executeFunc, resetContractInputOutput } from 'redux/actions/contractActions';
import { confirmLedger, resetLedgerReducer } from 'redux/actions/ledgerActions'
import { fetchAll, resetSelectedWallet } from 'redux/actions/walletActions'
import {
  resetSignupReducer
} from 'redux/actions/signupActions';
import { logIn } from 'redux/actions/authActions';

function mapStateToProps(state) {
  return {
    wallets: state.wallet.wallets,
    selectedAccount: state.wallet.selectedWallet.account,
    selectedTokenId: state.wallet.selectedWallet.tokenId,
    isToken: state.wallet.selectedWallet.isToken,
    recipientAddress: state.exchangeTransaction.recipientAddress,
    coinQuantity: state.exchangeTransaction.coinQuantity,
    privKey: state.exchangeTransaction.privKey,
    calcData: state.exchangeTransaction.calcData,
    data: state.exchangeTransaction.data,
    txFeePrice: state.exchangeTransaction.txFeePrice,
    txFeeLimit: state.exchangeTransaction.txFeeLimit,
    popupNum: state.popup.popupNum,
    tx: state.exchangeTransaction.tx,
    txLoading: state.exchangeTransaction.txLoading,
    error: state.exchangeTransaction.error,
    language: state.global.language,
    icxSwapAddress: state.signup.icxSwapAddress,
    swapWalletName: state.signup.walletName,

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
    setEXTRLogInState: (payload) => dispatch(setEXTRLogInState(payload)),
    submitCall: (payload) => dispatch(submitCall(payload)),
    setCalcData: () => dispatch(setCalcData()),
    resetEXTRPageReducer: () => dispatch(resetEXTRPageReducer()),
    resetInput: () => dispatch(resetEXTRInputReducer()),
    fetchAll: (wallets) => dispatch(fetchAll(wallets)),
    executeFunc: () => dispatch(executeFunc()),
    resetSelectedWallet: () => dispatch(resetSelectedWallet()),
    resetSignupReducer: () => dispatch(resetSignupReducer()),
    logIn: () => dispatch(logIn()),

    resetContractInputOutput: () => dispatch(resetContractInputOutput()),
    confirmLedger: (payload) => dispatch(confirmLedger(payload)),
    resetLedgerReducer: () => dispatch(resetLedgerReducer())
  };
}

const SendTranasctionContainer = connect(mapStateToProps, mapDispatchToProps)(SendTransaction);

export default SendTranasctionContainer;
