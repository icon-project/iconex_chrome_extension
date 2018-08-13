import { connect } from 'react-redux';
import { RecipientAddress } from 'app/components/';
import { setRecipientAddress, setRecipientAddressError, resetEXTRPageReducer, getGasInfo } from 'redux/actions/exchangeTransactionActions';
import { openPopup } from 'redux/actions/popupActions';
import { fetchRecentHistory } from 'redux/actions/historyActions';

function mapStateToProps(state) {
  return {
    wallets: state.wallet.wallets,
    coinQuantity: state.exchangeTransaction.coinQuantity,
    selectedAccount: state.wallet.selectedWallet.account,
    selectedTokenId: state.wallet.selectedWallet.tokenId,
    isToken: state.wallet.selectedWallet.isToken,
    isLoggedIn: state.exchangeTransaction.isLoggedIn,
    recipientAddress: state.exchangeTransaction.recipientAddress,
    recipientAddressError: state.exchangeTransaction.recipientAddressError,
    historyLoading: state.history.historyLoading,
    gasLoading: state.exchangeTransaction.gasLoading,
    gasPrice: state.exchangeTransaction.gasPrice,
    gasLimit: state.exchangeTransaction.gasLimit,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setRecipientAddress: address => dispatch(setRecipientAddress(address)),
    setRecipientAddressError: () => dispatch(setRecipientAddressError()),

    fetchRecentHistory: () => dispatch(fetchRecentHistory()),

    openPopup: (s) => dispatch(openPopup(s)),
    resetReducer: () => dispatch(resetEXTRPageReducer()),
    getGasInfo: data => dispatch(getGasInfo(data)),
  };
}

const RecipientAddressContainer = connect(mapStateToProps, mapDispatchToProps)(RecipientAddress);

export default RecipientAddressContainer;
