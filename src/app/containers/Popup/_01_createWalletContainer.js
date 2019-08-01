import { connect } from 'react-redux';
import { CreateWallet } from 'app/components/';
import {
  setPopupNum,
  closePopup
} from 'redux/actions/popupActions';
import { getWallet } from 'redux/actions/walletActions';
import {
  generateWallet,
  setCoinType,
  setIconexObject,
  setWalletName,
  resetInfo,
  createWallet,
  deleteWallet,
  resetSignupReducer
} from 'redux/actions/signupActions';
import { logIn } from 'redux/actions/authActions';

function mapStateToProps(state) {
  return {
    popupNum: state.popup.popupNum,
    popupType: state.popup.popupType,
    walletName: state.signup.walletName,
    coinType: state.signup.coinType,
    pw: state.signup.pw,
    walletObj: state.signup.walletObj,
    iconexObj: state.signup.iconexObj,
    address: state.signup.address,
    privateKey: state.signup.privateKey,
    keyError: state.signup.error,
    loading: state.signup.loading,
    wallets: state.wallet.wallets
  };
}

function mapDispatchToProps(dispatch) {
  return {

    closePopup: () => dispatch(closePopup()),
    setPopupNum: (n) => dispatch(setPopupNum(n)),
    setCoinType: (s) => dispatch(setCoinType(s)),
    generateWallet: (s1, s2, s3) => dispatch(generateWallet(s1, s2, s3)),
    setWalletName: (s) => dispatch(setWalletName(s)),
    resetInfo: () => dispatch(resetInfo()),
    createWallet: (o) => dispatch(createWallet(o)),
    deleteWallet: (s) => dispatch(deleteWallet(s)),
    setIconexObject: (o) => dispatch(setIconexObject(o)),
    resetSignupReducer: () => dispatch(resetSignupReducer()),
    logIn: () => dispatch(logIn()),
    getWallet: () => dispatch(getWallet())
  };
}

const CreateWalletContainer = connect(mapStateToProps, mapDispatchToProps)(CreateWallet);

export default CreateWalletContainer;
