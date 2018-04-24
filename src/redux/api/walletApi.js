import { chromeStorage } from 'utils';
import Wallet from 'lib/ethjs-wallet';
import { isEmpty, check0xPrefix, checkHxPrefix } from 'utils';
import {
  eth_fetchCoinBalanceApi,
  eth_fetchTokenBalanceApi,
  eth_fetchTransactionHistoryApi,
  eth_getTransactionReceiptApi,
  eth_getTokenInfoApi,
  eth_isExistTokenApi,
} from './walletEthApi'

import {
  icx_getBalanceApi,
  icx_fetchTransactionHistoryApi
} from './walletIcxApi'

export function fetchCoinBalanceApi(account, type) {
  switch(type) {
    case 'icx':
      return new Promise(resolve => {
        const result = icx_getBalanceApi(account);
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
      break;
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
  switch(data.coinType) {
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

export function isExistTokenApi(address, type) {
  switch(type) {
    case 'icx':
      break;
    case 'eth':
      return new Promise(resolve => {
        const result = eth_isExistTokenApi(address);
        resolve(result);
      });
    default:
      break;
  }
}

export function getTokenInfoApi(address, type) {
  switch(type) {
    case 'icx':
      break;
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

export function addTokenApi(account, token, type) {
  return new Promise(resolve => {
    let tokenInfo;
    switch(type) {
      case 'icx':
        break;
      case 'eth':
        tokenInfo = eth_getTokenInfoApi(token);
        break;
      default:
        break;
    }
    resolve(tokenInfo);
  }).then((tokenInfo) => {
    return new Promise(resolve => {
      chromeStorage.get(account, (result) => {
          const tokenId = tokenInfo.address;
          result[account].tokens[tokenId] = tokenInfo;
          chromeStorage.set(result, () => {
              resolve(true);
          });
      });
    })
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
   * @param {String} account
   * @param {String} tokenIndex: token address
   * @param {Object} transactionData: tx data
   * @return {Array} result: recent tx array
*/
export function addRecentTransactionApi(account, tokenIndex, transactionData) {
  tokenIndex = check0xPrefix(tokenIndex);
  return new Promise(resolve => {
    chromeStorage.get(account, (result) => {
      const oldRecent = tokenIndex ? result[account].tokens[tokenIndex].recent : result[account].recent;
      if (transactionData.type === 'icx') transactionData.address = checkHxPrefix(transactionData.address)
      else transactionData.address = check0xPrefix(transactionData.address)
      if (!tokenIndex) {
        result[account].recent = [transactionData, ...oldRecent]
        result[account].recent = result[account].recent.slice(0, 30)
      } else {
        result[account].tokens[tokenIndex].recent = [transactionData, ...oldRecent]
        result[account].tokens[tokenIndex].recent = result[account].tokens[tokenIndex].recent.slice(0, 30)
      }
      if (transactionData.type === 'icx') {
        if(!result[account]['pendingTransaction']) {
          result[account]['pendingTransaction'] = []
        }
        const oldPendingTransaction = result[account].pendingTransaction;
        result[account].pendingTransaction = [transactionData, ...oldPendingTransaction]
        result[account].pendingTransaction = result[account].pendingTransaction.slice(0, 30)
      }
      chromeStorage.set(result, () => {
        resolve(result);
      });
    });
  })
}
