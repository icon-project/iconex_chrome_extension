import { connect } from 'react-redux';
import { CoinDetail } from 'app/components/';
import { fetchCoinBalance, fetchTokenBalance, setSelectedWallet } from 'redux/actions/walletActions';
import { getRate } from 'redux/actions/rateActions';
import { openPopup, setPopupNum } from 'redux/actions/popupActions';
import { setCurrency } from 'redux/actions/rateActions';
import { fetchTransactionHistory, resetHistoryReducer } from 'redux/actions/historyActions'

function mapStateToProps(state) {
  return {
    wallets: state.wallet.wallets,
    walletsLoading: state.wallet.walletsLoading,
    rate: state.rate.rate,
    rateLoading: state.rate.rateLoading,
    txHistory: state.history.history,
    txHistoryLoading: state.history.historyLoading,
    currency: state.rate.currency,
    totalData: state.history.totalData,
    staked: state.iiss.staked,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchCoinBalance: (s1, s2) => dispatch(fetchCoinBalance(s1, s2)),
    fetchTokenBalance: (i, s1, s2, s3, s4) => dispatch(fetchTokenBalance(i, s1, s2, s3, s4)),
    fetchTransactionHistory: (payload) => dispatch(fetchTransactionHistory(payload)),
    resetReducer: () => dispatch(resetHistoryReducer()),
    getRate: (payload) => dispatch(getRate(payload)),
    setSelectedWallet: (payload) => dispatch(setSelectedWallet(payload)),
    setCurrency: (s) => dispatch(setCurrency(s)),
    openPopup: (s) => dispatch(openPopup(s)),
    setPopupNum: (s) => dispatch(setPopupNum(s))
  };
}

const CoinDetailPageContainer = connect(mapStateToProps, mapDispatchToProps)(CoinDetail);

export default CoinDetailPageContainer;
