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

export function setLockState(payload) {
  return {
    type: actionTypes.setLockState,
    payload
  };
}