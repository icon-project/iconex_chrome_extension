import { connect } from 'react-redux';
import { Popup } from 'components/';
import { togglePopup, initPopupState } from 'redux/actions/popupActions';

function mapStateToProps(state) {
  return {
    popupState: state.popup.isPopupOn,
    popupType: state.popup.popupType,
    popupNum: state.popup.popupNum,

  };
}

function mapDispatchToProps(dispatch) {
  return {
    togglePopup: () => dispatch(togglePopup()),
    initPopupState: () => dispatch(initPopupState())
  };
}

const PopupContainer = connect(mapStateToProps, mapDispatchToProps)(Popup);

export default PopupContainer;
