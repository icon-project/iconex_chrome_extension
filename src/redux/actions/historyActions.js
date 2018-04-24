import actionTypes from 'redux/actionTypes/actionTypes';

export function loadHistory(payload) {
  return {
    type: actionTypes.loadHistory,
    payload
  };
}

export function addHistory(payload) {
  return {
    type: actionTypes.addHistory,
    payload
  };
}

export function fetchTransactionHistory(account, data) {
  return {
    type: actionTypes.fetchTransactionHistory,
    account,
    data,
  };
}

export function resetHistoryReducer() {
  return {
    type: actionTypes.resetHistoryReducer
  };
}
