import { chromeStorage } from 'utils';
import Wallet from 'lib/ethjs-wallet';
import { isEmpty, check0xPrefix, checkCxPrefix, checkHxPrefix } from 'utils';
import {
  eth_fetchCoinBalanceApi,
  eth_fetchTokenBalanceApi,
  eth_fetchTransactionHistoryApi,
  eth_getTransactionReceiptApi,
  eth_getTokenInfoApi,
} from './walletEthApi'

import {
  icx_fetchCoinBalanceApi,
  icx_fetchTokenBalanceApi,
  icx_fetchTransactionHistoryApi,
  icx_getTokenInfoApi
} from './walletIcxApi'

export function fetchCoinBalanceApi(account, type) {
  switch(type) {
    case 'icx':
      return new Promise(resolve => {
        const result = icx_fetchCoinBalanceApi(account);
        resolve(result)
      })
    case 'eth':
      return new Promise(resolve => {
        const result = eth_fetchCoinBalanceApi(account);
        resolve(result);
      });
    default:
      break;
  }
}

export function fetchTokenBalanceApi(address, customDecimal, account, type) {
  switch(type) {
    case 'icx':
      return new Promise(resolve => {
        const result = icx_fetchTokenBalanceApi(address, customDecimal, account);
        resolve(result)
      })
    case 'eth':
      return new Promise(resolve => {
        const result = eth_fetchTokenBalanceApi(address, customDecimal, account);
        resolve(result);
      });
    default:
      break;
  }
}

export function getBlockNumberApi(type) {
  switch(type) {
    case 'icx':
      break;
    case 'eth':
      return new Promise(resolve => {
         window.web3.eth.getBlockNumber((err, block) => {
           resolve(block);
         })
      });
    default:
      break;
  }
}

export function fetchTransactionHistoryApi(data) {
  switch(data.walletCoinType) {
    case 'icx':
      return new Promise(resolve => {
        const result = icx_fetchTransactionHistoryApi(data)
        resolve(result);
      });
    case 'eth':
      return new Promise(resolve => {
        const result = eth_fetchTransactionHistoryApi(data);
        resolve(result);
      });
    default:
      break;
  }
}

export function getTransactionReceiptApi(tx, type) {
  switch(type) {
    case 'icx':
      break;
    case 'eth':
      return new Promise(resolve => {
        const result = eth_getTransactionReceiptApi(tx);
        resolve(result);
      });
    default:
      break;
  }
}

export function getTokenInfoApi(address, type) {
  switch(type) {
    case 'icx':
      return (async () => {
        const { result, error } = await icx_getTokenInfoApi({address});
        if (error) throw new Error(error);
        console.log(result)
        return result;
      })();
    case 'eth':
      return new Promise(resolve => {
        const result = eth_getTokenInfoApi({address});
        resolve(result);
      });
    default:
      break;
  }
}

/**
   * generate wallet object
   * @param {String} pw: password
   * @param {String} type: coin type (ICX, ETH)
   * @return {Array} [wallet object, address, private key, password]
*/
export function generateWalletApi(pw, type) {
    switch(type) {
      case 'icx':
        return new Promise(resolve => {
          let wallet = Wallet.generate();
          return resolve(wallet);
        }).then((wallet) => {
          let address = wallet.getAddressIcx().toString('hex');
          let privKey = wallet.getPrivateKey().toString('hex');
          return [wallet, address, privKey, pw];
        });
      case 'eth':
        return new Promise(resolve => {
          let wallet = Wallet.generate();
          return resolve(wallet);
        }).then((wallet) => {
          let address = check0xPrefix(wallet.getAddress().toString('hex'));
          let privKey = wallet.getPrivateKey().toString('hex');
          return [wallet, address, privKey, pw];
        });
      default:
        break;
    }
}

export function createWalletApi(walletObject) {
  return new Promise(resolve => {
    chromeStorage.set(walletObject, () => {
      resolve(true);
    })
  })
}

export function getWalletApi() {
  return new Promise(resolve => {
    chromeStorage.get(null, (array) => {
      resolve(array);
    })
  })
}

export function deleteWalletApi(address) {
  return new Promise(resolve => {
    chromeStorage.remove(address, () => {
      resolve(true);
    })
  })
}

export function updateWalletNameApi(account, newName) {
  return new Promise(resolve => {
    chromeStorage.get(account, (result) => {
        result[account].name = newName
        chromeStorage.set(result, () => {
            resolve(true);
        });
    });
  })
}

export function updatePasswordApi(account, priv) {
  return new Promise(resolve => {
    chromeStorage.get(account, (result) => {
        result[account].priv = priv
        chromeStorage.set(result, () => {
            resolve(true);
        });
    });
  })
}

export function addTokenApi(account, tokenInfo, type) {
  return new Promise(resolve => {
    chromeStorage.get(account, (result) => {
        const tokenId = tokenInfo.address;
        result[account].tokens[tokenId] = tokenInfo;
        chromeStorage.set(result, () => {
            resolve(true);
        });
    });
  })
}

export function deleteTokenApi(address, index) {
  return new Promise(resolve => {
    chromeStorage.get(address, (result) => {
        let tokens = result[address].tokens;
        delete tokens[index];
        result[address].tokens = tokens;
        chromeStorage.set(result, () => {
            resolve(true);
        });
    });
  })
}

export function updateTokenApi(account, index, data) {
  return new Promise(resolve => {
    chromeStorage.get(account, (result) => {
        result[account].tokens[index] = Object.assign({}, result[account].tokens[index], data);
        chromeStorage.set(result, () => {
            resolve(true);
        });
    });
  })
}

export function isWalletExistApi() {
  return new Promise(resolve => {
    chromeStorage.get(null, (data) => {
      const result = isEmpty(data) ? false : true
      resolve(result);
    });
  })
}

/**
   * add transaction log in 'Recent Tx' section
   * @param {Object} transactionData: tx data
   * @return {Array} result: recent tx array
*/
export function addRecentTransactionApi(transactionData) {
  const { contractAddress, type, from, pending, recent } = transactionData;

  const updatePendingTransaction = (obj) => {
    if(!obj['pendingTransaction']) {
      obj['pendingTransaction'] = []
    }
    const oldPendingTransaction = obj.pendingTransaction;
    obj.pendingTransaction = [pending, ...oldPendingTransaction]
    obj.pendingTransaction = obj.pendingTransaction.slice(0, 5)
    return obj
  }

  const tokenId = contractAddress
                    ? (type === 'icx'
                        ? checkCxPrefix(contractAddress)
                        : check0xPrefix(contractAddress))
                    : ''

  return new Promise(resolve => {
    chromeStorage.get(from, (result) => {
      if (!tokenId) {
        result[from].recent = [{ time: recent.time }]
        if (type === 'icx') result[from] = updatePendingTransaction(result[from])
      } else {
        result[from].tokens[tokenId].recent = [{ time: recent.time }]
        if (type === 'icx') result[from].tokens[tokenId] = updatePendingTransaction(result[from].tokens[tokenId])
      }
      chromeStorage.set(result, () => {
        resolve(result);
      });
    });
  })
}
