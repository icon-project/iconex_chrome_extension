import actionTypes from 'redux/actionTypes/actionTypes';

const initialState = {
    tabId: '',
    addressRequest: false,
    transaction: {},
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
            return {
                ...initialState,
                tabId,
                transaction: { 
                    from, 
                    raw: {
                        from,
                        to,
                        value,
                        txFeeLimit: '0x186a0' // 100000
                    }
                },
            }
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

