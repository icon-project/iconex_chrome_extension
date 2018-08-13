import { connect } from 'react-redux';
import { ConnectLedger } from 'app/components/';
import { closePopup, setPopupNum } from 'redux/actions/popupActions';
import { setSelectedWallet } from 'redux/actions/walletActions';
import { setEXTRLogInStateForLedger } from 'redux/actions/ledgerActions'

function mapStateToProps(state) {
  return {
    popupNum: state.popup.popupNum,
    language: state.global.language,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    closePopup: () => dispatch(closePopup()),
    setPopupNum: payload => dispatch(setPopupNum(payload)),
    setSelectedWallet: (payload) => dispatch(setSelectedWallet(payload)),
    setEXTRLogInStateForLedger: (payload) => dispatch(setEXTRLogInStateForLedger(payload))
  };
}

const ConnectLedgerContainer = connect(mapStateToProps, mapDispatchToProps)(ConnectLedger);

export default ConnectLedgerContainer;
