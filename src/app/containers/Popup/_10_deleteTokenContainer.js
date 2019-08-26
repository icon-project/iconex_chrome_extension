import { connect } from 'react-redux';
import { DeleteToken } from 'app/components/';
import { deleteToken, resetSelectedWallet } from 'redux/actions/walletActions';
import { withRouter } from 'react-router-dom';
import { closePopup } from 'redux/actions/popupActions';

function mapStateToProps(state) {
  return {
    selectedAccount: state.wallet.selectedWallet.account,
    selectedTokenId: state.wallet.selectedWallet.tokenId,
    language: state.global.language
  };
}

function mapDispatchToProps(dispatch) {
  return {

    closePopup: () => dispatch(closePopup()),
    resetSelectedWallet: () => dispatch(resetSelectedWallet()),
    deleteToken: (s, i) => dispatch(deleteToken(s, i))
  };
}

const DeleteTokenContainer = connect(mapStateToProps, mapDispatchToProps)(DeleteToken);

export default withRouter(DeleteTokenContainer);
