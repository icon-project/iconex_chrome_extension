import actionTypes from 'redux/actionTypes/actionTypes';

export function setWalletName(payload) {
  return {
    type: actionTypes.setWalletName,
    payload
  };
}

export function setCoinType(payload) {
  return {
    type: actionTypes.setCoinType,
    payload
  };
}

export function createWallet(walletObject) {
  return {
    type: actionTypes.createWallet,
    walletObject
  };
}

export function createWallets(walletObjects) {
  return {
    type: actionTypes.createWallets,
    walletObjects
  };
}

export function deleteWallet(address) {
  return {
    type: actionTypes.deleteWallet,
    address
  };
}

export function generateWallet(walletName, pw, coinType) {
  return {
    type: actionTypes.generateWallet,
    walletName,
    pw,
    coinType
  };
}

export function setIconexObject(object) {
  return {
    type: actionTypes.setIconexObject,
    payload: object
  };
}

// save v3 object in store (ImportWallet3: Import Private Key)
export function setV3Object(object) {
  return {
    type: actionTypes.setV3Object,
    payload: object
  }
}

export function setWalletObject(payload) {
  return {
    type: actionTypes.setWalletObject,
    payload
  };
}

export function resetInfo() {
  return {
    type: actionTypes.resetInfo
  };
}

export function resetSignupReducer() {
  return {
    type: actionTypes.resetSignupReducer
  };
}

export function setAddress(payload) {
  return {
    type: actionTypes.setAddress,
    payload
  };
}
