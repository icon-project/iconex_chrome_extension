import {
  walletsSelector,
  isTokenSelector,
  selectedAccountSelector,
  selectedTokenIdSelector,
  coinQuantitySelector,
  recipientAddressSelector,
  defaultDecimalsSelector,
  decimalsSelector,
  txFeePriceSelector,
  txFeeLimitSelector,
  dataSelector,
} from 'redux/helper/walletSelector'
import { check0xPrefix, customValueToTokenValue } from 'utils'
import { CHAIN_ID } from 'constants/config.js'
import { erc20Abi } from 'constants/index'
import BigNumber from 'bignumber.js';

const isWalletNameExists = (name) => {
  let wallets = walletsSelector();
  let nameArr = []
  if (wallets) {
    Object.keys(wallets).forEach(key => {nameArr.push(wallets[key].name)});
  }
  if (nameArr.indexOf(name) !== -1){
    return true
  }
  else {
    return false
  }
}

const makeEthRawTx = () => {
  let rawTx = {}
  const from = selectedAccountSelector()
  const contractAddress = selectedTokenIdSelector()
  const value = coinQuantitySelector()
  const defaultDecimal = defaultDecimalsSelector()
  const decimal = decimalsSelector()
  const to = recipientAddressSelector()
  const txFeePrice = txFeePriceSelector()
  const txFeeLimit = txFeeLimitSelector()
  const data = dataSelector()

  if (isTokenSelector()) {
    let token = window.web3.eth.contract(erc20Abi).at(check0xPrefix(from))
    let valueDiv = customValueToTokenValue(new BigNumber(value), defaultDecimal, decimal).times(Math.pow(10, defaultDecimal)).toString();
    const dataObj = token.transfer.getData(check0xPrefix(to), valueDiv);
    rawTx = {
      nonce: window.web3.toHex(window.web3.eth.getTransactionCount(check0xPrefix(from))),
      from: check0xPrefix(from),
      to: check0xPrefix(contractAddress),
      gasPrice: window.web3.toHex(window.web3.toWei(txFeePrice, 'gwei')),
      gasLimit: window.web3.toHex(txFeeLimit),
      chainId: CHAIN_ID(),
      value: 0,
      data: dataObj
    }
  }
  else {
    const sendAmount = window.web3.toWei(new BigNumber(value), "ether");
    rawTx = {
      nonce: window.web3.toHex(window.web3.eth.getTransactionCount(check0xPrefix(from))),
      from: check0xPrefix(from),
      to: check0xPrefix(to),
      gasPrice: window.web3.toHex(window.web3.toWei(txFeePrice, 'gwei')),
      gasLimit: window.web3.toHex(txFeeLimit),
      chainId: CHAIN_ID(),
      value: window.web3.toHex(sendAmount),
    }
    if (data) rawTx['data'] = data;
  }

  return rawTx
}

export {
  makeEthRawTx,
  isWalletNameExists
}
