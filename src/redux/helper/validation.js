import { isAddress, isIcxWalletAddress, isIcxContractAddress, isHex, checkHxPrefix, check0xPrefix } from 'utils'
import { store } from 'redux/store/store';

function validateCoinQuantityError() {
  const coinQuantity = store.getState().exchangeTransaction.coinQuantity;
  const isResultBalanceMinus = store.getState().exchangeTransaction.calcData.isResultBalanceMinus;
  const isCoinQuantityZero = Number(coinQuantity) === 0;

  if (!coinQuantity) {
    return 'coinAmount'
  } else if (isCoinQuantityZero) {
    return 'coinAmountZero'
  } else if (isResultBalanceMinus) {
    return 'coinAmountBalance'
  } else {
    return ''
  }
}

function validateRecipientAddressError() {
  const selectedAccount = store.getState().wallet.selectedWallet.account;
  const recipientAddress = store.getState().exchangeTransaction.recipientAddress.toLowerCase();
  const walletCoinType = store.getState().exchangeTransaction.calcData.walletCoinType;

  let isAddressFunc = () => {
    return walletCoinType === 'icx' ? (isIcxWalletAddress(recipientAddress) || isIcxContractAddress(recipientAddress))
                                    : isAddress(recipientAddress);
  }
  let isAddressSame = () => {
    return walletCoinType === 'icx' ? selectedAccount === checkHxPrefix(recipientAddress)
                                    : selectedAccount === check0xPrefix(recipientAddress)
  }

  if (!recipientAddress) {
    return 'transferAddressEnter'
  } else if (!isAddressFunc()) {
    return 'transferAddressConfirm'
  } else if (isAddressSame()) {
    return 'transferAddressSame'
  } else {
    return ''
  }
}

function validateDataError(state) {
  if (!isHex(state.data)) {
    return 'checkData'
  } else {
    return ''
  }
}

function validateTxFeeLimitError(state) {
  let error = '';
  if (!state.txFeeLimit) {
    error = 'enterGasPrice'
  } else {
    error = ''
  }
  return error
}

function validateContractTxFeeLimitError(state) {
  let error = '';
  if (!state.txFeeLimit) {
    error = 'enterGasPrice'
  } else if (state.calcData.isResultBalanceMinus) {
    error = 'notEnoughBalance'
  } else {
    error = ''
  }
  return error
}

export {
  validateCoinQuantityError,
  validateRecipientAddressError,
  validateDataError,
  validateTxFeeLimitError,
  validateContractTxFeeLimitError
}
