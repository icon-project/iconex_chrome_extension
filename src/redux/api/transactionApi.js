import {
  eth_sendCoinApi,
  eth_sendTokenApi,
  eth_getGasInfoApi
} from './walletEthApi'

import {
  icx_sendCoinApi
} from './walletIcxApi'

export function getTxFeeApi(type, param) {
  switch(type) {
    case 'icx':
      return 0
    case 'eth':
      return new Promise(resolve => {
        const result = {};
        resolve(result);
      });
    default:
      break;
  }
}

export function getGasInfoApi(type, param) {
  switch(type) {
    case 'icx':
      return 0
    case 'eth':
    default:
      return new Promise(resolve => {
        const result = eth_getGasInfoApi(param);
        resolve(result);
      });
  }
}

export function sendCoinApi(privKey, data) {
  switch(data.coinType) {
    case 'icx':
      return new Promise(resolve => {
        const result = icx_sendCoinApi(privKey, data);
        resolve(result);
      });
    case 'eth':
      return new Promise(resolve => {
        const result = eth_sendCoinApi(privKey, data);
        resolve(result);
      });
    default:
      break;
  }
}

export function sendTokenApi(privKey, data) {
  switch(data.coinType) {
    case 'icx':
      break;
    case 'eth':
      return new Promise(resolve => {
        const result = eth_sendTokenApi(privKey, data);
        resolve(result);
      });
    default:
      break;
  }
}
