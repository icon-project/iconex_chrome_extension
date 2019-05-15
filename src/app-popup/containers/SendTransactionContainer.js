import { connect } from 'react-redux';
import SendTransaction from 'app-popup/components/SendTransaction';
import { getRate } from 'redux/actions/rateActions';
import { initExternalState, setScoreStep, setScoreTime } from 'redux/actions/externalActions';
import { withRouter } from 'react-router-dom';

function mapStateToProps(state) {
    return {
        rate: state.rate.rate,
        rateLoading: state.rate.rateLoading,
        tabId: state.external.tabId,
        transaction: state.external.transaction,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getRate: payload => dispatch(getRate(payload)),
        initExternalState: () => dispatch(initExternalState()),
        setScoreTime: payload => dispatch(setScoreTime(payload)),
        setScoreStep: payload => dispatch(setScoreStep(payload))
    };
}

const SendTransactionContainer = connect(mapStateToProps, mapDispatchToProps)(SendTransaction);

export default withRouter(SendTransactionContainer)
