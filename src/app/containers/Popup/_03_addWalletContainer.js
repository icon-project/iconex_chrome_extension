import { connect } from 'react-redux';
import { AddWallet } from 'app/components/';
import { togglePopup, setPopupType, setPopupNum, initPopupState } from 'redux/actions/popupActions';

function mapStateToProps(state) {
  return {
    language: state.global.language
  };
}

function mapDispatchToProps(dispatch) {
  return {
    togglePopup: () => dispatch(togglePopup()),
    initPopupState: () => dispatch(initPopupState()),
    setPopupType: (s) => dispatch(setPopupType(s)),
    setPopupNum: (n) => dispatch(setPopupNum(n)),
  };
}

const AddWalletContainer = connect(mapStateToProps, mapDispatchToProps)(AddWallet);

export default AddWalletContainer;
