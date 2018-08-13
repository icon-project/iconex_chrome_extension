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

export function fetchRecentHistory() {
  return {
    type: actionTypes.fetchRecentHistory
  };
}

export function fetchTransactionHistory(payload) {
  return {
    type: actionTypes.fetchTransactionHistory,
    payload
  };
}

export function resetHistoryReducer() {
  return {
    type: actionTypes.resetHistoryReducer
  };
}
