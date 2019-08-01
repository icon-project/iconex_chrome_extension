import actionTypes from 'redux/actionTypes/actionTypes'

const initialState = {
  rate: {},
  rateLoading: true,
  currency: 'usd',
  error: ''
}

export function rateReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.setCurrency: {
      return Object.assign({}, state, {
        currency: action.currency
      })
    }
    case actionTypes.getRateLoading: {
      return Object.assign({}, state, {
        rateLoading: true
      })
    }
    case actionTypes.getRateFulfilled: {
      return Object.assign({}, state, {
        rate: action.payload.result,
        currency: action.payload.currency,
        rateLoading: false
      })
    }
    case actionTypes.getRateRejected: {
      return Object.assign({}, state, {
        error: action.error,
        rateLoading: false
      })
    }
    default:
      return state
  }
}
