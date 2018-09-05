import { connect } from 'react-redux';
import { TxFeeAndData } from 'app/components/';
import { setTxFeeLimit, setTxFeePrice, setCalcData, setData, setTxFeeLimitError, setContractTxFeeLimitError, setDataError, getTxFeeInfo } from 'redux/actions/exchangeTransactionActions';

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
    txFeePrice: state.exchangeTransaction.txFeePrice,
    txFeeLimit: state.exchangeTransaction.txFeeLimit,
    txFeeLimitError: state.exchangeTransaction.txFeeLimitError,
    data: state.exchangeTransaction.data,
    dataError: state.exchangeTransaction.dataError,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setTxFeeLimit: payload => dispatch(setTxFeeLimit(payload)),
    setTxFeeLimitError: () => dispatch(setTxFeeLimitError()),
    setContractTxFeeLimitError: () => dispatch(setContractTxFeeLimitError()),
    setTxFeePrice: payload => dispatch(setTxFeePrice(payload)),
    setData: payload => dispatch(setData(payload)),
    setDataError: () => dispatch(setDataError()),
    setCalcData: () => dispatch(setCalcData()),
    getTxFeeInfo: (payload) => dispatch(getTxFeeInfo(payload))
  };
}

const TxFeeAndDataContainer = connect(mapStateToProps, mapDispatchToProps)(TxFeeAndData);

export default TxFeeAndDataContainer;
