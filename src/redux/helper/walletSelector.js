import { store } from 'redux/store/store'

const walletsSelector = () => store.getState().wallet.wallets
const selectedWalletSelector = () => store.getState().wallet.selectedWallet
const selectedAccountSelector = () => store.getState().wallet.selectedWallet.account
const selectedTokenIdSelector = () => store.getState().wallet.selectedWallet.tokenId
const isTokenSelector = () => store.getState().wallet.selectedWallet.isToken
const isLedgerSelector = () => store.getState().ledger.isLedger
const ledgerWalletSelector = () => store.getState().ledger.ledgerWallet

const coinQuantitySelector = () => store.getState().exchangeTransaction.coinQuantity
const recipientAddressSelector = () => store.getState().exchangeTransaction.recipientAddress
const txFeePriceSelector = () => store.getState().exchangeTransaction.txFeePrice
const txFeeLimitSelector = () => store.getState().exchangeTransaction.txFeeLimit
const dataSelector = () => store.getState().exchangeTransaction.data

const walletSelector = () => {
  const wallets = walletsSelector()
  const isLedger = isLedgerSelector()
  const ledgerWallet = ledgerWalletSelector()
  const account = selectedAccountSelector()
  console.log(wallets, account)
  if (isLedger) {
    return ledgerWallet
  } else {
    return wallets[account]
  }
}

const coinTokenSelector = () => {
  const wallets = walletsSelector()
  const selectedWallet = selectedWalletSelector()
  const { account, tokenId, isToken } = selectedWallet

  return isToken ? wallets[account].tokens[tokenId] : wallets[account]
}

const walletCoinTypeSelector = () => {
  const wallets = walletsSelector()
  const isLedger = isLedgerSelector()
  const ledgerWallet = ledgerWalletSelector()
  const account = selectedAccountSelector()
  return isLedger ? ledgerWallet.type : wallets[account].type
}

const walletPrivSelector = () => {
  return walletSelector().priv
}

const walletNameSelector = () => {
  return walletSelector().name
}

const pendingTransactionSelector = () => {
  return coinTokenSelector().pendingTransaction
}

const defaultDecimalsSelector = () => {
  const isToken = isTokenSelector()
  return isToken ? coinTokenSelector().defaultDecimals : 18
}

const decimalsSelector = () => {
  const isToken = isTokenSelector()
  return isToken ? coinTokenSelector().decimals : 18
}

const symbolSelector = () => {
  const isToken = isTokenSelector()
  return isToken ? coinTokenSelector().symbol : walletCoinTypeSelector()
}

const unitSymbolSelector = () => {
  const isToken = isTokenSelector()
  return isToken ? coinTokenSelector().defaultSymbol : walletCoinTypeSelector()
}

const walletArraySelector = (wallets = walletsSelector()) => {
  const walletArr = Object.keys(wallets).map((k) => wallets[k]);
  walletArr.sort((a, b) => a.createdAt - b.createdAt);
  return walletArr;
}

const assetSymbolListSelector = () => {
  const wallet = walletSelector();
  const assetSymbolList = {}
  const tokens = Object.values(wallet.tokens);
  assetSymbolList[wallet.account] = wallet.type
  for(let i=0; i<tokens.length; i++) {
    assetSymbolList[tokens[i].address] = tokens[i].symbol
  }
  return assetSymbolList;
}

export {
  walletSelector,
  walletsSelector,
  walletCoinTypeSelector,
  walletPrivSelector,
  walletNameSelector,
  pendingTransactionSelector,
  defaultDecimalsSelector,
  decimalsSelector,
  unitSymbolSelector,
  walletArraySelector,
  isTokenSelector,
  selectedAccountSelector,
  selectedTokenIdSelector,
  coinQuantitySelector,
  recipientAddressSelector,
  txFeePriceSelector,
  txFeeLimitSelector,
  symbolSelector,
  dataSelector,
  coinTokenSelector,
  assetSymbolListSelector
}
