import { connect } from 'react-redux';
import { RecipientAddress } from 'components/';
import { setRecipientAddress, getTxFee, setRecipientAddressError, resetEXTRPageReducer } from 'redux/actions/exchangeTransactionActions';
import { togglePopup, setPopupType } from 'redux/actions/popupActions';

function mapStateToProps(state) {
  return {
    wallets: state.wallet.wallets,
    coinQuantity: state.exchangeTransaction.coinQuantity,
    coinTypeIndex: state.exchangeTransaction.coinTypeIndex,
    pageType: state.exchangeTransaction.pageType,
    pageTypeText: state.exchangeTransaction.pageTypeText,
    isLoggedIn: state.exchangeTransaction.isLoggedIn,
    recipientAddress: state.exchangeTransaction.recipientAddress,
    recipientAddressError: state.exchangeTransaction.recipientAddressError,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setRecipientAddress: address => dispatch(setRecipientAddress(address)),
    setRecipientAddressError: () => dispatch(setRecipientAddressError()),
    togglePopup: () => dispatch(togglePopup()),
    setPopupType: (s) => dispatch(setPopupType(s)),
    resetReducer: () => dispatch(resetEXTRPageReducer()),
    getTxFee: (coinType, param) => dispatch(getTxFee(coinType, param)),
  };
}

const RecipientAddressContainer = connect(mapStateToProps, mapDispatchToProps)(RecipientAddress);

export default RecipientAddressContainer;
