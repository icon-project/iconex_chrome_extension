import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { MainPage } from 'components/';
import { togglePopup, setPopupType } from 'redux/actions/popupActions';
import { setAccountAddress } from 'redux/actions/exchangeTransactionActions';

function mapStateToProps(state) {
  return {
    language: state.global.language
  };
}

function mapDispatchToProps(dispatch) {
  return {
    togglePopup: () => dispatch(togglePopup()),
    setPopupType: (s) => dispatch(setPopupType(s)),
    setAccountAddress: address => dispatch(setAccountAddress(address)),
  };
}

const MainPageContainer = connect(mapStateToProps, mapDispatchToProps)(MainPage);

export default withRouter(MainPageContainer);
