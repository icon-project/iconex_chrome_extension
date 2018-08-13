import { fork, put, takeLatest, call } from 'redux-saga/effects'
import AT from 'redux/actionTypes/actionTypes';
import BigNumber from 'bignumber.js';
import {
  sendCoinApi as SEND_COIN,
  sendTokenApi as SEND_TOKEN,
  getGasInfoApi as GET_GAS_INFO
} from 'redux/api/transactionApi';
import {
  icx_sendTransaction as ICX_SEND_TRANSACTION,
} from 'redux/api/walletIcxApi';
import { check0xPrefix, customValueToTokenValue } from 'utils'
import {
  addRecentTransaction
} from 'redux/actions/walletActions';

export function* getGasInfoFunc(action) {
  try {
    const payload = yield call(GET_GAS_INFO, action.data.coinType, action.data);
    yield put({type: AT.getGasInfoFulfilled, payload: payload});
  } catch (e) {
    alert(e);
    yield put({type: AT.getGasInfoRejected, error: e});
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

function* watchGetGasInfo() {
  yield takeLatest(AT.getGasInfo, getGasInfoFunc)
}

function* watchSendTransactionCall() {
  yield takeLatest(AT.sendCall, sendTransactionCallFunc)
}

export default function* walletSaga() {
   yield fork(watchGetGasInfo);
   yield fork(watchSendTransactionCall);
}
