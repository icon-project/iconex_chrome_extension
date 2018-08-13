import { connect } from 'react-redux';
import { AddToken } from 'app/components/';
import {  setPopupNum, closePopup } from 'redux/actions/popupActions';
import { addToken, getTokenInfo, resetSelectedWallet } from 'redux/actions/walletActions';

function mapStateToProps(state) {
  return {
    popupNum: state.popup.popupNum,
    wallets: state.wallet.wallets,
    selectedAccount: state.wallet.selectedWallet.account,
    tokenInfo: state.wallet._07_tokenInfo,
    tokenInfoLoading: state.wallet._07_tokenInfoLoading,
    error: state.wallet._07_tokenInfoError
  };
}

function mapDispatchToProps(dispatch) {
  return {

    setPopupNum: (i) => dispatch(setPopupNum(i)),
    closePopup: () => dispatch(closePopup()),
    resetSelectedWallet: () => dispatch(resetSelectedWallet()),
    addToken: (s1, arr, s2) => dispatch(addToken(s1, arr, s2)),
    getTokenInfo: (address,type) => dispatch(getTokenInfo(address,type))
  };
}

const AddTokenContainer = connect(mapStateToProps, mapDispatchToProps)(AddToken);

export default AddTokenContainer;
