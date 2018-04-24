import { connect } from 'react-redux';
import { ImmunityPopup } from 'components/';
import { initPopupState } from 'redux/actions/popupActions';

function mapStateToProps(state) {
  return {
    language: state.global.language
  };
}

function mapDispatchToProps(dispatch) {
  return {
    initPopupState: () => dispatch(initPopupState()),
  };
}

const ImmunityPopupContainer = connect(mapStateToProps, mapDispatchToProps)(ImmunityPopup);

export default ImmunityPopupContainer;
