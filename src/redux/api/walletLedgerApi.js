import axios from 'axios';
import { ICX_WALLET_SERVER } from 'constants/config.js';
import BigNumber from 'bignumber.js';

const axiosApi = axios.create({
  baseURL: ICX_WALLET_SERVER(),
  headers: {
    'Content-Type': 'application/json',
  },
})

export function icx_getBalanceApiByLedger(param) {
  return new Promise(resolve => {
    axiosApi.post('/api/v2', JSON.stringify(param))
      .then(res => {
        resolve(window.web3.fromWei(new BigNumber(res.data.result.response), 'ether').toString())
      })
      .catch(error => {
  //      alert(error)
        resolve(window.web3.fromWei(new BigNumber(0), 'ether').toString());
      })
  })
}

export function icx_sendCoinApiByLedger(param) {
  return new Promise(resolve => {
    axiosApi.post('/api/v2', JSON.stringify(param))
      .then(res => {
        if(res.data.result['response_code'] === 0) {
            resolve([true, res.data.result.tx_hash]);
        } else {
            resolve([false, res.data.result]);
        }
      })
      .catch(error => {
        resolve([false, error]);
      })
  })
}
