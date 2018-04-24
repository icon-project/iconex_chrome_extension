import actionTypes from 'redux/actionTypes/actionTypes';

export function setEXTRPageType(payload) {
  return {
    type: actionTypes.setEXTRPageType,
    payload
  };
}

export function getTxFee(coinType, param) {
  return {
    type: actionTypes.getTxFee,
    coinType,
    param
  };
}

export function setCalcData() {
  return {
    type: actionTypes.setCalcData
  };
}

export function setGasLimit(payload) {
  return {
    type: actionTypes.setGasLimit,
    payload
  };
}

export function setGasLimitError() {
  return {
    type: actionTypes.setGasLimitError
  };
}

export function setGasPrice(payload) {
  return {
    type: actionTypes.setGasPrice,
    payload
  };
}

export function setData(payload) {
  return {
    type: actionTypes.setData,
    payload
  };
}


export function setDataError() {
  return {
    type: actionTypes.setDataError
  };
}

export function setAccountAddress(payload) {
  return {
    type: actionTypes.setAccountAddress,
    payload
  };
}

export function setEXTRLogInState(payload) {
  return {
    type: actionTypes.setEXTRLogInState,
    payload
  };
}

export function setCoinQuantity(payload) {
  return {
    type: actionTypes.setCoinQuantity,
    payload
  };
}

export function setCoinQuantityError() {
  return {
    type: actionTypes.setCoinQuantityError
  };
}

export function setRecipientAddress(payload) {
  return {
    type: actionTypes.setRecipientAddress,
    payload
  };
}

export function setRecipientAddressError() {
  return {
    type: actionTypes.setRecipientAddressError
  };
}

export function sendCall(privKey, data) {
  return {
    type: actionTypes.sendCall,
    privKey,
    data
  };
}

export function submitCall(payload) {
  return {
    type: actionTypes.submitCall,
    payload
  };
}

export function resetEXTRPageReducer() {
  return {
    type: actionTypes.resetEXTRPageReducer
  };
}

export function resetEXTRInputReducer() {
  return {
    type: actionTypes.resetEXTRInputReducer
  };
}

export function getGasInfo(data) {
  return {
    type: actionTypes.getGasInfo,
    data
  }
}
