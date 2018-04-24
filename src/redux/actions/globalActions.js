import actionTypes from 'redux/actionTypes/actionTypes';

export function setLanguage(lan) {
  return {
    type: actionTypes.setLanguage,
    payload: lan
  };
}

export function setSelectedAccount(account) {
  return {
    type: actionTypes.setSelectedAccount,
    payload: account
  };
}

export function setSelectedToken(account, index) {
  return {
    type: actionTypes.setSelectedToken,
    account,
    index
  };
}

export function setLock(passcodeHash, email) {
  return {
    type: actionTypes.setLock,
    passcodeHash,
    email
  };
}

export function changePasscodeHash(payload) {
  return {
    type: actionTypes.changePasscodeHash,
    payload
  };
}

export function changeEmail(payload) {
  return {
    type: actionTypes.changeEmail,
    payload
  };
}

export function setShowNotice() {
  return {
    type: actionTypes.setShowNotice
  }
}
