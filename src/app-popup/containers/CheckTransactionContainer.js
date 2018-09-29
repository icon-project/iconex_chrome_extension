import { connect } from 'react-redux';
import CheckTransaction from 'app-popup/components/CheckTransaction';
import { withRouter } from 'react-router-dom';
import { initExternalState, callSendTransaction } from 'redux/actions/externalActions';

function mapStateToProps(state) {
    return {
        tabId: state.external.tabId,
        transaction: state.external.transaction
    };
}

function mapDispatchToProps(dispatch) {
    return {
        initExternalState: () => dispatch(initExternalState()),
        callSendTransaction: payload => dispatch(callSendTransaction(payload)),
    };
}

const CheckTransactionContainer = connect(mapStateToProps, mapDispatchToProps)(CheckTransaction);

export default withRouter(CheckTransactionContainer)