import { connect } from 'react-redux';
import { UpdateToken } from 'app/components/';
import { updateToken } from 'redux/actions/walletActions';
import { setSelectedToken } from 'redux/actions/mainPageUIActions';
import { withRouter } from 'react-router-dom';
import { togglePopup, initPopupState } from 'redux/actions/popupActions';

function mapStateToProps(state) {
  return {
    selectedAccount: state.mainPage.selectedAccount,
    selectedTokenId: state.mainPage.selectedTokenId,
    wallets: state.wallet.wallets,
    language: state.global.language
  };
}

function mapDispatchToProps(dispatch) {
  return {
    togglePopup: () => dispatch(togglePopup()),
    initPopupState: () => dispatch(initPopupState()),
    updateToken: (account, id, data) => dispatch(updateToken(account, id, data)),
    setSelectedToken: (s, i) => dispatch(setSelectedToken(s, i))
  };
}

const UpdateTokenContainer = connect(mapStateToProps, mapDispatchToProps)(UpdateToken);

export default withRouter(UpdateTokenContainer);
