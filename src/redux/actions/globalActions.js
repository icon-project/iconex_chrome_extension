import actionTypes from 'redux/actionTypes/actionTypes';

export function setLanguage(lan) {
  return {
    type: actionTypes.setLanguage,
    payload: lan
  };
}

export function setLock(passcodeHash) {
  return {
    type: actionTypes.setLock,
    passcodeHash
  };
}

export function changePasscodeHash(payload) {
  return {
    type: actionTypes.changePasscodeHash,
    payload
  };
}

export function setShowNotice() {
  return {
    type: actionTypes.setShowNotice
  }
}

export function setShowChangePasscodePopup(payload) {
  return {
    type: actionTypes.setShowChangePasscodePopup,
    payload
  }
}

export function changeServer(payload) {
  return {
    type: actionTypes.changeServer,
    payload
  };
}
