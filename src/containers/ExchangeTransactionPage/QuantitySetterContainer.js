import { connect } from 'react-redux';
import { QuantitySetter } from 'components/';
import { getTxFee, setCalcData, setAccountAddress, setCoinQuantity, setCoinQuantityError, setGasLimit, setGasPrice } from 'redux/actions/exchangeTransactionActions';

function mapStateToProps(state) {
  return {
    wallets: state.wallet.wallets,
    totalResultLoading: state.wallet.totalResultLoading,
    calcData: state.exchangeTransaction.calcData,
    pageType: state.exchangeTransaction.pageType,
    pageTypeText: state.exchangeTransaction.pageTypeText,
    accountAddress: state.exchangeTransaction.accountAddress,
    coinTypeIndex: state.exchangeTransaction.coinTypeIndex,
    coinQuantity: state.exchangeTransaction.coinQuantity,
    isLoggedIn: state.exchangeTransaction.isLoggedIn,
    recipientAddress: state.exchangeTransaction.recipientAddress,
    coinQuantityError: state.exchangeTransaction.coinQuantityError,
    isResultBalanceMinus: state.exchangeTransaction.isResultBalanceMinus,
    isInputReset: state.exchangeTransaction.isInputReset,
    gasLoading: state.exchangeTransaction.gasLoading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setCalcData: () => dispatch(setCalcData()),
    setAccountAddress: payload => dispatch(setAccountAddress(payload)),
    setCoinQuantity: quantity => dispatch(setCoinQuantity(quantity)),
    setCoinQuantityError: () => dispatch(setCoinQuantityError()),
    getTxFee: (coinType, param) => dispatch(getTxFee(coinType, param)),
    setGasLimit: payload => dispatch(setGasLimit(payload)),
    setGasPrice: payload => dispatch(setGasPrice(payload)),
  };
}

const QuantitySetterContainer = connect(mapStateToProps, mapDispatchToProps)(QuantitySetter);

export default QuantitySetterContainer;
