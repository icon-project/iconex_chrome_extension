import { fork, put, takeLatest, call } from 'redux-saga/effects'
import AT from 'redux/actionTypes/actionTypes';
import {
  getTxFeeApi as GET_TX_FEE,
  sendCoinApi as SEND_COIN,
  sendTokenApi as SEND_TOKEN,
  getGasInfoApi as GET_GAS_INFO
} from 'redux/api/transactionApi';
import { delete0xPrefix } from 'utils'
import {
  addRecentTransaction
} from 'redux/actions/walletActions';

export function* getTxFeeFunc(action) {
  try {
    const payload = yield call(GET_TX_FEE, action.coinType, action.param);
    yield put({type: AT.getTxFeeFulfilled, payload: payload});
  } catch (e) {
    alert(e);
    yield put({type: AT.getTxFeeRejected, error: e});
  }
}

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
    let isDone;
    let payload;

    if (!action.data.tokenAddress) {
      [isDone, payload] = yield call(SEND_COIN, action.privKey, action.data);
    } else {
      [isDone, payload] = yield call(SEND_TOKEN, action.privKey, action.data);
    }

    if (isDone) {
      yield put({type: AT.sendCallFulfilled, payload: payload});
      const data = {
        txid: payload,
        address: action.data.coinType === 'icx' ? action.data.to : delete0xPrefix(action.data.to),
        quantity: action.data.value,
        type: action.data.coinType,
        time: new Date().getTime()
      }
      yield put(addRecentTransaction(action.data.from, action.data.tokenAddress, data))
    } else {
      yield put({type: AT.sendCallRejected, errorMsg: payload.message});
    }
  } catch (e) {
    yield put({type: AT.sendCallRejected, errorMsg: e.message});
  }
}

function* watchGetTxFee() {
  yield takeLatest(AT.getTxFee, getTxFeeFunc)
}

function* watchGetGasInfo() {
  yield takeLatest(AT.getGasInfo, getGasInfoFunc)
}

function* watchSendTransactionCall() {
  yield takeLatest(AT.sendCall, sendTransactionCallFunc)
}

export default function* walletSaga() {
   yield fork(watchGetTxFee);
   yield fork(watchGetGasInfo);
   yield fork(watchSendTransactionCall);
}
