import { connect } from 'react-redux';
import { ContractRunSection } from 'app/components/';
import { setFuncIndex, executeFunc } from 'redux/actions/contractActions';

function mapStateToProps(state) {
  return {
    funcList: state.contract.funcList,
    selectedFuncIndex: state.contract.selectedFuncIndex,
    funcLoading: state.contract.funcLoading,
    funcResult: state.contract.funcResult
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setFuncIndex: (payload) => dispatch(setFuncIndex(payload)),
    executeFunc: () => dispatch(executeFunc())
  };
}

const ContractRunSectionContainer = connect(mapStateToProps, mapDispatchToProps)(ContractRunSection);

export default ContractRunSectionContainer;
