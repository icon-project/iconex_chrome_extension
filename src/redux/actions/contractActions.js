import actionTypes from 'redux/actionTypes/actionTypes';

export function setContractAddress(payload) {
  return {
    type: actionTypes.setContractAddress,
    payload
  };
}

export function fetchAbi(payload) {
  return {
    type: actionTypes.fetchAbi,
    payload
  };
}

export function setFuncList(payload) {
  return {
    type: actionTypes.setFuncList,
    payload
  };
}

export function setFuncIndex(payload) {
  return {
    type: actionTypes.setFuncIndex,
    payload
  };
}

export function handleFuncInputChange(payload) {
  return {
    type: actionTypes.handleFuncInputChange,
    payload
  };
}

/*
  payload = {
    name, type, error
  }
*/
export function setFuncInputError(payload) {
  return {
    type: actionTypes.setFuncInputError,
    payload
  };
}

export function setContractAddressError() {
  return {
    type: actionTypes.setContractAddressError
  };
}

export function getAbiByContractAddress(payload) {
  return {
    type: actionTypes.getAbiByContractAddress,
    payload
  };
}

export function checkContractInputError() {
  return {
    type: actionTypes.checkContractInputError,
  };
}

export function executeFunc() {
  return {
    type: actionTypes.executeFunc
  };
}

export function resetContractPageReducer() {
  return {
    type: actionTypes.resetContractPageReducer
  };
}

export function resetContractInputOutput() {
  return {
    type: actionTypes.resetContractInputOutput
  };
}
