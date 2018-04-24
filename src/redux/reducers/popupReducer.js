import actionTypes from 'redux/actionTypes/actionTypes'

const initialState = {
  isPopupOn: false,
  popupType: '',
  popupNum: 1
}

export function popupReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.setPopupType:
      return Object.assign({}, state, {
          popupType: action.popupType
      })
    case actionTypes.setPopupNum:
      return Object.assign({}, state, {
          popupNum: action.popupNum
      })
    case actionTypes.togglePopup:
      let num;
      if (state.isPopupOn) {
        num = 1;
      } else {
        num = state.popupNum;
      }
      return Object.assign({}, state, {
          isPopupOn: !state.isPopupOn,
          popupNum: num
      })
    case actionTypes.initPopupState:
      return Object.assign({}, initialState)
    default:
      return state
  }
}
