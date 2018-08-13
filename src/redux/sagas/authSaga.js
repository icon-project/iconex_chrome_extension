import { fork, put, takeLatest, call } from 'redux-saga/effects'
import AT from 'redux/actionTypes/actionTypes';
import {
  isWalletExistApi as IS_LOGGED_IN
} from 'redux/api/walletApi'

export function* isLoggedInFunc(action) {
  try {
    const payload = yield call(IS_LOGGED_IN);
    yield put({type: AT.initLoginCheckFulfilled, payload});
  } catch (e) {
    alert(e);
    yield put({type: AT.initLoginCheckRejected, error: e});
  }
}

function* watchIsLoggedIn() {
  yield takeLatest(AT.initLoginCheck, isLoggedInFunc)
}

export default function* authSaga() {
 yield fork(watchIsLoggedIn);
}
