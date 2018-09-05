import { connect } from 'react-redux';
import MyWallet from 'app-popup/components/MyWallet';
import { getWallet, fetchAll, setSelectedWallet } from 'redux/actions/walletActions';
import { sendCall } from 'redux/actions/exchangeTransactionActions'
import { setIsRequestedStatus, setTransactionStatus, setScoreData, callScoreExternally } from 'redux/actions/globalActions';

function mapStateToProps(state) {
  return {
    wallets: state.wallet.wallets,
    walletsLoading: state.wallet.walletsLoading,
    totalResultLoading: state.wallet.totalResultLoading,
    tx: state.exchangeTransaction.tx,
    txLoading: state.exchangeTransaction.txLoading,
    isRequestedStatus: state.global.message ? state.global.message.isRequestedStatus : undefined,
    transaction: state.global.message ? state.global.message.transaction : undefined,
    score: state.global.message && state.global.message.score ? state.global.message.score : {},
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
    setScoreData: (score) => dispatch(setScoreData(score)),
    callScoreExternally: (payload) => dispatch(callScoreExternally(payload)),
  };
}

const MyWalletPageContainer = connect(mapStateToProps, mapDispatchToProps)(MyWallet);

export default MyWalletPageContainer;
