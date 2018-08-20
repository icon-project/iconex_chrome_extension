import { connect } from 'react-redux';
import { ContractPage } from 'app/components/';
import { resetContractPageReducer } from 'redux/actions/contractActions'
import { resetEXTRPageReducer } from 'redux/actions/exchangeTransactionActions'

function mapStateToProps(state) {
  return {
    walletsLoading: state.wallet.walletsLoading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    resetReducer: () => dispatch(resetContractPageReducer()),
    resetEXTRPageReducer: () => dispatch(resetEXTRPageReducer())
  };
}

const ContractPageContainer = connect(mapStateToProps, mapDispatchToProps)(ContractPage);

export default ContractPageContainer;
