import { connect } from 'react-redux';
import { Header } from 'components/';
import { setLanguage } from 'redux/actions/globalActions';
import { withRouter } from 'react-router-dom';

function mapStateToProps(state) {
  return {
    passcodeHash: state.global.passcodeHash,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setLanguage: (lan) => dispatch(setLanguage(lan))
  };
}

const HeaderContainer = connect(mapStateToProps, mapDispatchToProps)(Header);

export default withRouter(HeaderContainer);
