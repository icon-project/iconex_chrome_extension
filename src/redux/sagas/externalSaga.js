import { fork, takeLatest, call, put } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import AT from 'redux/actionTypes/actionTypes';
import { icx_callScoreExternally as CALL_SCORE_EXTERNALLY } from 'redux/api/walletIcxApi';
import { signRawTx } from 'utils'
import { signHashcode } from 'utils/iconex'

export function* callScoreFunc(action) {
    const { tabId, privKey, param } = action.payload
    try {
        const { params } = param
        param.params = signRawTx(privKey, params)
        const payload = yield call(CALL_SCORE_EXTERNALLY, param)
        const txHash = payload.result
        yield put({ type: AT.callScoreFulfilled, payload: { txHash } });
        window.chrome.tabs.sendMessage(tabId, { type: 'RESPONSE_JSON-RPC', payload });
    }
    catch (error) {
        yield put({ type: AT.callScoreRejected, payload: { error } });
        window.chrome.tabs.sendMessage(tabId, { type: 'RESPONSE_JSON-RPC', payload: error });
    }
}
export function* callSigningFunc(action) {
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