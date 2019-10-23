import { connect } from 'react-redux';
import { WalletSelector } from 'app/components/';
import { setSelectedWallet, setLogInState } from 'redux/actions/walletActions';
import { openPopup } from 'redux/actions/popupActions';

function mapStateToProps(state) {
  return {
    wallets: state.wallet.wallets,
    selectedAccount: state.wallet.selectedWallet.account,
    walletSelectorError: state.exchangeTransaction.walletSelectorError,
    rate: state.rate.rate,
    rateLoading: state.rate.rateLoading,
    totalResultLoading: state.wallet.totalResultLoading,
    isLedger: state.ledger.isLedger,
    ledgerWallet: state.ledger.ledgerWallet,
    isLoggedIn: state.wallet.selectedWallet.isLoggedIn
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setLogInState: (payload) => dispatch(setLogInState(payload)),
    setSelectedWallet: (payload) => dispatch(setSelectedWallet(payload)),
    openPopup: (s) => dispatch(openPopup(s))
  };
}

const WalletSelectorContainer = connect(mapStateToProps, mapDispatchToProps)(WalletSelector);

export default WalletSelectorContainer;
