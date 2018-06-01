import { connect } from 'react-redux';
import MyWallet from 'app-popup/components/MyWallet';
import { getWallet, fetchAll } from 'redux/actions/walletActions';
import { resetMainPageUIReducer } from 'redux/actions/mainPageUIActions';
import { setSelectedAccount } from 'redux/actions/mainPageUIActions';
import { setAccountAddress, sendCall } from 'redux/actions/exchangeTransactionActions'
import { setIsAppOpenedByPopup, setIsRequestedStatus, setTransactionStatus } from 'redux/actions/globalActions';

function mapStateToProps(state) {
  return {
    wallets: state.wallet.wallets,
    walletsLoading: state.wallet.walletsLoading,
    totalResultLoading: state.wallet.totalResultLoading,
    tx: state.exchangeTransaction.tx,
    txLoading: state.exchangeTransaction.txLoading,
    // isRequestedStatus: state.global.message.isRequestedStatus,
    // transaction: state.global.message.transaction,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getWallet: () => dispatch(getWallet()),
    sendCall: (privKey, data) => dispatch(sendCall(privKey, data)),
    setSelectedAccount: (s) => dispatch(setSelectedAccount(s)),
    setAccountAddress: payload => dispatch(setAccountAddress(payload)),
    fetchAll: (o) => dispatch(fetchAll(o)),
    resetMainPageUIReducer: () => dispatch(resetMainPageUIReducer()),
    setIsAppOpenedByPopup: (isTrue) => dispatch(setIsAppOpenedByPopup(isTrue)),
    setIsRequestedStatus: (requested) => dispatch(setIsRequestedStatus(requested)),
    setTransactionStatus: (transaction) => dispatch(setTransactionStatus(transaction)),
  };
}

const MyWalletPageContainer = connect(mapStateToProps, mapDispatchToProps)(MyWallet);

export default MyWalletPageContainer;
