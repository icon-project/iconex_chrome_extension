import { connect } from 'react-redux';
import { Footer } from 'app/components/';
import {  openPopup } from 'redux/actions/popupActions';
import { withRouter } from 'react-router-dom';

function mapStateToProps(state) {
  return {
    language: state.global.language,
    isLoggedIn: state.auth.isLoggedIn,
    isLocked: state.auth.isLocked,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    openPopup: (s) => dispatch(openPopup(s)),
  };
}

const FooterContainer = connect(mapStateToProps, mapDispatchToProps)(Footer);

export default withRouter(FooterContainer);
