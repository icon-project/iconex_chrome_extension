import { connect } from 'react-redux';
import { VotingPage } from 'app/components/';
import { openVoteMode } from 'redux/actions/pRepActions'
import { openPopup } from 'redux/actions/popupActions'
import {
  fetchMyStatusData,
  resetPRepIissReducer,
} from 'redux/actions/iissActions'
import { fetchAll, resetSelectedWallet } from 'redux/actions/walletActions'

function mapStateToProps(state) {
  return {
    selectedAccount: state.wallet.selectedWallet.account,
    isVoteMode: state.pRep.isVoteMode,
    isLoggedIn: state.wallet.selectedWallet.isLoggedIn,
    isLedger: state.ledger.isLedger,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    openPopup: (payload) => dispatch(openPopup(payload)),
    openVoteMode: () => dispatch(openVoteMode()),
    fetchAll: (payload) => dispatch(fetchAll(payload)),
    fetchMyStatusData: () => dispatch(fetchMyStatusData()),
    resetSelectedWallet: () => dispatch(resetSelectedWallet()),
    resetReducer: () => {
      dispatch(resetSelectedWallet())
      dispatch(resetPRepIissReducer())
    },
  };
}

const VotingPageContainer = connect(mapStateToProps, mapDispatchToProps)(VotingPage);

export default VotingPageContainer;
