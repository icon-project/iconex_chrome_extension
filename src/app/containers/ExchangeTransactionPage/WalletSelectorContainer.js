import { connect } from 'react-redux';
import { WalletSelector } from 'app/components/';
import { setAccountAddress } from 'redux/actions/exchangeTransactionActions';
import { togglePopup, setPopupType } from 'redux/actions/popupActions';

function mapStateToProps(state) {
  return {
    wallets: state.wallet.wallets,
    pageType: state.exchangeTransaction.pageType,
    pageTypeText: state.exchangeTransaction.pageTypeText,
    accountAddress: state.exchangeTransaction.accountAddress,
    rate: state.wallet.rate,
    rateLoading: state.wallet.rateLoading,
    totalResultLoading: state.wallet.totalResultLoading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setAccountAddress: address => dispatch(setAccountAddress(address)),
    togglePopup: () => dispatch(togglePopup()),
    setPopupType: (s) => dispatch(setPopupType(s))
  };
}

const WalletSelectorContainer = connect(mapStateToProps, mapDispatchToProps)(WalletSelector);

export default WalletSelectorContainer;
