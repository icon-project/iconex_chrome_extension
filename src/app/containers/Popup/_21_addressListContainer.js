import { connect } from 'react-redux';
import { AddressList } from 'app/components/';
import {  openPopup, setPopupNum, closePopup } from 'redux/actions/popupActions';
import { setRecipientAddress } from 'redux/actions/exchangeTransactionActions';
import { fetchTransactionHistory, resetHistoryReducer } from 'redux/actions/historyActions'
import { addAddressInAddressBook, deleteAddressInAddressBook } from 'redux/actions/addressBookActions'

function mapStateToProps(state) {
  return {
    wallets: state.wallet.wallets,
    selectedAccount: state.wallet.selectedWallet.account,
    selectedTokenId: state.wallet.selectedWallet.tokenId,
    isToken: state.wallet.selectedWallet.isToken,
    coinQuantity: state.exchangeTransaction.coinQuantity,
    recipientAddress: state.exchangeTransaction.recipientAddress,
    history: state.history.list,
    language: state.global.language,
    txHistory: state.history.history,
    txHistoryLoading: state.history.historyLoading,
    isLedger: state.ledger.isLedger,
    ledgerWallet: state.ledger.ledgerWallet,

    icxAddressBook: state.addressBook.icxAddressBook,
    ethAddressBook: state.addressBook.ethAddressBook
  };
}

function mapDispatchToProps(dispatch) {
  return {

    closePopup: () => dispatch(closePopup()),
    openPopup: (s) => dispatch(openPopup(s)),
    setPopupNum: (n) => dispatch(setPopupNum(n)),
    setRecipientAddress: (payload, isTxFeeNeeded) => dispatch(setRecipientAddress(payload, isTxFeeNeeded)),
    fetchTransactionHistory: (payload) => dispatch(fetchTransactionHistory(payload)),
    resetReducer: () => dispatch(resetHistoryReducer()),
    addAddressInAddressBook: (payload) => dispatch(addAddressInAddressBook(payload)),
    deleteAddressInAddressBook: (payload) => dispatch(deleteAddressInAddressBook(payload)),

  };
}

const AddressListContainer = connect(mapStateToProps, mapDispatchToProps)(AddressList);

export default AddressListContainer;
