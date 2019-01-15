import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TxData from 'app-popup/components/TxData';

function mapStateToProps(state) {
    return {
        signing: state.external.signing
    };
}

function mapDispatchToProps(dispatch) {
    return {
    };
}

const TxDataContainer = connect(mapStateToProps, mapDispatchToProps)(TxData);

export default withRouter(TxDataContainer)