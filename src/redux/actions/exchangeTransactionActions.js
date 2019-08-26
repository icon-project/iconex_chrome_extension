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

export function setTxFeeModified(payload) {
  return {
    type: actionTypes.setTxFeeModified,
    payload
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

export function setDataType(payload) {
  return {
    type: actionTypes.setDataType,
    payload
  };
}

export function setDataError() {
  return {
    type: actionTypes.setDataError
  };
}

export function setCoinQuantity(payload, isTxFeeNeeded) {
  return {
    type: actionTypes.setCoinQuantity,
    payload,
    isTxFeeNeeded
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

export function setRecipientAddress(payload, isTxFeeNeeded) {
  return {
    type: actionTypes.setRecipientAddress,
    payload,
    isTxFeeNeeded
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

export function submitCall(payload, options = {}) {
  return {
    type: actionTypes.submitCall,
    payload,
    options
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
