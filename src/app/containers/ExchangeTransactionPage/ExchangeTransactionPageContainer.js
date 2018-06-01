import { connect } from 'react-redux';
import { ExchangeTransaction } from 'app/components/';
import { fetchAll } from 'redux/actions/walletActions'
import { setEXTRPageType, setCoinQuantityError, setRecipientAddressError, submitCall, setAccountAddress, resetEXTRPageReducer } from 'redux/actions/exchangeTransactionActions';
import { togglePopup, setPopupType, setPopupNum } from 'redux/actions/popupActions';
import { withRouter } from 'react-router-dom'

function mapStateToProps(state) {
  return {
    wallets: state.wallet.wallets,
    walletsLoading: state.wallet.walletsLoading,
    isLoggedIn: state.exchangeTransaction.isLoggedIn,
    pageType: state.exchangeTransaction.pageType,
    pageTypeText: state.exchangeTransaction.pageTypeText,
    accountAddress: state.exchangeTransaction.accountAddress,
    recipientAddressError: state.exchangeTransaction.recipientAddressError,
    coinQuantityError: state.exchangeTransaction.coinQuantityError,
    submit: state.exchangeTransaction.submit,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setEXTRPageType: pageType => dispatch(setEXTRPageType(pageType)),
    setAccountAddress: address => dispatch(setAccountAddress(address)),
    setCoinQuantityError: () => dispatch(setCoinQuantityError()),
    setRecipientAddressError: () => dispatch(setRecipientAddressError()),
    fetchAll: (wallets) => dispatch(fetchAll(wallets)),
    submitCall: (payload) => dispatch(submitCall(payload)),
    togglePopup: () => dispatch(togglePopup()),
    setPopupType: (s) => dispatch(setPopupType(s)),
    setPopupNum: (s) => dispatch(setPopupNum(s)),
    resetReducer: () => dispatch(resetEXTRPageReducer())
  };
}

const ExchangeTransactionContainer = connect(mapStateToProps, mapDispatchToProps)(ExchangeTransaction);

export default withRouter(ExchangeTransactionContainer);
