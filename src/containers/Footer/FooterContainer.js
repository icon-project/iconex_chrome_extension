import { connect } from 'react-redux';
import { Footer } from 'components/';
import { togglePopup, setPopupType } from 'redux/actions/popupActions';
import { withRouter } from 'react-router-dom';

function mapStateToProps(state) {
  return {
    language: state.global.language
  };
}

function mapDispatchToProps(dispatch) {
  return {
    togglePopup: () => dispatch(togglePopup()),
    setPopupType: (s) => dispatch(setPopupType(s)),
  };
}

const FooterContainer = connect(mapStateToProps, mapDispatchToProps)(Footer);

export default withRouter(FooterContainer);
