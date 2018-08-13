import actionTypes from 'redux/actionTypes/actionTypes'

const initialState = {
  isPopupOn: false,
  popupType: '',
  popupNum: 1
}

export function popupReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.openPopup:
      return Object.assign({}, state, {
          popupType: action.payload.popupType,
          popupNum: action.payload.popupNum || 1,
          isPopupOn: true
      })
    case actionTypes.setPopupNum:
      return Object.assign({}, state, {
          popupNum: action.popupNum
      })
    case actionTypes.closePopup:
      return Object.assign({}, initialState)
    default:
      return state
  }
}
