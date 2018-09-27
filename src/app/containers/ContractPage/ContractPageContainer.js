import { connect } from 'react-redux';
import { ContractPage } from 'app/components/';
import { resetContractPageReducer } from 'redux/actions/contractActions'
import { resetEXTRPageReducer } from 'redux/actions/exchangeTransactionActions'
import { setFuncInputDataExceedError } from 'redux/actions/contractActions';


function mapStateToProps(state) {
  return {
    walletsLoading: state.wallet.walletsLoading,
    funcInputDataExceedError: state.contract.funcInputDataExceedError,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setFuncInputDataExceedError: (payload) => dispatch(setFuncInputDataExceedError(payload)),
    resetReducer: () => dispatch(resetContractPageReducer()),
    resetEXTRPageReducer: () => dispatch(resetEXTRPageReducer())
  };
}

const ContractPageContainer = connect(mapStateToProps, mapDispatchToProps)(ContractPage);

export default ContractPageContainer;
