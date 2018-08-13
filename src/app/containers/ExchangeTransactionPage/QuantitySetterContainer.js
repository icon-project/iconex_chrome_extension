import { connect } from 'react-redux';
import { QuantitySetter } from 'app/components/';
import { setSelectedWallet } from 'redux/actions/walletActions';
import { setCalcData, setCoinQuantity, setCoinQuantityError, setGasLimit, setGasPrice, getGasInfo, toggleFullBalance } from 'redux/actions/exchangeTransactionActions';

function mapStateToProps(state) {
  return {
    wallets: state.wallet.wallets,
    totalResultLoading: state.wallet.totalResultLoading,
    isFullBalance: state.exchangeTransaction.isFullBalance,
    calcData: state.exchangeTransaction.calcData,
    selectedAccount: state.wallet.selectedWallet.account,
    selectedTokenId: state.wallet.selectedWallet.tokenId,
    isToken: state.wallet.selectedWallet.isToken,
    coinQuantity: state.exchangeTransaction.coinQuantity,
    isLoggedIn: state.exchangeTransaction.isLoggedIn,
    recipientAddress: state.exchangeTransaction.recipientAddress,
    coinQuantityError: state.exchangeTransaction.coinQuantityError,
    isResultBalanceMinus: state.exchangeTransaction.isResultBalanceMinus,
    gasLoading: state.exchangeTransaction.gasLoading,
    gasPrice: state.exchangeTransaction.gasPrice,
    gasLimit: state.exchangeTransaction.gasLimit,
    language: state.global.language
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setCalcData: () => dispatch(setCalcData()),
    setSelectedWallet: (payload) => dispatch(setSelectedWallet(payload)),
    setCoinQuantity: quantity => dispatch(setCoinQuantity(quantity)),
    setCoinQuantityError: () => dispatch(setCoinQuantityError()),
    toggleFullBalance: (payload) => dispatch(toggleFullBalance(payload)),
    setGasLimit: payload => dispatch(setGasLimit(payload)),
    setGasPrice: payload => dispatch(setGasPrice(payload)),
    getGasInfo: data => dispatch(getGasInfo(data)),
  };
}

const QuantitySetterContainer = connect(mapStateToProps, mapDispatchToProps)(QuantitySetter);

export default QuantitySetterContainer;
