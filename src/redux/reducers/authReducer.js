import actionTypes from 'redux/actionTypes/actionTypes'

const initialState = {
  initLoading: true,
  isLoggedIn: false,
  isLocked: false,
  error: '',
}

export function authReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.initLoginCheck:
      return Object.assign({}, state, {
          initLoading: true
      })
    case actionTypes.initLoginCheckFulfilled:
      return Object.assign({}, state, {
          isLoggedIn: action.payload,
          initLoading: false
      })
    case actionTypes.initLoginCheckRejected:
      return Object.assign({}, state, {
          initLoading: false,
          error: action.error
      })
    case actionTypes.logInFulfilled:
      return Object.assign({}, state, {
          isLoggedIn: true
      })
    case actionTypes.logOut:
      return Object.assign({}, state, {
          isLoggedIn: false
      })
    case actionTypes.setLockState:
      return Object.assign({}, state, {
          isLocked: action.payload
      })
    default:
      return state
  }
}
