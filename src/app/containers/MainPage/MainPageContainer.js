import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { MainPage } from 'app/components/';
import {  openPopup } from 'redux/actions/popupActions';

function mapStateToProps(state) {
  return {
    language: state.global.language
  };
}

function mapDispatchToProps(dispatch) {
  return {

    openPopup: (s) => dispatch(openPopup(s)),
  };
}

const MainPageContainer = connect(mapStateToProps, mapDispatchToProps)(MainPage);

export default withRouter(MainPageContainer);
