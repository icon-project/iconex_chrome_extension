import { connect } from 'react-redux';
import { ImportWallet } from 'app/components/';
import {  setPopupNum, closePopup } from 'redux/actions/popupActions';
import { createWallet, createWallets, resetSignupReducer, setV3Object, setCoinType, setWalletObject } from 'redux/actions/signupActions';
import { logIn } from 'redux/actions/authActions';

function mapStateToProps(state) {
  return {
    popupNum: state.popup.popupNum,
    walletObj: state.signup.walletObj,
    coinType: state.signup.coinType,
    v3Obj: state.signup.v3Obj,
    loading: state.signup.loading,
    wallets: state.wallet.wallets
  };
}

function mapDispatchToProps(dispatch) {
  return {
    
    closePopup: () => dispatch(closePopup()),
    setPopupNum: (n) => dispatch(setPopupNum(n)),
    setCoinType: (coinType) => dispatch(setCoinType(coinType)),
    createWallet: (o) => dispatch(createWallet(o)),
    createWallets: (walletArray) => dispatch(createWallets(walletArray)),
    setV3Object: (wallet) => dispatch(setV3Object(wallet)),
    setWalletObject: (wallet) => dispatch(setWalletObject(wallet)),
    logIn: () => dispatch(logIn()),
    resetSignupReducer: () => dispatch(resetSignupReducer())
  };
}

const ImportWalletContainer = connect(mapStateToProps, mapDispatchToProps)(ImportWallet);

export default ImportWalletContainer;
