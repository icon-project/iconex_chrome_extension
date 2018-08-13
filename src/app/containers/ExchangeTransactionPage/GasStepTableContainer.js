import { connect } from 'react-redux';
import { GasStepTable } from 'app/components/';
import { setGasLimit, setGasPrice, setCalcData, setData, setGasLimitError, setContractGasLimitError, setDataError } from 'redux/actions/exchangeTransactionActions';

function mapStateToProps(state) {
  return {
    wallets: state.wallet.wallets,
    totalResultLoading: state.wallet.totalResultLoading,
    selectedAccount: state.wallet.selectedWallet.account,
    selectedTokenId: state.wallet.selectedWallet.tokenId,
    isToken: state.wallet.selectedWallet.isToken,
    calcData: state.exchangeTransaction.calcData,
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
    setGasLimit: payload => dispatch(setGasLimit(payload)),
    setGasLimitError: () => dispatch(setGasLimitError()),
    setContractGasLimitError: () => dispatch(setContractGasLimitError()),
    setGasPrice: payload => dispatch(setGasPrice(payload)),
    setData: payload => dispatch(setData(payload)),
    setDataError: () => dispatch(setDataError()),
    setCalcData: () => dispatch(setCalcData()),
  };
}

const GasStepTableContainer = connect(mapStateToProps, mapDispatchToProps)(GasStepTable);

export default GasStepTableContainer;
