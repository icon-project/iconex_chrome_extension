import { connect } from 'react-redux';
import { ExchangeTransaction } from 'app/components/';
import { fetchAll } from 'redux/actions/walletActions'
import { setCoinQuantityError, setRecipientAddressError, submitCall, resetEXTRPageReducer } from 'redux/actions/exchangeTransactionActions';
import { openPopup, setPopupNum } from 'redux/actions/popupActions';
import { withRouter } from 'react-router-dom'

function mapStateToProps(state) {
  return {
    wallets: state.wallet.wallets,
    walletsLoading: state.wallet.walletsLoading,
    isLedger: state.ledger.isLedger,
    isLoggedIn: state.wallet.selectedWallet.isLoggedIn,
    recipientAddressError: state.exchangeTransaction.recipientAddressError,
    coinQuantityError: state.exchangeTransaction.coinQuantityError,
    submit: state.exchangeTransaction.submit,
    calcData: state.exchangeTransaction.calcData,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setCoinQuantityError: () => dispatch(setCoinQuantityError()),
    setRecipientAddressError: () => dispatch(setRecipientAddressError()),
    fetchAll: (wallets) => dispatch(fetchAll(wallets)),
    submitCall: (payload, options) => dispatch(submitCall(payload, options)),
    openPopup: (s) => dispatch(openPopup(s)),
    setPopupNum: (s) => dispatch(setPopupNum(s)),
    resetReducer: () => dispatch(resetEXTRPageReducer())
  };
}

const ExchangeTransactionContainer = connect(mapStateToProps, mapDispatchToProps)(ExchangeTransaction);

export default withRouter(ExchangeTransactionContainer);
