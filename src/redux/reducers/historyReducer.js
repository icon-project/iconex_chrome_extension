import actionTypes from 'redux/actionTypes/actionTypes'

const initialState = {
  history: [],
  historyLoading: true,
  startBlock: 0,
  endBlock: 0,
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
          startBlock: action.startBlock,
          endBlock: action.endBlock,
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
