import { connect } from 'react-redux';
import { RecipientAddress } from 'app/components/';
import { setRecipientAddress, getTxFee, setRecipientAddressError, resetEXTRPageReducer, getGasInfo } from 'redux/actions/exchangeTransactionActions';
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
    accountAddress: state.exchangeTransaction.accountAddress,
    gasLoading: state.exchangeTransaction.gasLoading,
    gasPrice: state.exchangeTransaction.gasPrice,
    gasLimit: state.exchangeTransaction.gasLimit,
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
    getGasInfo: data => dispatch(getGasInfo(data)),
  };
}

const RecipientAddressContainer = connect(mapStateToProps, mapDispatchToProps)(RecipientAddress);

export default RecipientAddressContainer;
