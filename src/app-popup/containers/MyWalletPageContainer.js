import { connect } from 'react-redux';
import MyWallet from 'app-popup/components/MyWallet';
import { getWallet, fetchAll, setSelectedWallet } from 'redux/actions/walletActions';
import { sendCall } from 'redux/actions/exchangeTransactionActions'
import { initExternalState, callSendTransaction, callScore, callSigning } from 'redux/actions/externalActions';

function mapStateToProps(state) {
  return {
    wallets: state.wallet.wallets,
    walletsLoading: state.wallet.walletsLoading,
    totalResultLoading: state.wallet.totalResultLoading,

    tabId: state.external.tabId,
    addressRequest: state.external.addressRequest,
    transaction: state.external.transaction,
    score: state.external.score,
    signing: state.external.signing,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getWallet: () => dispatch(getWallet()),
    sendCall: (privKey, data, isLedger) => dispatch(sendCall(privKey, data, isLedger)),
    setSelectedWallet: (payload) => dispatch(setSelectedWallet(payload)),
    fetchAll: (o) => dispatch(fetchAll(o)),

    initExternalState: () => dispatch(initExternalState()),
    callSendTransaction: (payload) => dispatch(callSendTransaction(payload)),
    callScore: (payload) => dispatch(callScore(payload)),
    callSigning: (payload) => dispatch(callSigning(payload)),
  };
}

const MyWalletPageContainer = connect(mapStateToProps, mapDispatchToProps)(MyWallet);

export default MyWalletPageContainer;
