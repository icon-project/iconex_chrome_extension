import actionTypes from 'redux/actionTypes/actionTypes'

const initialState = {
  totalBalance: 0,
  graphData: {},
  selectedAccount: '',
  selectedTokenId: '',
  error: ''
}

export function mainPageUIReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.setSelectedAccount:
      return Object.assign({}, state, {
          selectedAccount: action.payload
      })
    case actionTypes.setSelectedToken:
      return Object.assign({}, state, {
          selectedAccount: action.account,
          selectedTokenId: action.index
      })
    case actionTypes.resetMainPageUIReducer: {
      return Object.assign({}, initialState)
    }
    default: {
      return state
    }
  }
}
