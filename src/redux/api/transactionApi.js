import {
  eth_sendCoinApi,
  eth_sendTokenApi,
  eth_getTxFeeInfoApi
} from './walletEthApi'

import {
  icx_sendCoinApi,
  icx_sendTokenApi,
  icx_getTxFeeInfoApi
} from './walletIcxApi'

export function getTxFeeInfoApi(type, param) {
  switch(type) {
    case 'icx':
      return new Promise(resolve => {
        const result = icx_getTxFeeInfoApi();
        resolve(result);
      });
    // TODO : 이더는 coinType 받아오고 있지도 않음
    case 'eth':
    default:
      return new Promise(resolve => {
        const result = eth_getTxFeeInfoApi(param);
        resolve(result);
      });
  }
}

export function sendCoinApi(privKey, data) {
  switch(data.coinType) {
    case 'icx':
      return new Promise(resolve => {
        const result = icx_sendCoinApi(privKey, data)
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
      return new Promise(resolve => {
        const result = icx_sendTokenApi(privKey, data);
        resolve(result);
      });
    case 'eth':
      return new Promise(resolve => {
        const result = eth_sendTokenApi(privKey, data);
        resolve(result);
      });
    default:
      break;
  }
}
