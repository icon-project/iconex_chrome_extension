import actionTypes from 'redux/actionTypes/actionTypes';

export function togglePopup() {
  return {
    type: actionTypes.togglePopup
  };
}

export function setPopupType(popupType) {
  return {
    type: actionTypes.setPopupType,
    popupType: popupType
  };
}

export function setPopupNum(popupNum) {
  return {
    type: actionTypes.setPopupNum,
    popupNum: popupNum
  };
}

export function initPopupState() {
  return {
    type: actionTypes.initPopupState,
  };
}
