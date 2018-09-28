import { fork, takeLatest, call } from 'redux-saga/effects'
import AT from 'redux/actionTypes/actionTypes';
import {
    icx_callScoreExternally as CALL_SCORE_EXTERNALLY,
    icx_sendCoinApi as SEND_COIN_API
} from 'redux/api/walletIcxApi';
import {
    signRawTx
} from 'utils'
import {
    signHashcode
} from 'utils/iconex'

export function* callSendTransactionFunc(action) {
    const { tabId } = action.payload
    let payload
    try {
        const { privKey, raw } = action.payload
        const result = yield call(SEND_COIN_API, privKey, raw);
        payload = result
    }
    catch (e) {
        payload = e
    }
    window.chrome.tabs.sendMessage(tabId, { type: 'RESPONSE_TRANSACTION', payload });
    window.chrome.runtime.sendMessage({ type: 'CLOSE_POPUP' });
}
export function* callScoreFunc(action) {
    const { tabId } = action.payload
    let payload
    try {
        const { privKey, param } = action.payload
        const { params } = param
        param.params = signRawTx(privKey, params)
        const result = yield call(CALL_SCORE_EXTERNALLY, param);
        payload = result
    }
    catch (e) {
        payload = e
    }
    window.chrome.tabs.sendMessage(tabId, { type: 'RESPONSE_SCORE', payload });
    window.chrome.runtime.sendMessage({ type: 'CLOSE_POPUP' });
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
    yield takeLatest(AT.callSendTransaction, callSendTransactionFunc)
}
function* watchCallScore() {
    yield takeLatest(AT.callScore, callScoreFunc)
}
function* watchCallSigning() {
    yield takeLatest(AT.callSigning, callSigningFunc)
}

export default function* externalSaga() {
    yield fork(watchCallSendTransaction)
    yield fork(watchCallScore)
    yield fork(watchCallSigning)
}