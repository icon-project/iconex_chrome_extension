import { connect } from 'react-redux';
import { CalculationTable } from 'app/components/';
import { setTxFeeLimit, setTxFeePrice, setCalcData } from 'redux/actions/exchangeTransactionActions';

function mapStateToProps(state) {
  return {
    calcData: state.exchangeTransaction.calcData,
    txFeeLoading: state.exchangeTransaction.txFeeLoading,
    txFeePrice: state.exchangeTransaction.txFeePrice,
    txFeeLimit: state.exchangeTransaction.txFeeLimit,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setTxFeeLimit: (payload) => dispatch(setTxFeeLimit(payload)),
    setTxFeePrice: (payload) => dispatch(setTxFeePrice(payload)),
    setCalcData: () => dispatch(setCalcData())
  };
}

const CalculationTableContainer = connect(mapStateToProps, mapDispatchToProps)(CalculationTable);

export default CalculationTableContainer;
