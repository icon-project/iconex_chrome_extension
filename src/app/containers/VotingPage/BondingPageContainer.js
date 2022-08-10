import { connect } from 'react-redux';
import { BondingPage } from 'app/components/';
import { openBondMode } from 'redux/actions/pRepActions'
import { openPopup } from 'redux/actions/popupActions'
import {
  fetchMyStatusData,
  resetPRepIissReducer,
} from 'redux/actions/iissActions'
import { fetchAll, resetSelectedWallet } from 'redux/actions/walletActions'

function mapStateToProps(state) {
  return {
    selectedAccount: state.wallet.selectedWallet.account,
    isBondMode: state.pRep.isBondMode,
    isLoggedIn: state.wallet.selectedWallet.isLoggedIn,
    isLedger: state.ledger.isLedger,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    openPopup: (payload) => dispatch(openPopup(payload)),
    openBondMode: () => dispatch(openBondMode()),
    fetchAll: (payload) => dispatch(fetchAll(payload)),
    fetchMyStatusData: () => dispatch(fetchMyStatusData()),
    resetSelectedWallet: () => dispatch(resetSelectedWallet()),
    resetReducer: () => {
      dispatch(resetSelectedWallet())
      dispatch(resetPRepIissReducer())
    }
  };
}

const BondingPageContainer = connect(mapStateToProps, mapDispatchToProps)(BondingPage);

export default BondingPageContainer;
