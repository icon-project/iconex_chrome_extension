import actionTypes from 'redux/actionTypes/actionTypes';

const initialState = {
  language: 'en',
  passcodeHash: '',
  email: '',
  showNotice: true
}

export function globalReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.setLanguageFulfilled:
      return Object.assign({}, state, {
          language: action.payload
      })
    case actionTypes.setLanguageRejected:
      return state
    case actionTypes.setLockFulfilled:
      return Object.assign({}, state, {
          passcodeHash: action.payload,
          email: action.email
      })
    case actionTypes.setLockRejected:
      return state
    case actionTypes.changePasscodeHash:
      return state
    case actionTypes.changeEmail:
      return state
    case actionTypes.setShowNotice:
      return Object.assign({}, state, {
          showNotice: !state.showNotice
      })
    default:
      return state
  }
}
