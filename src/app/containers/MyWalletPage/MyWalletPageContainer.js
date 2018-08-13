import { connect } from 'react-redux';
import { MyWallet } from 'app/components/';
import {  openPopup, setPopupNum } from 'redux/actions/popupActions';
import { getWallet, fetchAll, setSelectedWallet } from 'redux/actions/walletActions';
import { setCurrency, getRate } from 'redux/actions/rateActions';


function mapStateToProps(state) {
  return {
    wallets: state.wallet.wallets,
    walletsLoading: state.wallet.walletsLoading,
    currency: state.rate.currency,
    rate: state.rate.rate,
    rateLoading: state.rate.rateLoading,
    totalResultLoading: state.wallet.totalResultLoading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getWallet: () => dispatch(getWallet()),

    openPopup: (s) => dispatch(openPopup(s)),
    setPopupNum: (n) => dispatch(setPopupNum(n)),
    setSelectedWallet: (payload) => dispatch(setSelectedWallet(payload)),
    getRate: (payload) => dispatch(getRate(payload)),
    setCurrency: (s) => dispatch(setCurrency(s)),
    fetchAll: (o) => dispatch(fetchAll(o))
  };
}

const MyWalletPageContainer = connect(mapStateToProps, mapDispatchToProps)(MyWallet);

export default MyWalletPageContainer;
