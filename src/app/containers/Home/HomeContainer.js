import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { Home } from 'app/components/';
import { openPopup } from 'redux/actions/popupActions';

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

const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(Home);

export default withRouter(HomeContainer);
