import actionTypes from 'redux/actionTypes/actionTypes';
import { BigNumber } from 'bignumber.js';

const initialState = {
    tabId: '',
    addressRequest: false,
    transaction: {},
    transactionLoading: false,
    score: {},
    signing: {}
}

export function externalReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.initExternalState: {
            return initialState
        }
        case actionTypes.setAddressRequest: {
            const { tabId } = action.payload
            return {
                ...initialState,
                tabId,
                addressRequest: true,
            }
        }
        case actionTypes.setTransaction: {
            const { tabId, from, to, value } = action.payload
            const raw = { from, to, value }
            return {
                ...initialState,
                tabId,
                transaction: { from, raw },
            }
        }
        case actionTypes.setTransactionWallet: {
            const { wallet, privKey } = action.payload
            const newState = { ...state }
            newState.transaction.wallet = wallet
            newState.transaction.privKey = privKey
            return newState
        }        
        case actionTypes.setTransactionStep: {
            const { stepLimit, maxStepIcx } = action.payload
            const newState = { ...state }
            newState.transaction.stepLimit = stepLimit
            newState.transaction.maxStepIcx = maxStepIcx
            newState.transaction.raw.txFeeLimit = '0x' + (new BigNumber(stepLimit)).toString(16)
            return newState
        }
        case actionTypes.callSendTransaction: {
            const newState = { ...state }
            newState.transactionLoading = true
            return newState
        }
        case actionTypes.callSendTransactionFulfilled: {
            const { txHash } = action.payload
            const newState = { ...state, a:1 }
            newState.transactionLoading = false
            newState.transaction.txHash = txHash
            return newState
        }
        case actionTypes.callSendTransactionRejected: {
            const { error } = action.payload
            const newState = { ...state }
            newState.transactionLoading = false
            newState.transaction.error = error
            return newState
        }
        case actionTypes.setScore: {
            const { tabId, from, param } = action.payload
            return {
                ...initialState,
                tabId,
                score: { from, param },
            }
        }
        case actionTypes.setSigning: {
            const { tabId, from, hash } = action.payload
            return {
                ...initialState,
                tabId,
                signing: { from, hash }
            }
        }
        default: {
            return state
        }
    }
}

