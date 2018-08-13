import actionTypes from 'redux/actionTypes/actionTypes';

export function setCalcData() {
  return {
    type: actionTypes.setCalcData
  };
}

export function setWalletSelectorError() {
  return {
    type: actionTypes.setWalletSelectorError
  };
}

export function setTxFeeLimit(payload) {
  return {
    type: actionTypes.setTxFeeLimit,
    payload
  };
}

export function setTxFeeLimitError() {
  return {
    type: actionTypes.setTxFeeLimitError
  };
}

export function setContractTxFeeLimitError() {
  return {
    type: actionTypes.setContractTxFeeLimitError
  };
}

export function setTxFeePrice(payload) {
  return {
    type: actionTypes.setTxFeePrice,
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

export function toggleFullBalance(payload) {
  return {
    type: actionTypes.toggleFullBalance,
    payload
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

export function sendCall(privKey, data, isLedger = false) {
  return {
    type: actionTypes.sendCall,
    privKey,
    data,
    isLedger
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

export function getTxFeeInfo(data) {
  return {
    type: actionTypes.getTxFeeInfo,
    data
  }
}

export function updateStepLimit(payload) {
  return {
    type: actionTypes.updateStepLimit,
    payload
  }
}
