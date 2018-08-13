import { connect } from 'react-redux';
import { ImmunityPopup } from 'app/components/';
import { closePopup } from 'redux/actions/popupActions';

function mapStateToProps(state) {
  return {
    language: state.global.language
  };
}

function mapDispatchToProps(dispatch) {
  return {
    closePopup: () => dispatch(closePopup()),
  };
}

const ImmunityPopupContainer = connect(mapStateToProps, mapDispatchToProps)(ImmunityPopup);

export default ImmunityPopupContainer;
