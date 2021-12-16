import actionTypes from 'redux/actionTypes/actionTypes';

export function fetchMyStatusData() {
  return {
    type: actionTypes.fetchMyStatusData,
  };
}

export function getStake(account) {
  return {
    type: actionTypes.getStake,
    account
  };
}

export function setStake({
  value,
}) {
  return {
    type: actionTypes.setStake,
    value,
  };
}

export function getDelegation(account) {
  return {
    type: actionTypes.getDelegation,
    account
  };
}

export function setDelegation() {
  return {
    type: actionTypes.setDelegation,
  };
}

export function getBond(account) {
  return {
    type: actionTypes.getBond,
    account
  };
}

export function setBond() {
  return {
    type: actionTypes.setBond,
  };
}

export function queryIScore(account) {
  return {
    type: actionTypes.queryIScore,
    account
  };
}

export function claimIScore() {
  return {
    type: actionTypes.claimIScore,
  };
}

export function resetPRepIissReducer() {
  return {
    type: actionTypes.resetPRepIissReducer,
  }
}