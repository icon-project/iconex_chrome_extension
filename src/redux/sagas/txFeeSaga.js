import { fork, put, call, select, takeLatest } from 'redux-saga/effects'
import AT from 'redux/actionTypes/actionTypes';
import {
  debug_estimateStepApi as DEBUG_ESTIMATE_STEP_API,
  icx_getStepPriceApi as ICX_GET_STEP_PRICE_API,
} from 'redux/api/walletIcxApi'
import { makeIcxRawTx } from 'utils'

function* getEstimatedTxFeeFunc({ payload }) {
  try {
    yield put({ type: AT.getEstimatedTxFeeLoading });
    const from = yield select(state => state.wallet.selectedWallet.account)
    const rawTx = makeIcxRawTx(true, {
      from,
      ...payload,
    })
    delete rawTx.stepLimit
    const txFeeLimit = yield call(DEBUG_ESTIMATE_STEP_API, rawTx);
    const txFeePrice = yield call(ICX_GET_STEP_PRICE_API);
    yield put({
      type: AT.getEstimatedTxFeeFulfilled,
      payload: {
        txFeeLimit,
        txFeePrice,
      }
    });
  } catch (error) {
    yield put({ type: AT.getEstimatedTxFeeRejected, error });
  }
}

function* watchGetEstimatedTxFee() {
  yield takeLatest(AT.getEstimatedTxFee, getEstimatedTxFeeFunc)
}

export default function* txFeeSaga() {
  yield fork(watchGetEstimatedTxFee);
}
