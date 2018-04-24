import { connect } from 'react-redux';
import { CoinDetail } from 'components/';
import { setSelectedToken } from 'redux/actions/mainPageUIActions';
import { fetchCoinBalance, fetchTokenBalance } from 'redux/actions/walletActions';
import { getRate } from 'redux/actions/rateActions';
import { setPopupType, togglePopup, setPopupNum } from 'redux/actions/popupActions';
import { setCurrency } from 'redux/actions/rateActions';
import { setEXTRPageType, setAccountAddress } from 'redux/actions/exchangeTransactionActions'
import { fetchTransactionHistory, resetHistoryReducer } from 'redux/actions/historyActions'

function mapStateToProps(state) {
  return {
    wallets: state.wallet.wallets,
    walletsLoading: state.wallet.walletsLoading,
    rate: state.wallet.rate,
    rateLoading: state.wallet.rateLoading,
    txHistory: state.history.history,
    txHistoryLoading: state.history.historyLoading,
    startBlock: state.history.startBlock,
    endBlock: state.history.endBlock,
    currency: state.wallet.currency,
    totalData: state.history.totalData,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchCoinBalance: (s1, s2) => dispatch(fetchCoinBalance(s1, s2)),
    fetchTokenBalance: (i, s1, s2, s3, s4) => dispatch(fetchTokenBalance(i, s1, s2, s3, s4)),
    fetchTransactionHistory: (account, data) => dispatch(fetchTransactionHistory(account, data)),
    resetReducer: () => dispatch(resetHistoryReducer()),
    getRate: (currency, wallets) => dispatch(getRate(currency, wallets)),
    setSelectedToken: (s, i) => dispatch(setSelectedToken(s, i)),
    setAccountAddress: payload => dispatch(setAccountAddress(payload)),
    setEXTRPageType: pageType => dispatch(setEXTRPageType(pageType)),
    setCurrency: (s) => dispatch(setCurrency(s)),
    setPopupType: (s) => dispatch(setPopupType(s)),
    togglePopup: () => dispatch(togglePopup()),
    setPopupNum: (s) => dispatch(setPopupNum(s)),
  };
}

const CoinDetailPageContainer = connect(mapStateToProps, mapDispatchToProps)(CoinDetail);

export default CoinDetailPageContainer;
