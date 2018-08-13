import { connect } from 'react-redux';
import { ContractExecuteSection } from 'app/components/';
import { setFuncIndex, checkContractInputError, executeFunc, setFuncInputError, handleFuncInputChange } from 'redux/actions/contractActions';
import { resetEXTRPageReducer } from 'redux/actions/exchangeTransactionActions';

function mapStateToProps(state) {
  return {
    isLoggedIn: state.exchangeTransaction.isLoggedIn,
    funcList: state.contract.funcList,
    selectedFuncIndex: state.contract.selectedFuncIndex,
    funcLoading: state.contract.funcLoading,
    funcInputState: state.contract.funcInput,
    funcInputError: state.contract.funcInputError,
    funcResult: state.contract.funcResult
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setFuncIndex: (payload) => dispatch(setFuncIndex(payload)),
    handleFuncInputChange: (payload) => dispatch(handleFuncInputChange(payload)),
    setFuncInputError: (payload) => dispatch(setFuncInputError(payload)),
    executeFunc: () => dispatch(executeFunc()),
    checkContractInputError: () => dispatch(checkContractInputError()),
    resetEXTRPageReducer: () => dispatch(resetEXTRPageReducer())

  };
}

const ContractExecuteSectionContainer = connect(mapStateToProps, mapDispatchToProps)(ContractExecuteSection);

export default ContractExecuteSectionContainer;
