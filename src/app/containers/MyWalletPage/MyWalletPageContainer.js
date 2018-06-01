import { connect } from 'react-redux';
import { MyWallet } from 'app/components/';
import { togglePopup, setPopupType, setPopupNum } from 'redux/actions/popupActions';
import { getWallet, fetchAll } from 'redux/actions/walletActions';
import { setCurrency, getRate } from 'redux/actions/rateActions';
import { resetMainPageUIReducer } from 'redux/actions/mainPageUIActions';
import { setSelectedAccount } from 'redux/actions/mainPageUIActions';
import { setAccountAddress } from 'redux/actions/exchangeTransactionActions'
import { setIsAppOpenedByPopup } from 'redux/actions/globalActions';


function mapStateToProps(state) {
  return {
    wallets: state.wallet.wallets,
    walletsLoading: state.wallet.walletsLoading,
    currency: state.wallet.currency,
    rate: state.wallet.rate,
    rateLoading: state.wallet.rateLoading,
    totalResultLoading: state.wallet.totalResultLoading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getWallet: () => dispatch(getWallet()),
    togglePopup: () => dispatch(togglePopup()),
    setPopupType: (s) => dispatch(setPopupType(s)),
    setPopupNum: (n) => dispatch(setPopupNum(n)),
    setSelectedAccount: (s) => dispatch(setSelectedAccount(s)),
    getRate: (currency, wallets) => dispatch(getRate(currency, wallets)),
    setCurrency: (s) => dispatch(setCurrency(s)),
    setAccountAddress: payload => dispatch(setAccountAddress(payload)),
    fetchAll: (o) => dispatch(fetchAll(o)),
    resetMainPageUIReducer: () => dispatch(resetMainPageUIReducer()),
    setIsAppOpenedByPopup: (isTrue) => dispatch(setIsAppOpenedByPopup(isTrue))
  };
}

const MyWalletPageContainer = connect(mapStateToProps, mapDispatchToProps)(MyWallet);

export default MyWalletPageContainer;
