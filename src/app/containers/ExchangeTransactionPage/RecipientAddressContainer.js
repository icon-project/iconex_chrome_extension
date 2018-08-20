import { connect } from 'react-redux';
import { RecipientAddress } from 'app/components/';
import { setRecipientAddress, setRecipientAddressError, resetEXTRPageReducer, getTxFeeInfo } from 'redux/actions/exchangeTransactionActions';
import { openPopup } from 'redux/actions/popupActions';
import { fetchRecentHistory } from 'redux/actions/historyActions';

function mapStateToProps(state) {
  return {
    wallets: state.wallet.wallets,
    coinQuantity: state.exchangeTransaction.coinQuantity,
    selectedAccount: state.wallet.selectedWallet.account,
    selectedTokenId: state.wallet.selectedWallet.tokenId,
    calcData: state.exchangeTransaction.calcData,
    isToken: state.wallet.selectedWallet.isToken,
    isLoggedIn: state.exchangeTransaction.isLoggedIn,
    recipientAddress: state.exchangeTransaction.recipientAddress,
    recipientAddressError: state.exchangeTransaction.recipientAddressError,
    historyLoading: state.history.historyLoading,
    txFeeLoading: state.exchangeTransaction.txFeeLoading,
    txFeePrice: state.exchangeTransaction.txFeePrice,
    txFeeLimit: state.exchangeTransaction.txFeeLimit,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setRecipientAddress: (address, isTxFeeNeeded) => dispatch(setRecipientAddress(address, isTxFeeNeeded)),
    setRecipientAddressError: () => dispatch(setRecipientAddressError()),

    fetchRecentHistory: () => dispatch(fetchRecentHistory()),

    openPopup: (s) => dispatch(openPopup(s)),
    resetReducer: () => dispatch(resetEXTRPageReducer()),
    getTxFeeInfo: data => dispatch(getTxFeeInfo(data)),
  };
}

const RecipientAddressContainer = connect(mapStateToProps, mapDispatchToProps)(RecipientAddress);

export default RecipientAddressContainer;
