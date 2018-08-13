import { fork, put, takeLatest } from 'redux-saga/effects'
import AT from 'redux/actionTypes/actionTypes';

function* setLockFunc(action) {
  try {
    yield put({type: AT.setLockFulfilled, payload: action.passcodeHash});
    if (!action.passcodeHash) {
      window.chrome.runtime.sendMessage({ type: 'CLEAR_LOCK' });
    } else {
      window.chrome.extension.sendMessage({ type: 'LOCK' })
    }
  } catch (e) {
    yield put({type: AT.setLockRejected, error: e});
  }
}

function* watchSetLock() {
  yield takeLatest(AT.setLock, setLockFunc)
}

export default function* lockSaga() {
 yield fork(watchSetLock);
}
