import actionTypes from 'redux/actionTypes/actionTypes';

const initialState = {
  language: 'en',
  passcodeHash: '',
  showNotice: true,
  message: {
    showChangePasscodePopup: false,
  },
}

export function globalReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.setLanguage:
      return Object.assign({}, state, {
        language: action.payload
      })
    case actionTypes.setLockFulfilled:
      return Object.assign({}, state, {
        passcodeHash: action.payload,
      })
    case actionTypes.setShowChangePasscodePopup: {
      const message = Object.assign({}, state.message, {
        showChangePasscodePopup: action.payload
      });
      return Object.assign({}, state, {
        message: message
      })
    }
    case actionTypes.setLockRejected:
      return state
    case actionTypes.changePasscodeHash:
      return state
    case actionTypes.setShowNotice:
      return Object.assign({}, state, {
        showNotice: !state.showNotice
      })

    default:
      return state
  }
}
