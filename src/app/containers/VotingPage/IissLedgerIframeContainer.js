import { connect } from 'react-redux';
import { confirmLedger, resetLedgerReducer } from 'redux/actions/ledgerActions'
import { IissLedgerIframe } from 'app/components';

function mapStateToProps(state) {
  const { isLedgerConfirmed, isLedger, ledgerWallet } = state.ledger
  const { txFeeLimit } = state.txFee
  const { txLoading } = state.iiss
  const { language } = state.global
  return {
    txLoading,
    isLedgerConfirmed,
    isLedger,
    ledgerWallet,
    language,
    from: ledgerWallet.account,
    txFeeLimit,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    confirmLedger: payload => dispatch(confirmLedger(payload)),
    resetLedgerReducer: () => dispatch(resetLedgerReducer()),
  };
}

const IissLedgerIframeContainer = connect(mapStateToProps, mapDispatchToProps)(IissLedgerIframe);

export default IissLedgerIframeContainer;
