import actionTypes from 'redux/actionTypes/actionTypes';

export function setEXTRLogInStateForLedger(payload) {
  return {
    type: actionTypes.setEXTRLogInStateForLedger,
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
