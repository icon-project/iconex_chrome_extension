import actionTypes from 'redux/actionTypes/actionTypes';

export function setCurrency(currency) {
  return {
    type: actionTypes.setCurrency,
    currency
  };
}

export function getRate(currency, wallets) {
  return {
    type: actionTypes.getRate,
    currency,
    wallets
  };
}
