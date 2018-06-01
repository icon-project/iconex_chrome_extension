import { connect } from 'react-redux';
import { AddToken } from 'app/components/';
import { togglePopup, setPopupNum, initPopupState } from 'redux/actions/popupActions';
import { isExistToken, addToken, resetAddTokenState, getTokenInfo } from 'redux/actions/walletActions';

function mapStateToProps(state) {
  return {
    popupNum: state.popup.popupNum,
    wallets: state.wallet.wallets,
    selectedAccount: state.mainPage.selectedAccount,
    isExistToken: state.wallet._07_isExistToken,
    isExistTokenLoading: state.wallet._07_isExistTokenLoading,
    tokenInfo: state.wallet._07_tokenInfo,
    tokenInfoLoading: state.wallet._07_tokenInfoLoading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    togglePopup: () => dispatch(togglePopup()),
    setPopupNum: (i) => dispatch(setPopupNum(i)),
    initPopupState: () => dispatch(initPopupState()),
    checkIsExistToken: (s1, s2) => dispatch(isExistToken(s1, s2)),
    addToken: (s1, arr, s2) => dispatch(addToken(s1, arr, s2)),
    resetAddTokenState: () => dispatch(resetAddTokenState()),
    getTokenInfo: (address,type) => dispatch(getTokenInfo(address,type))
  };
}

const AddTokenContainer = connect(mapStateToProps, mapDispatchToProps)(AddToken);

export default AddTokenContainer;
