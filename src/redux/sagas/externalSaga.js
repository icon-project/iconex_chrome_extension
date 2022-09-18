import { fork, takeLatest, call, put } from 'redux-saga/effects'
import AT from 'redux/actionTypes/actionTypes';
import { icx_callScoreExternally as CALL_SCORE_EXTERNALLY } from 'redux/api/walletIcxApi';
import { signRawTx } from 'utils'
import { signHashcode } from 'utils/iconex'

export function* callScoreFunc(action) {
  const { tabId, privKey, payload } = action.payload
  try {
    const { params } = payload
    payload.params = signRawTx(privKey, params)
    const result = yield call(CALL_SCORE_EXTERNALLY, payload)
    const txHash = result.result
    yield put({ type: AT.callScoreFulfilled, payload: { txHash } });
    window.chrome.runtime.sendMessage({ type: 'SET_AUTO_SIGN', payload: action.payload });
    window.chrome.tabs.sendMessage(tabId, { type: 'RESPONSE_JSON-RPC', payload: result });
  }
  catch (error) {
    yield put({ type: AT.callScoreRejected, payload: { error } });
    window.chrome.tabs.sendMessage(tabId, { type: 'RESPONSE_JSON-RPC', payload: error });
  }
}
export function callSigningFunc(action) {
  const { tabId, privKey, hash } = action.payload
  let payload
  if (Array.isArray(hash)) {
    payload = []
    hash.forEach(h => {
      payload.push(signHashcode(privKey, h))
    })
  }
  else {
    payload = signHashcode(privKey, hash)
  }
  window.chrome.tabs.sendMessage(tabId, { type: 'RESPONSE_SIGNING', payload });
  window.chrome.runtime.sendMessage({ type: 'CLOSE_POPUP' });
}

function* watchCallSendTransaction() {
  yield takeLatest(AT.callScore, callScoreFunc)
}
function* watchCallSigning() {
  yield takeLatest(AT.callSigning, callSigningFunc)
}

export default function* externalSaga() {
  yield fork(watchCallSendTransaction)
  yield fork(watchCallSigning)
}