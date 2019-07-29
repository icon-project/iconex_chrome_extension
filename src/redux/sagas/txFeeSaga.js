import { fork, put, call, all, takeLatest } from 'redux-saga/effects'
import AT from 'redux/actionTypes/actionTypes';
import {
  debug_estimateStepApi as DEBUG_ESTIMATE_STEP_API,
  icx_getStepPriceApi as ICX_GET_STEP_PRICE_API,
} from 'redux/api/walletIcxApi'

function* getEstimatedTxFeeFunc({ payload }) {
  try {
    yield put({type: AT.getEstimatedTxFeeLoading});
    const txFeeLimit = yield call(DEBUG_ESTIMATE_STEP_API, payload);
    const txFeePrice = yield call(ICX_GET_STEP_PRICE_API);
    yield put({
      type: AT.getEstimatedTxFeeFulfilled, 
      payload: {
        txFeeLimit,
        txFeePrice,
      }
    });
  } catch (error) {
    yield put({type: AT.getEstimatedTxFeeRejected, error});
  }
}

function* watchGetEstimatedTxFee() {
  yield takeLatest(AT.getEstimatedTxFee, getEstimatedTxFeeFunc)
}

export default function* txFeeSaga() {
  yield fork(watchGetEstimatedTxFee);
}
