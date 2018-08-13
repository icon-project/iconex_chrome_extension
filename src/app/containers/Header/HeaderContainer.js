import { connect } from 'react-redux';
import { Header } from 'app/components/';
import { setLanguage } from 'redux/actions/globalActions';
import { withRouter } from 'react-router-dom';

function mapStateToProps(state) {
  return {
    wallets: state.wallet.wallets,
    isLedger: state.ledger.isLedger,
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
