import { connect } from 'react-redux';
import { SwapToken } from 'app/components/';
import { setEXTRLogInState } from 'redux/actions/exchangeTransactionActions';
import {
  setPopupNum ,
  closePopup,
  openPopup
} from 'redux/actions/popupActions';
import {
  setWalletObject,
  setCoinType,
  resetSignupReducer,
  setIcxSwapAddress,
  setPrivKeyForSwap,
  setWalletNameAndPasswordForSwap,
  setAddress,
  checkSwapWalletExist
} from 'redux/actions/signupActions';
import {
  generateWallet,
  setIconexObject,
  setWalletName,
  resetInfo,
  createWallet,
  deleteWallet,
} from 'redux/actions/signupActions';
import { getWallet, resetSelectedWallet, fetchAll } from 'redux/actions/walletActions';
import { logIn } from 'redux/actions/authActions';
import { setCalcData, setTxFeeLimit, setTxFeePrice, setRecipientAddress, getTxFeeInfo, submitCall } from 'redux/actions/exchangeTransactionActions';

function mapStateToProps(state) {
  return {
    wallets: state.wallet.wallets,
    privKey: state.signup.privateKey,
    selectedAccount: state.wallet.selectedWallet.account,
    selectedTokenId: state.wallet.selectedWallet.tokenId,
    isToken: state.wallet.selectedWallet.isToken,
    recipientAddress: state.exchangeTransaction.recipientAddress,
    coinQuantity: state.exchangeTransaction.coinQuantity,
    txFeeLimit: state.exchangeTransaction.txFeeLimit,
    txFeePrice: state.exchangeTransaction.txFeePrice,
    isLoggedIn: state.exchangeTransaction.isLoggedIn,
    txFeeLoading: state.exchangeTransaction.txFeeLoading,
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
    language: state.global.language,
    isSwapWalletExist: state.signup.isSwapWalletExist
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchAll: (payload) => dispatch(fetchAll(payload)),
    closePopup: () => dispatch(closePopup()),
    setEXTRLogInState: (payload) => dispatch(setEXTRLogInState(payload)),
    setWalletObject: (wallet) => dispatch(setWalletObject(wallet)),
    setCoinType: (s) => dispatch(setCoinType(s)),
    resetSignupReducer: () => dispatch(resetSignupReducer()),
    setIconexObject: (o) => dispatch(setIconexObject(o)),
    createWallet: (o) => dispatch(createWallet(o)),
    setWalletName: (s) => dispatch(setWalletName(s)),
    resetInfo: () => dispatch(resetInfo()),
    generateWallet: (s1, s2, s3) => dispatch(generateWallet(s1, s2, s3)),
    openPopup: type => dispatch(openPopup(type)),
    setPopupNum: (n) => dispatch(setPopupNum(n)),
    resetSelectedWallet: () => dispatch(resetSelectedWallet()),
    setIcxSwapAddress: (address) => dispatch(setIcxSwapAddress(address)),
    setPrivKeyForSwap: (privKey) => dispatch(setPrivKeyForSwap(privKey)),
    setWalletNameAndPasswordForSwap: (walletName, pw) => dispatch(setWalletNameAndPasswordForSwap(walletName, pw)),
    setAddress: (address) => dispatch(setAddress(address)),
    setCalcData: () => dispatch(setCalcData()),
    setTxFeeLimit: (value) => dispatch(setTxFeeLimit(value)),
    setTxFeePrice: (value) => dispatch(setTxFeePrice(value)),
    setRecipientAddress: address => dispatch(setRecipientAddress(address)),
    getTxFeeInfo: data => dispatch(getTxFeeInfo(data)),
    submitCall: (payload) => dispatch(submitCall(payload)),
    deleteWallet: (s) => dispatch(deleteWallet(s)),
    logIn: () => dispatch(logIn()),
    getWallet: () => dispatch(getWallet()),
    checkSwapWalletExist: (payload) => dispatch(checkSwapWalletExist(payload))
  };
}

const SwapTokenContainer = connect(mapStateToProps, mapDispatchToProps)(SwapToken);

export default SwapTokenContainer;
