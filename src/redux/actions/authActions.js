import actionTypes from 'redux/actionTypes/actionTypes';

export function isLoggedIn() {
  return {
    type: actionTypes.initLoginCheck
  };
}

export function logIn() {
  return {
    type: actionTypes.logIn
  };
}

export function logInFulfilled() {
  return {
    type: actionTypes.logInFulfilled
  };
}

export function logOut() {
  return {
    type: actionTypes.logOut
  };
}

export function checkIsLocked(payload) {
  return {
    type: actionTypes.checkIsLocked,
    payload
  };
}

export function setUnlock() {
  return {
    type: actionTypes.setUnlock
  };
}
