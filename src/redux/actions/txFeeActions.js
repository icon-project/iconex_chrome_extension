import actionTypes from 'redux/actionTypes/actionTypes';

export function getEstimatedTxFee(payload) {
  return {
    type: actionTypes.getEstimatedTxFee,
    payload
  };
}