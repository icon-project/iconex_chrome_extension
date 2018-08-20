import actionTypes from 'redux/actionTypes/actionTypes';

const initialState = {
  language: 'en',
  passcodeHash: '',
  showNotice: true,
  message: {
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
      })
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
    case actionTypes.setShowNotice:
      return Object.assign({}, state, {
          showNotice: !state.showNotice
      })
    case actionTypes.setScoreData:
      return {
        ...state,
        message: {
          ...state.message,
          score: {
            ...state.message.score,
            from: action.payload ? action.payload.from : '',
            param: action.payload ? action.payload.param : {}
          }
        }
      }
    case actionTypes.callScoreExternally:
      return {
        ...state,
        message: {
          ...state.message,
          score: {
            ...state.message.score,
            loading: true,
            error: ''
          }
        }
      }
    case actionTypes.callScoreExternallyFulfilled:
      return {
        ...state,
        message: {
          ...state.message,
          score: {
            ...state.message.score,
            result: action.payload,
            loading: false,
            error: ''
          }
        }
      }
    case actionTypes.callScoreExternallyRejected:
      return {
        ...state,
        message: {
          ...state.message,
          score: {
            ...state.message.score,
            loading: false,
            error: action.error
          }
        }
      }

    default:
      return state
  }
}
