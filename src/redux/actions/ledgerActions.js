import actionTypes from 'redux/actionTypes/actionTypes';

export function setLogInStateForLedger(payload) {
  return {
    type: actionTypes.setLogInStateForLedger,
    payload
  };
}

export function confirmLedger(payload) {
  return {
    type: actionTypes.confirmLedger,
    payload
  }
}

export function resetLedgerReducer() {
  return {
    type: actionTypes.resetLedgerReducer
  }
}

export function updateLedgerWalletBalance() {
  return {
    type: actionTypes.updateLedgerWalletBalance
  }
}
