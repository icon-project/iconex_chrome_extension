import { connect } from 'react-redux';
import { AddressList } from 'app/components/';
import { togglePopup, setPopupType, setPopupNum, initPopupState } from 'redux/actions/popupActions';
import { setRecipientAddress, getTxFee } from 'redux/actions/exchangeTransactionActions';

function mapStateToProps(state) {
  return {
    wallets: state.wallet.wallets,
    accountAddress: state.exchangeTransaction.accountAddress,
    coinTypeIndex: state.exchangeTransaction.coinTypeIndex,
    coinQuantity: state.exchangeTransaction.coinQuantity,
    recipientAddress: state.exchangeTransaction.recipientAddress,
    history: state.history.list,
    pageType: state.exchangeTransaction.pageType,
    language: state.global.language
  };
}

function mapDispatchToProps(dispatch) {
  return {
    togglePopup: () => dispatch(togglePopup()),
    initPopupState: () => dispatch(initPopupState()),
    setPopupType: (s) => dispatch(setPopupType(s)),
    setPopupNum: (n) => dispatch(setPopupNum(n)),
    setRecipientAddress: (a) => dispatch(setRecipientAddress(a)),
    getTxFee: (coinType, param) => dispatch(getTxFee(coinType, param))
  };
}

const AddressListContainer = connect(mapStateToProps, mapDispatchToProps)(AddressList);

export default AddressListContainer;
