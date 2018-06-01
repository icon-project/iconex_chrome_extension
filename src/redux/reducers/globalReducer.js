import actionTypes from 'redux/actionTypes/actionTypes';

const initialState = {
  language: 'en',
  passcodeHash: '',
  email: '',
  showNotice: true,
  message: {
    isAppOpenedByPopup: false,
    showChangePasscodePopup: false,
    isRequestedStatus: false,
    transaction: {}
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
          email: action.email
      })
    case actionTypes.setIsAppOpenedByPopup: {
      const message = Object.assign({}, state.message, {
          isAppOpenedByPopup: action.payload
      });
      return Object.assign({}, state, {
          message: message
      })
    }
    case actionTypes.setShowChangePasscodePopup: {
      const message = Object.assign({}, state.message, {
          showChangePasscodePopup: action.payload
      });
      return Object.assign({}, state, {
          message: message
      })
    }
    case actionTypes.setIsRequestedStatus: {
      const message = Object.assign({}, state.message, {
          isRequestedStatus: action.payload
      });
      return Object.assign({}, state, {
          message: message
      })
    }
    case actionTypes.setTransactionStatus: {
      const message = Object.assign({}, state.message, {
          transaction: action.payload || {}
      });
      return Object.assign({}, state, {
          message: message
      })
    }
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
