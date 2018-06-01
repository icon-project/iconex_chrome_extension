import { connect } from 'react-redux';
import { SendTransaction } from 'app/components/';
import { togglePopup, setPopupType, setPopupNum, initPopupState } from 'redux/actions/popupActions';
import { sendCall, submitCall, resetEXTRPageReducer, setEXTRLogInState, resetEXTRInputReducer } from 'redux/actions/exchangeTransactionActions';
import { fetchAll } from 'redux/actions/walletActions'

function mapStateToProps(state) {
  return {
    wallets: state.wallet.wallets,
    pageType: state.exchangeTransaction.pageType,
    accountAddress: state.exchangeTransaction.accountAddress,
    coinTypeIndex: state.exchangeTransaction.coinTypeIndex,
    recipientAddress: state.exchangeTransaction.recipientAddress,
    coinQuantity: state.exchangeTransaction.coinQuantity,
    privKey: state.exchangeTransaction.privKey,
    calcData: state.exchangeTransaction.calcData,
    data: state.exchangeTransaction.data,
    gasPrice: state.exchangeTransaction.gasPrice,
    gasLimit: state.exchangeTransaction.gasLimit,
    popupNum: state.popup.popupNum,
    tx: state.exchangeTransaction.tx,
    txLoading: state.exchangeTransaction.txLoading,
    error: state.exchangeTransaction.error,
    language: state.global.language
  };
}

function mapDispatchToProps(dispatch) {
  return {
    togglePopup: () => dispatch(togglePopup()),
    initPopupState: () => dispatch(initPopupState()),
    setPopupType: (s) => dispatch(setPopupType(s)),
    setPopupNum: (n) => dispatch(setPopupNum(n)),
    sendCall: (privKey, data) => dispatch(sendCall(privKey, data)),
    setEXTRLogInState: (payload) => dispatch(setEXTRLogInState(payload)),
    submitCall: (payload) => dispatch(submitCall(payload)),
    resetReducer: () => dispatch(resetEXTRPageReducer()),
    resetInput: () => dispatch(resetEXTRInputReducer()),
    fetchAll: (wallets) => dispatch(fetchAll(wallets)),
  };
}

const SendTranasctionContainer = connect(mapStateToProps, mapDispatchToProps)(SendTransaction);

export default SendTranasctionContainer;
