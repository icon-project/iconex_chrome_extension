import actionTypes from 'redux/actionTypes/actionTypes';
import { fromHexToDec, fromDecToHex } from 'utils/utils'

const initialState = {
    tabId: '',
    addressRequest: false,
    transaction: {},
    transactionLoading: false,
    signing: {},
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
        case actionTypes.setScore: {
            const { tabId, data: param } = action.payload
            const { params } = param
            const from = params.from
            const stepLimit = fromHexToDec(params.stepLimit)
            return {
                ...initialState,
                tabId,
                transaction: { from, stepLimit, param },
            }
        }
        case actionTypes.setScoreWallet: {
            const { wallet, privKey } = action.payload
            const newState = { ...state }
            newState.transaction.wallet = wallet
            newState.transaction.privKey = privKey
            return newState
        }
        case actionTypes.setScoreStep: {
            const { stepLimit, stepPrice } = action.payload
            const newState = { ...state }
            newState.transaction.stepLimit = stepLimit
            newState.transaction.stepPrice = stepPrice
            newState.transaction.param.params.stepLimit = fromDecToHex(stepLimit)
            return newState
        }
        case actionTypes.callScore: {
            const newState = { ...state }
            newState.transactionLoading = true
            return newState
        }
        case actionTypes.callScoreFulfilled: {
            const { txHash } = action.payload
            const newState = { ...state, a: 1 }
            newState.transactionLoading = false
            newState.transaction.txHash = txHash
            return newState
        }
        case actionTypes.callScoreRejected: {
            const { error } = action.payload
            const newState = { ...state }
            newState.transactionLoading = false
            newState.transaction.error = error
            return newState
        }
        case actionTypes.setSigning: {
            const { tabId, data: signing } = action.payload
            return {
                ...initialState,
                tabId,
                signing
            }
        }
        default: {
            return state
        }
    }
}

