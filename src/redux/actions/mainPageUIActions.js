import actionTypes from 'redux/actionTypes/actionTypes';

export function resetMainPageUIReducer() {
  return {
    type: actionTypes.resetMainPageUIReducer
  }
}

export function setSelectedAccount(account) {
  return {
    type: actionTypes.setSelectedAccount,
    payload: account
  };
}

export function setSelectedToken(account, index) {
  return {
    type: actionTypes.setSelectedToken,
    account,
    index
  };
}
