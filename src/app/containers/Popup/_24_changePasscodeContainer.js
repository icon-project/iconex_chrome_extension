import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { ChangePasscode } from 'app/components/';
import { closePopup } from 'redux/actions/popupActions';
import { setLock } from 'redux/actions/globalActions';
import { getWallet } from 'redux/actions/walletActions';

function mapStateToProps(state) {
  return {
    wallets: state.wallet.wallets,
    language: state.global.language,
    passcodeHash: state.global.passcodeHash
  };
}

function mapDispatchToProps(dispatch) {
  return {
    closePopup: () => dispatch(closePopup()),
    setLock: (passcodeHash) => dispatch(setLock(passcodeHash)),
    getWallet: (payload) => dispatch(getWallet(payload))
  };
}

const ChangePasscodeContainer = connect(mapStateToProps, mapDispatchToProps)(ChangePasscode);

export default withRouter(ChangePasscodeContainer);
