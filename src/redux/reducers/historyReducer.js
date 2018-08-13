import actionTypes from 'redux/actionTypes/actionTypes'

const initialState = {
  history: [],
  historyLoading: false,
  totalData: 0
}

export function historyReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.loadHistory:
      return state
    case actionTypes.addHistory:
      return state
    case actionTypes.fetchTransactionHistoryLoading: {
      return Object.assign({}, state, {
          history: [],
          historyLoading: true
      })
    }
    case actionTypes.fetchTransactionHistoryFulfilled: {
      return Object.assign({}, state, {
          history: action.payload,
          historyLoading: false,
          totalData: action.totalData
      })
    }
    case actionTypes.fetchTransactionHistoryRejected: {
      return Object.assign({}, state, {
          error: action.error,
          historyLoading: false
      })
    }
    case actionTypes.resetHistoryReducer: {
      return Object.assign({}, initialState)
    }
    default: {
      return state
    }
  }
}
