import { fork, put, takeLatest, call, select } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import AT from 'redux/actionTypes/actionTypes';
import BigNumber from 'bignumber.js';
import {
  sendCoinApi as SEND_COIN,
  sendTokenApi as SEND_TOKEN,
} from 'redux/api/transactionApi';
import {
  eth_getTxFeeInfoApi as ETH_GET_TX_FEE_INFO,
} from 'redux/api/walletEthApi';
import {
  icx_sendTransaction as ICX_SEND_TRANSACTION,
  icx_getTxFeeInfoApi as ICX_GET_TX_FEE_INFO
} from 'redux/api/walletIcxApi';
import { check0xPrefix, customValueToTokenValue, makeEthRawTx, isEmpty, checkLength } from 'utils'
import {
  addRecentTransaction
} from 'redux/actions/walletActions';
import { IS_V3 } from 'constants/config'

export function* getTxFeeInfoFunc(action) {
  try {
    const walletCoinType = yield select(state => state.exchangeTransaction.calcData.walletCoinType);
    const isTokenSelector = yield select(state => state.wallet.selectedWallet.isToken);
    if (walletCoinType === 'eth') {
      if (isTokenSelector) {
        const walletsSelector = yield select(state => state.wallet.wallets);
        const selectedAccountSelector = yield select(state => state.wallet.selectedWallet.account);
        const selectedTokenIdSelector = yield select(state => state.wallet.selectedWallet.tokenId);
        const coinQuantitySelector = yield select(state => state.exchangeTransaction.coinQuantity);
        const recipientAddressSelector = yield select(state => state.exchangeTransaction.recipientAddress);
        const token = walletsSelector[selectedAccountSelector].tokens[selectedTokenIdSelector]
        const txFeePriceSelector = yield select(state => state.exchangeTransaction.txFeePrice);
        const txFeeLimitSelector = yield select(state => state.exchangeTransaction.txFeeLimit);
        const rawTx = makeEthRawTx(true, {
          from: selectedAccountSelector,
          to: recipientAddressSelector,
          contractAddress: token.address,
          tokenDefaultDecimal: token.defaultDecimals,
          tokenDecimal: token.decimals,
          value: coinQuantitySelector,
          txFeePrice: txFeePriceSelector,
          txFeeLimit: txFeeLimitSelector
        })
        delete rawTx.gasLimit;
        const payload = yield call(ETH_GET_TX_FEE_INFO, rawTx);
        yield put({type: AT.getTxFeeInfoFulfilled, payload: payload});
      }
    } else {
      if (IS_V3) {
        let txFeePriceStep = yield select(state => state.exchangeTransaction.txFeePriceStep);
        let txFeeLimitTable = yield select(state => state.exchangeTransaction.txFeeLimitTable);

        if (!txFeePriceStep || isEmpty(txFeeLimitTable)) {
          const payload = yield call(ICX_GET_TX_FEE_INFO)
          txFeePriceStep = payload.txFeePriceStep
          txFeeLimitTable = payload.txFeeLimitTable
        }

        const isTokenSelector = yield select(state => state.wallet.selectedWallet.isToken);
        const contractFuncInput = yield select(state => state.contract.funcInput);
        const calcContractCallLimit = (data) => parseInt(txFeeLimitTable['default'], 16) + parseInt(txFeeLimitTable['contractCall'], 16) * checkLength(JSON.stringify(data))

        if (!isEmpty(contractFuncInput)) {
          let data;
          const funcList = yield select(state => state.contract.funcList);
          const selectedFuncIndex = yield select(state => state.contract.selectedFuncIndex);

          data = {
             "method": funcList[selectedFuncIndex].name,
             "params": contractFuncInput
          }
          yield put({type: AT.getTxFeeInfoFulfilled, payload: {
            txFeePrice: txFeePriceStep,
            txFeeLimit: calcContractCallLimit(data),
            txFeePriceStep: txFeePriceStep,
            txFeeLimitTable: txFeeLimitTable
          }});

        } else if (isTokenSelector) {
          let data;
          const selectedAccount = yield select(state => state.wallet.selectedWallet.account);
          const selectedTokenId = yield select(state => state.wallet.selectedWallet.tokenId);
          const isLedger = yield select(state => state.ledger.isLedger);
          const ledgerWallet = yield select(state => state.ledger.ledgerWallet);
          const wallets = yield select(state => state.wallet.wallets);
          const currentWallet = isLedger ? ledgerWallet : wallets[selectedAccount]
          const defaultDecimals = currentWallet.tokens[selectedTokenId].defaultDecimals
          const decimals = currentWallet.tokens[selectedTokenId].decimals
          const recipientAddress = yield select(state => state.exchangeTransaction.recipientAddress);
          const coinQuantity = yield select(state => state.exchangeTransaction.coinQuantity);
          const sendAmount = customValueToTokenValue(new BigNumber(coinQuantity || 0), defaultDecimals, decimals).times(Math.pow(10, defaultDecimals)).toString()

          data = {
             "method": 'transfer',
             "params": {
               "_to": recipientAddress,
               "_value": window.web3.toHex(sendAmount)
             }
          }

          yield put({type: AT.getTxFeeInfoFulfilled, payload: {
            txFeePrice: txFeePriceStep,
            txFeeLimit: calcContractCallLimit(data),
            txFeePriceStep: txFeePriceStep,
            txFeeLimitTable: txFeeLimitTable
          }});

        } else {
          const data = yield select(state => state.exchangeTransaction.data);
          const txFeeLimit = data.length > 0 ? parseInt(txFeeLimitTable['default'], 16) + parseInt(txFeeLimitTable['input'], 16) * checkLength(data)
                                             : parseInt(txFeeLimitTable['default'], 16)
          yield put({type: AT.getTxFeeInfoFulfilled, payload: {
           txFeePrice: txFeePriceStep,
           txFeeLimit: txFeeLimit,
           txFeePriceStep: txFeePriceStep,
           txFeeLimitTable: txFeeLimitTable
          }});
        }
      }
    }
    yield put({type: AT.setCalcData});
  } catch (e) {
    console.log(e)
    yield put({type: AT.getTxFeeInfoRejected, error: e});
  }
}

export function* setCoinQuantityFunc(action) {
  try {
    yield put({type: AT.setCalcData});
    if (action.isTxFeeNeeded) {
      yield call(delay, 250);
      yield put({type: AT.getTxFeeInfo});
    }
  } catch (e) {
    alert(e);
  }
}

export function* setRecipientAddressFunc(action) {
  try {
    if (action.isTxFeeNeeded) {
      yield call(delay, 250);
      yield put({type: AT.getTxFeeInfo});
    }
  } catch (e) {
    alert(e);
  }
}

export function* setDataFunc(action) {
  try {
    const walletCoinType = yield select(state => state.exchangeTransaction.calcData.walletCoinType);
    const isTokenSelector = yield select(state => state.wallet.selectedWallet.isToken);
    if (walletCoinType === 'icx' && !isTokenSelector) {
      yield put({type: AT.getTxFeeInfo});
    }
  } catch (e) {
    alert(e);
  }
}

export function* sendTransactionCallFunc(action) {
  try {
    let response;
    if (action.isLedger) {
      response = yield call(ICX_SEND_TRANSACTION, action.data);
      yield put({type: AT.sendCallFulfilled, payload: response});
    } else {
      if (!action.data.contractAddress) {
         response = yield call(SEND_COIN, action.privKey, action.data);
      } else {
         response = yield call(SEND_TOKEN, action.privKey, action.data);
      }
      yield put({type: AT.sendCallFulfilled, payload: response});

      const tokenSendAmount = action.data.contractAddress ? customValueToTokenValue(new BigNumber(action.data.value), action.data.tokenDefaultDecimal, action.data.tokenDecimal).toString()
                                                          : ''
      const data = {
        from: action.data.from,
        type: action.data.coinType,
        contractAddress: action.data.contractAddress || '',
        pending: {
          txid: check0xPrefix(response),
          address: action.data.to,
          quantity: action.data.contractAddress ? tokenSendAmount : action.data.value,
          type: action.data.coinType,
          time: new Date().getTime()
        },
        recent: {
          address: action.data.to,
          quantity: action.data.contractAddress ? tokenSendAmount : action.data.value,
          type: action.data.coinType,
          time: new Date().getTime()
        }
      }
      console.log(data)
      yield put(addRecentTransaction(data))
    }
  } catch (e) {
    yield put({type: AT.sendCallRejected, errorMsg: e});
  }
}

function* watchSetCoinQuantity() {
  yield takeLatest(AT.setCoinQuantity, setCoinQuantityFunc)
}

function* watchSetRecipientAddress() {
  yield takeLatest(AT.setRecipientAddress, setRecipientAddressFunc)
}

function* watchSetData() {
  yield takeLatest(AT.setData, setDataFunc)
}

function* watchGetTxFeeInfo() {
  yield takeLatest(AT.getTxFeeInfo, getTxFeeInfoFunc)
}

function* watchSendTransactionCall() {
  yield takeLatest(AT.sendCall, sendTransactionCallFunc)
}

export default function* walletSaga() {
  yield fork(watchSetCoinQuantity);
  yield fork(watchSetRecipientAddress);
  yield fork(watchSetData);
  yield fork(watchGetTxFeeInfo);
  yield fork(watchSendTransactionCall);
}
