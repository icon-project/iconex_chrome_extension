import { connect } from 'react-redux';
import { ContractPage } from 'app/components/';
import { resetContractPageReducer } from 'redux/actions/contractActions'

function mapStateToProps(state) {
  return {
    walletsLoading: state.wallet.walletsLoading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    resetReducer: () => dispatch(resetContractPageReducer())
  };
}

const ContractPageContainer = connect(mapStateToProps, mapDispatchToProps)(ContractPage);

export default ContractPageContainer;
