import { connect } from 'react-redux';
import MyWallet from 'app-popup/components/MyWallet';
import { getWallet, fetchAll, setSelectedWallet } from 'redux/actions/walletActions';
import { sendCall } from 'redux/actions/exchangeTransactionActions'
import { setIsRequestedStatus, setTransactionStatus } from 'redux/actions/globalActions';

function mapStateToProps(state) {
  return {
    wallets: state.wallet.wallets,
    walletsLoading: state.wallet.walletsLoading,
    totalResultLoading: state.wallet.totalResultLoading,
    tx: state.exchangeTransaction.tx,
    txLoading: state.exchangeTransaction.txLoading,
    isRequestedStatus: state.global.message ? state.global.message.isRequestedStatus : undefined,
    transaction: state.global.message ? state.global.message.transaction : undefined,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getWallet: () => dispatch(getWallet()),
    sendCall: (privKey, data, isLedger) => dispatch(sendCall(privKey, data, isLedger)),
    setSelectedWallet: (payload) => dispatch(setSelectedWallet(payload)),
    fetchAll: (o) => dispatch(fetchAll(o)),
    setIsRequestedStatus: (requested) => dispatch(setIsRequestedStatus(requested)),
    setTransactionStatus: (transaction) => dispatch(setTransactionStatus(transaction)),
  };
}

const MyWalletPageContainer = connect(mapStateToProps, mapDispatchToProps)(MyWallet);

export default MyWalletPageContainer;
