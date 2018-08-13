import { connect } from 'react-redux';
import { CalculationTable } from 'app/components/';
import { setGasLimit, setGasPrice, setCalcData } from 'redux/actions/exchangeTransactionActions';

function mapStateToProps(state) {
  return {
    calcData: state.exchangeTransaction.calcData,
    gasLoading: state.exchangeTransaction.gasLoading,
    gasPrice: state.exchangeTransaction.gasPrice,
    gasLimit: state.exchangeTransaction.gasLimit,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setGasLimit: (payload) => dispatch(setGasLimit(payload)),
    setGasPrice: (payload) => dispatch(setGasPrice(payload)),
    setCalcData: () => dispatch(setCalcData())
  };
}

const CalculationTableContainer = connect(mapStateToProps, mapDispatchToProps)(CalculationTable);

export default CalculationTableContainer;
