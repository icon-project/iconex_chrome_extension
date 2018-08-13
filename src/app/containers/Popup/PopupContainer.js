import { connect } from 'react-redux';
import { Popup } from 'app/components/';
import {  closePopup } from 'redux/actions/popupActions';

function mapStateToProps(state) {
  return {
    popupState: state.popup.isPopupOn,
    popupType: state.popup.popupType,
    popupNum: state.popup.popupNum,
    funcResult: state.contract.funcResult,
    error: state.contract.error
  };
}

function mapDispatchToProps(dispatch) {
  return {

    closePopup: () => dispatch(closePopup())
  };
}

const PopupContainer = connect(mapStateToProps, mapDispatchToProps)(Popup);

export default PopupContainer;
