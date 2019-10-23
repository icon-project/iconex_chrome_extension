import { connect } from 'react-redux';
import CheckTransaction from 'app-popup/components/CheckTransaction';
import { withRouter } from 'react-router-dom';
import { initExternalState, callScore } from 'redux/actions/externalActions';

function mapStateToProps(state) {
  return {
    tabId: state.external.tabId,
    host: state.external.host,
    transaction: state.external.transaction,
    transactionLoading: state.external.transactionLoading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    initExternalState: () => dispatch(initExternalState()),
    callScore: payload => dispatch(callScore(payload)),
  };
}

const CheckTransactionContainer = connect(mapStateToProps, mapDispatchToProps)(CheckTransaction);

export default withRouter(CheckTransactionContainer)