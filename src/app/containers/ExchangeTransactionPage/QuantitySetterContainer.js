import { connect } from 'react-redux';
import { QuantitySetter } from 'app/components/';
import { setSelectedWallet } from 'redux/actions/walletActions';
import { setCalcData, setCoinQuantity, setCoinQuantityError, setTxFeeLimit, setTxFeePrice, getTxFeeInfo, toggleFullBalance } from 'redux/actions/exchangeTransactionActions';

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
    txFeeLoading: state.exchangeTransaction.txFeeLoading,
    txFeePrice: state.exchangeTransaction.txFeePrice,
    txFeeLimit: state.exchangeTransaction.txFeeLimit,
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
    setTxFeeLimit: payload => dispatch(setTxFeeLimit(payload)),
    setTxFeePrice: payload => dispatch(setTxFeePrice(payload)),
    getTxFeeInfo: data => dispatch(getTxFeeInfo(data)),
  };
}

const QuantitySetterContainer = connect(mapStateToProps, mapDispatchToProps)(QuantitySetter);

export default QuantitySetterContainer;
