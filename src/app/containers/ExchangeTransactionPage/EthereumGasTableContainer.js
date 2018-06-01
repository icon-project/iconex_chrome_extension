import { connect } from 'react-redux';
import { EthereumGasTable } from 'app/components/';
import { setAccountAddress, setGasLimit, setGasPrice, setCalcData, setData, setGasLimitError, setDataError } from 'redux/actions/exchangeTransactionActions';

function mapStateToProps(state) {
  return {
    wallets: state.wallet.wallets,
    totalResultLoading: state.wallet.totalResultLoading,
    accountAddress: state.exchangeTransaction.accountAddress,
    coinTypeIndex: state.exchangeTransaction.coinTypeIndex,
    coinQuantity: state.exchangeTransaction.coinQuantity,
    recipientAddress: state.exchangeTransaction.recipientAddress,
    coinQuantityError: state.exchangeTransaction.coinQuantityError,
    isResultBalanceMinus: state.exchangeTransaction.isResultBalanceMinus,
    gasPrice: state.exchangeTransaction.gasPrice,
    gasLimit: state.exchangeTransaction.gasLimit,
    gasLimitError: state.exchangeTransaction.gasLimitError,
    data: state.exchangeTransaction.data,
    dataError: state.exchangeTransaction.dataError,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setAccountAddress: address => dispatch(setAccountAddress(address)),
    setGasLimit: payload => dispatch(setGasLimit(payload)),
    setGasLimitError: () => dispatch(setGasLimitError()),
    setGasPrice: payload => dispatch(setGasPrice(payload)),
    setData: payload => dispatch(setData(payload)),
    setDataError: () => dispatch(setDataError()),
    setCalcData: () => dispatch(setCalcData()),
  };
}

const EthereumGasTableContainer = connect(mapStateToProps, mapDispatchToProps)(EthereumGasTable);

export default EthereumGasTableContainer;
