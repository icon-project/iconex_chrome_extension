import BigNumber from 'bignumber.js';
import tx from 'ethereumjs-tx';
import { check0xPrefix, makeEthRawTx, calcGasPrice } from 'utils';
import { ethToken } from 'constants/ethToken.js'
import { erc20Abi } from 'constants/index'

BigNumber.config({ ERRORS: false });
BigNumber.config({ EXPONENTIAL_AT: 1e+9 })

function getTxFeeInfo(data) {
  return new Promise (resolve => {
    window.web3.eth.getGasPrice((errorPrice, gasPrice) => {
      window.web3.eth.estimateGas(data, (errorLimit, gasLimit) => {
        const { isToken } = data
        const result = {
          txFeePrice: !gasPrice ? 21 : calcGasPrice(gasPrice),
          txFeeLimit: !gasLimit ? (isToken ? 55000 : 21000) : gasLimit * 2
        }
        resolve(result)
      })
    })
  })
}

export function eth_getTxFeeInfoApi(data) {
  return new Promise(resolve => {
    const result = getTxFeeInfo(data)
    resolve(result)
  })
}

export function eth_fetchCoinBalanceApi(account) {
  return new Promise((resolve, reject) => {
     window.web3.eth.getBalance(check0xPrefix(account), (error, balance) => {
       if (error) {
      //   resolve(window.web3.fromWei(new BigNumber(0), 'ether'))
         resolve('error')
       }
       resolve(window.web3.fromWei(balance, 'ether'))
     })
  });
}

/**
 * currently not in use
 * https://ethereum.stackexchange.com/questions/18652/does-a-token-transfer-always-have-a-value-of-zero
*/
export function eth_fetchTransactionHistoryApi(data) {
  return new Promise(resolve => {
      let myaccount = check0xPrefix(data.account);
      let result = [];
      // coin
      if (!data.tokenAddress) {
        window.web3.eth.getBlock(data.blockNumber, true, (err, block) => {
          if (block != null && block.transactions != null) {
            block.transactions.forEach( function(e) {
              if (myaccount === e.from || myaccount === e.to) {
                const obj = {
                  txid: e.hash,
                  from: e.from,
                  to: e.to,
                  time: block.timestamp + " " + new Date(block.timestamp * 1000).toGMTString(),
                  value: window.web3.fromWei(e.value, "ether"),
                  isUp: e.from === myaccount ? false : true
                }
                result.unshift(obj);
              }
            })
            resolve(result);
          } else {
            resolve(result);
          }
        });
      // token
      } else {
        data.tokenAddress = check0xPrefix(data.tokenAddress);
        window.web3.eth.getBlock(data.blockNumber, true, (err, block) => {
          if (block != null && block.transactions != null) {
            block.transactions.forEach( function(e) {
              const toAccount = check0xPrefix(e.input.slice(34, 74));
              if ((myaccount === e.from && data.tokenAddress === e.to) || (myaccount === toAccount && data.tokenAddress === e.to)) {
                if (e.input.length < 4) {
                  const obj = {
                    txid: e.hash,
                    from: e.from,
                    to: e.to,
                    time: block.timestamp + " " + new Date(block.timestamp * 1000).toGMTString(),
                    value: window.web3.fromWei(e.value, "ether"),
                    isUp: true
                  }
                  result.unshift(obj);
                } else {
                  let value = e.input.slice(75);
                  value = value.replace(/^0+/, '');
                  value = parseInt(value, 16);
                  const obj = {
                    txid: e.hash,
                    from: e.from,
                    to: e.to,
                    time: block.timestamp + " " + new Date(block.timestamp * 1000).toGMTString(),
                    value: window.web3.fromWei(value, "ether"),
                    isUp: e.from === myaccount ? false : true
                  }
                  result.unshift(obj);
                }
              }
            })
            resolve(result);
          } else {
            resolve(result);
          }
        });
      }
  });
}

export function eth_getTransactionReceiptApi(tx) {
  return new Promise(resolve => {
    const receipt = window.web3.eth.getTransactionReceipt(tx.txid);
    tx['status'] = receipt.status === '0x0' ? 'fail' : 'success';
    resolve(tx);
  });
}

/**
 * Get token data such as symbol, default name, and default decimals.
 * Call data-fetching function to ether network first, if no result,
 * then search MyEtherWallet token list object.
 * @param {Object} tokenObj: { address }
 * @return {Object} result: { address, name, symbol, decimals, createdAt, recent }
 * https://blog.w3k.it/using-an-ethereum-node-to-build-a-web3-js-app-which-interacts-with-erc20-token-contracts-923f65e2d2eb
*/
export function eth_getTokenInfoApi(tokenObj) {
  return new Promise(resolve => {
    let token = window.web3.eth.contract(erc20Abi).at(check0xPrefix(tokenObj.address));
		token.decimals.call((err, decimals) => {
      token.symbol.call((err, symbol) => {
  			token.name.call((err, name) => {
          if (err || !symbol || !name) {
            const tokenInfo = ethToken.filter((token) => {
              return token.address.toLowerCase() === check0xPrefix(tokenObj.address).toLowerCase()
            });
            if (tokenInfo.length > 0) {
              const result = Object.assign({}, tokenObj, {
                defaultName: '',
                defaultSymbol: tokenInfo[0].symbol,
                defaultDecimals: tokenInfo[0].decimal,
                recent: [],
                createdAt: Date.now().toString()
              })
              resolve(result)
            } else {
              const result = Object.assign({}, tokenObj, {
                defaultName: '',
                defaultSymbol: '',
                defaultDecimals: '',
                recent: [],
                createdAt: Date.now().toString()
              })
    					resolve(result);
            }
          } else {
            const result = Object.assign({}, tokenObj, {
              defaultName: name,
              defaultSymbol: symbol,
              defaultDecimals: decimals.toNumber(),
              recent: [],
              createdAt: Date.now().toString()
            })
  					resolve(result);
          }
        });
      });
    });
  });
}

export function eth_fetchTokenBalanceApi(tokenAddress, customDecimal, account) {
  return new Promise((resolve, reject) => {
    let token = window.web3.eth.contract(erc20Abi).at(check0xPrefix(tokenAddress));
      token.balanceOf.call(check0xPrefix(account), (err, balance) => {
				// update the UI to reflect the data returned from the blockchain
        if (err) {
          resolve('error');
        }
				let divisor = new BigNumber(10).toPower(customDecimal);
				balance = balance.div(divisor);
				resolve(balance);
    });
  });
}

// https://ethereum.stackexchange.com/questions/12054/can-not-send-eth-on-ropsten-using-infura-node
export function eth_sendCoinApi(privKey, data) {
  return new Promise((resolve, reject) => {
    window.web3.eth.getTransactionCount(
      check0xPrefix(data.from), function(nonceErr, txCount) {
        const rawTx = makeEthRawTx(false, data)
        rawTx['nonce'] = window.web3.toHex(txCount)
        const privateKey = new Buffer(privKey, 'hex');
        const transaction = new tx(rawTx);
        transaction.sign(privateKey);
        const serializedTx = transaction.serialize().toString('hex');
        window.web3.eth.sendRawTransaction(
            check0xPrefix(serializedTx), function(err, result) {
                if(err || nonceErr) {
                  console.log(err)
                  reject(err);
                } else {
                    resolve(result);
                }
             }
        );
      }
    )
  });
}

// https://ethereum.stackexchange.com/questions/24828/how-to-send-erc20-token-using-web3-api
export function eth_sendTokenApi(privKey, data) {
  return new Promise((resolve, reject) => {
    window.web3.eth.getTransactionCount(
      check0xPrefix(data.from), function(nonceErr, txCount) {
        const rawTx = makeEthRawTx(true, data)
        rawTx['nonce'] = window.web3.toHex(txCount)
        const privateKey = new Buffer(privKey, 'hex');
        const transaction = new tx(rawTx);
        transaction.sign(privateKey);
        const serializedTx = transaction.serialize().toString('hex');
        window.web3.eth.sendRawTransaction(
            check0xPrefix(serializedTx), function(err, result) {
              if(err || nonceErr) {
                  console.log(err)
                  reject(err);
              } else {
                  resolve(result);
              }
            }
        );
      }
    )
  })
}
