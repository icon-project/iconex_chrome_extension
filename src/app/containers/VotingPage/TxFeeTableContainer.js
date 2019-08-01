import { connect } from 'react-redux';
import { TxFeeTable } from 'app/components/';
import BigNumber from 'bignumber.js'

function mapStateToProps(state) {
  return {
    txFeeLoading: state.txFee.txFeeLoading,
    txFeeLimit: state.txFee.txFeeLimit,
    txFeePrice: state.txFee.txFeePrice,
    usdRate: new BigNumber(state.rate.rate['icx']),
  };
}

function mapDispatchToProps(dispatch) {
  return {

  };
}

const TxFeeTableContainer = connect(mapStateToProps, mapDispatchToProps)(TxFeeTable);

export default TxFeeTableContainer;
