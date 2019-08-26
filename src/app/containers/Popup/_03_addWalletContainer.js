import { connect } from 'react-redux';
import { AddWallet } from 'app/components/';
import { openPopup, setPopupNum, closePopup } from 'redux/actions/popupActions';

function mapStateToProps(state) {
  return {
    language: state.global.language
  };
}

function mapDispatchToProps(dispatch) {
  return {

    closePopup: () => dispatch(closePopup()),
    openPopup: (s) => dispatch(openPopup(s)),
    setPopupNum: (n) => dispatch(setPopupNum(n)),
  };
}

const AddWalletContainer = connect(mapStateToProps, mapDispatchToProps)(AddWallet);

export default AddWalletContainer;
