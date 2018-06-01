import { connect } from 'react-redux';
import { SwapToken } from 'app/components/';
import { setEXTRLogInState } from 'redux/actions/exchangeTransactionActions';
import {
  togglePopup,
  setPopupNum ,
  initPopupState,
  setPopupType
} from 'redux/actions/popupActions';
import {
  setWalletObject,
  setCoinType,
  resetSignupReducer,
  setIcxSwapAddress,
  setPrivKeyForSwap,
  setWalletNameAndPasswordForSwap,
  setAddress
} from 'redux/actions/signupActions';
import {
  generateWallet,
  setIconexObject,
  setWalletName,
  resetInfo,
  createWallet,
  deleteWallet,
} from 'redux/actions/signupActions';
import { getWallet } from 'redux/actions/walletActions';
import { logIn } from 'redux/actions/authActions';
import { setCalcData, setGasLimit, setGasPrice, setRecipientAddress, getGasInfo, setAccountAddress, submitCall } from 'redux/actions/exchangeTransactionActions';

function mapStateToProps(state) {
  return {
    wallets: state.wallet.wallets,
    privKey: state.signup.privateKey,
    accountAddress: state.exchangeTransaction.accountAddress,
    recipientAddress: state.exchangeTransaction.recipientAddress,
    coinQuantity: state.exchangeTransaction.coinQuantity,
    gasLimit: state.exchangeTransaction.gasLimit,
    gasPrice: state.exchangeTransaction.gasPrice,
    coinTypeIndex: state.exchangeTransaction.coinTypeIndex,
    isLoggedIn: state.exchangeTransaction.isLoggedIn,
    gasLoading: state.exchangeTransaction.gasLoading,
    submit: state.exchangeTransaction.submit,
    walletObj: state.signup.walletObj,
    coinType: state.signup.coinType,
    privateKey: state.signup.privateKey,
    walletName: state.signup.walletName,
    iconexObj: state.signup.iconexObj,
    address: state.signup.address,
    popupNum: state.popup.popupNum,
    icxSwapAddress: state.signup.icxSwapAddress,
    popupType: state.popup.popupType,
    pw: state.signup.pw,
    keyError: state.signup.error,
    loading: state.signup.loading,
    language: state.global.language
  };
}

function mapDispatchToProps(dispatch) {
  return {
    initPopupState: () => dispatch(initPopupState()),
    setEXTRLogInState: (payload) => dispatch(setEXTRLogInState(payload)),
    setWalletObject: (wallet) => dispatch(setWalletObject(wallet)),
    setCoinType: (s) => dispatch(setCoinType(s)),
    resetSignupReducer: () => dispatch(resetSignupReducer()),
    setIconexObject: (o) => dispatch(setIconexObject(o)),
    createWallet: (o) => dispatch(createWallet(o)),
    setWalletName: (s) => dispatch(setWalletName(s)),
    resetInfo: () => dispatch(resetInfo()),
    generateWallet: (s1, s2, s3) => dispatch(generateWallet(s1, s2, s3)),
    setPopupType: type => dispatch(setPopupType(type)),
    setPopupNum: (n) => dispatch(setPopupNum(n)),
    togglePopup: () => dispatch(togglePopup()),
    setIcxSwapAddress: (address) => dispatch(setIcxSwapAddress(address)),
    setPrivKeyForSwap: (privKey) => dispatch(setPrivKeyForSwap(privKey)),
    setWalletNameAndPasswordForSwap: (walletName, pw) => dispatch(setWalletNameAndPasswordForSwap(walletName, pw)),
    setAddress: (address) => dispatch(setAddress(address)),
    setAccountAddress: address => dispatch(setAccountAddress(address)),
    setCalcData: () => dispatch(setCalcData()),
    setGasLimit: (value) => dispatch(setGasLimit(value)),
    setGasPrice: (value) => dispatch(setGasPrice(value)),
    setRecipientAddress: address => dispatch(setRecipientAddress(address)),
    getGasInfo: data => dispatch(getGasInfo(data)),
    submitCall: (payload) => dispatch(submitCall(payload)),
    deleteWallet: (s) => dispatch(deleteWallet(s)),
    logIn: () => dispatch(logIn()),
    getWallet: () => dispatch(getWallet())
  };
}

const SwapTokenContainer = connect(mapStateToProps, mapDispatchToProps)(SwapToken);

export default SwapTokenContainer;
