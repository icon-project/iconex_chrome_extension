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

export function setIsRequestedStatus(payload) {
  return {
    type: actionTypes.setIsRequestedStatus,
    payload
  }
}

export function setTransactionStatus(payload) {
  return {
    type: actionTypes.setTransactionStatus,
    payload
  }
}

export function changeServer(payload) {
  return {
    type: actionTypes.changeServer,
    payload
  };
}

export function setScoreData(payload) {
  return {
    type: actionTypes.setScoreData,
    payload
  };
}

export function callScoreExternally(payload) {
  return {
    type: actionTypes.callScoreExternally,
    payload
  }
}

export function setSigningData(payload) {
  return {
    type: actionTypes.setSigningData,
    payload
  };
}