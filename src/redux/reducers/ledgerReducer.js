import actionTypes from 'redux/actionTypes/actionTypes'

const initialState = {
  isLedger: false,
  ledgerWallet: {},
  isLedgerConfirmed: false,
  ledgerSignedRawTx: ''
}

export function ledgerReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.setEXTRLogInStateForLedger: {
      return Object.assign({}, state, {
          isLedger: action.payload.isLoggedIn,
          ledgerWallet: action.payload.ledgerWallet
      })
    }
    case actionTypes.confirmLedger: {
      return Object.assign({}, state, {
          isLedgerConfirmed: true,
          ledgerSignedRawTx: action.payload
      })
    }
    case actionTypes.resetLedgerReducer:
    case actionTypes.resetEXTRInputReducer:
      return Object.assign({}, state, {
          isLedgerConfirmed: false,
          ledgerSignedRawTx: ''
      })
    case actionTypes.resetEXTRPageReducer:
      return Object.assign({}, initialState)
    default:
      return state
  }
}
