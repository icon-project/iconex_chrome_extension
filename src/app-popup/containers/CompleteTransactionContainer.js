import { connect } from 'react-redux';
import CompleteTransaction from 'app-popup/components/CompleteTransaction';
import { withRouter } from 'react-router-dom';
import { initExternalState } from 'redux/actions/externalActions';

function mapStateToProps(state) {
    return {
        transaction: state.external.transaction
    };
}

function mapDispatchToProps(dispatch) {
    return {
        initExternalState: () => dispatch(initExternalState()),
    };
}

const CompleteTransactionContainer = connect(mapStateToProps, mapDispatchToProps)(CompleteTransaction);

export default withRouter(CompleteTransactionContainer)