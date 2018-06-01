import { connect } from 'react-redux';
import { DeleteToken } from 'app/components/';
import { deleteToken } from 'redux/actions/walletActions';
import { withRouter } from 'react-router-dom';
import { togglePopup, initPopupState } from 'redux/actions/popupActions';

function mapStateToProps(state) {
  return {
    selectedAccount: state.mainPage.selectedAccount,
    selectedTokenId: state.mainPage.selectedTokenId,
    language: state.global.language
  };
}

function mapDispatchToProps(dispatch) {
  return {
    togglePopup: () => dispatch(togglePopup()),
    initPopupState: () => dispatch(initPopupState()),
    deleteToken: (s, i) => dispatch(deleteToken(s, i))
  };
}

const DeleteTokenContainer = connect(mapStateToProps, mapDispatchToProps)(DeleteToken);

export default withRouter(DeleteTokenContainer);
