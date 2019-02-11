import actionTypes from 'redux/actionTypes/actionTypes';

export function getWallet() {
  return {
    type: actionTypes.getWallet
  };
}

export function setSelectedWallet(payload) {
  return {
    type: actionTypes.setSelectedWallet,
    payload
  }
}

export function resetSelectedWallet(payload) {
  return {
    type: actionTypes.resetSelectedWallet
  }
}

export function fetchAll(payload) {
  return {
    type: actionTypes.fetchAll,
    payload
  };
}

export function fetchWalletData(account, tokens, coinType, option) {
  return {
    type: actionTypes.fetchWalletData,
    account,
    tokens,
    coinType,
    option
  };
}

export function fetchCoinBalance(account, coinType) {
  return {
    type: actionTypes.fetchCoinBalance,
    account,
    coinType
  };
}

export function fetchTokenBalance(index, address, customDecimal, account, coinType) {
  return {
    type: actionTypes.fetchTokenBalance,
    index,
    address,
    customDecimal,
    account,
    coinType
  };
}

export function updateWalletName(account, name) {
  return {
    type: actionTypes.updateWalletName,
    account,
    name
  };
}

export function updatePassword(account, priv) {
  return {
    type: actionTypes.updatePassword,
    account,
    priv
  };
}

export function setPrivKeyAndV3ForBackup(payload) {
  return {
    type: actionTypes.setPrivKeyAndV3ForBackup,
    payload
  };
}

export function getTokenInfo(address, coinType) {
  return {
    type: actionTypes.getTokenInfo,
    address,
    coinType
  };
}

export function addToken(address, tokenArr, coinType) {
  return {
    type: actionTypes.addToken,
    address,
    tokenArr,
    coinType
  };
}

export function deleteToken(account, index) {
  return {
    type: actionTypes.deleteToken,
    account,
    index
  };
}

export function updateToken(account, index, data) {
  return {
    type: actionTypes.updateToken,
    account,
    index,
    data
  };
}

export function setExportWalletObject(walletObject) {
  return {
    type: actionTypes.setExportWalletObject,
    payload: walletObject
  };
}

export function resetExportWalletState() {
  return {
    type: actionTypes.resetExportWalletState
  };
}

export function setNewPw(pw) {
  return {
    type: actionTypes.setNewPw,
    payload: pw
  };
}

export function addRecentTransaction(transactionData) {
  return {
    type: actionTypes.addRecentTransaction,
    transactionData
  };
}

export function updateWalletBalance(payload) {
  return {
    type: actionTypes.updateWalletBalance,
    payload
  };
}
