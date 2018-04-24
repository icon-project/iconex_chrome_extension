import { chromeStorage } from 'utils';
import axios from 'axios';
import { checkHxPrefix, delete0xPrefix, concatTypedArrays, randomUint32 } from 'utils';
import moment from 'moment';
import BigNumber from 'bignumber.js';
import { ICX_WALLET_SERVER, ICX_TRACKER_SERVER } from 'constants/config.js';

const secp256k1 = require('secp256k1');
const sha3_256 = require('js-sha3').sha3_256;

let axiosApi = axios.create({
  baseURL: ICX_WALLET_SERVER,
  headers: {
    'Content-Type': 'application/json',
  },
})

let axiosApi2 = axios.create({
  baseURL: ICX_TRACKER_SERVER,
})

export function icx_getBalanceApi(account) {
  let param = {
    jsonrpc:"2.0",
    method:"icx_getBalance",
    id: randomUint32(),
    params:{ "address": checkHxPrefix(account) },
  }
  return new Promise(resolve => {
    axiosApi.post('/api/v2', JSON.stringify(param))
      .then(res => {
        resolve(window.web3.fromWei(new BigNumber(res.data.result.response), 'ether'))
      })
      .catch(error => {
        resolve(window.web3.fromWei(new BigNumber(0), 'ether'));
      })
  })
}

export function icx_sendCoinApi(privKey, data) {
  return new Promise(resolve => {
    const sendAmount = window.web3.toWei(new BigNumber(data.value), "ether");
    const rawTx = {
      from: data.from,
      to: data.to,
      value: window.web3.toHex(sendAmount),
      fee: "0x2386f26fc10000",
      timestamp: (new Date()).getTime().toString() + '000'
    }
    const phraseToSign = generateHashKey(rawTx);
    const hashcode = sha3_256.update(phraseToSign).hex();
    const message = new Buffer(hashcode, 'hex');
    const privateKey = new Buffer(privKey, 'hex');
    const sign = secp256k1.sign(message, privateKey);
    rawTx['tx_hash'] = hashcode;
    const recovery = new Uint8Array(1);
    recovery[0] = sign.recovery;
    const signature = concatTypedArrays(sign.signature, recovery);
    const b64encoded = btoa(String.fromCharCode.apply(null, signature));
    rawTx["signature"] = b64encoded;

    let param = {
      jsonrpc:"2.0",
      method:"icx_sendTransaction",
      params: rawTx,
      id: randomUint32()
    }
    axiosApi.post('/api/v2', JSON.stringify(param))
      .then(res => {
        resolve([true, res.data.result.tx_hash]);
      })
      .catch(error => {
        resolve([false, error]);
      })
  })
}

export function icx_fetchTransactionHistoryApi(data) {
  if (data['pendingList']) {
    return new Promise(resolve => {
      chromeStorage.get(data.account, (result) => {
          const newArr = data.pendingList.filter(function(e){return e});
          result[data.account].pendingTransaction = newArr;
          chromeStorage.set(result, () => {
              resolve({
                data: newArr
              });
          });
      });
    });
  } else {
    const _addressId = data.account || '';
    const _pageId = data.page || 1;
    return new Promise(resolve => {
      axiosApi2.get('/v0/wallet/walletDetailTxList?address=' + _addressId + '&page=' + _pageId)
        .then(res => {
          resolve({
            data: res.data.data.walletTx || [],
            total: res.data.totalData || 0
          })
        })
        .catch(error => {
          resolve({
            data: [],
            total: 0
          })
        })
    })
  }
}

export function icx_checkIcxTransactionExist(data) {
  let param = {
    jsonrpc:"2.0",
    method:"icx_getTransactionResult",
    id: randomUint32(),
    params:{ "tx_hash": delete0xPrefix(data.pendingObj.txid) },
  }

  return new Promise(resolve => {
    axiosApi.post('/api/v2', JSON.stringify(param))
      .then(res => {
        if (res.data.result.response_code === "0" && res.data.result.response.code === 0) {
          resolve('');
        } else {
          if (moment() > moment(data.pendingObj.time).add(10, 'minutes')) {
            resolve('')
          } else {
            resolve(data.pendingObj);
          }
        }
      })
      .catch(error => {
        resolve(data.pendingObj);
      })
  })
}

function generateHashKey(obj){
  let resultStr = objTraverse(obj);
  const result = 'icx_sendTransaction.' + resultStr;
  return result.slice(0, -1);
}

function objTraverse(obj){
  let result = "";
  const keys = Object.keys(obj);
  keys.sort();
  for(let i=0;i<keys.length;i++){
   if(typeof obj[keys[i]] !== 'string') {
     result += `${keys[i]}.`;
     result += objTraverse(obj[keys[i]]);
     continue;
   }
   result+=`${keys[i]}.`;
   result+=`${obj[keys[i]]}.`;
  }
  return result;
}
