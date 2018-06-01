import actionTypes from 'redux/actionTypes/actionTypes'
import update from 'react-addons-update';

const initialState = {
  wallets: {},
  walletsLoading: true,
  totalResultLoading: true,
  rate: {},
  rateLoading: true,
  currency: 'usd',
  _06_privateKey: '', // 06 BACKUP WALLETS,
  _06_v3: '', // 06 BACKUP WALLETS
  _07_isExistToken: false, // 07 ADD TOKENS
  _07_isExistTokenLoading: true,
  _07_tokenInfo: {},
  _07_tokenInfoLoading: false,
  _09_exportWalletObjects: {}, // 09 EXPORT WALLETS
  _09_newPw: '',
  error: ''
}

export function walletReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.getWalletLoading: {
      return Object.assign({}, state, {
          walletsLoading: true
      })
    }
    case actionTypes.getWalletFulfilled: {
      let result = {};
      let keys = Object.keys(action.payload);
      let values = Object.values(action.payload);
      for(let i=0; i<keys.length; i++) {
        const tokensValues = Object.values(values[i].tokens);
        for(let v=0; v<tokensValues.length; v++) {
          const newTokenObject = Object.assign({}, {
            balance: 0,
            balanceLoading: true,
            recent: []
          }, tokensValues[v])
          values[i].tokens[tokensValues[v].address] = newTokenObject
        }
        result[keys[i]] = Object.assign({}, {
          account: keys[i],
          balance: 0,
          balanceLoading: true,
          recent: []
        }, values[i]);
      }
      return Object.assign({}, state, {
          wallets: result,
          walletsLoading: false
      })
    }
    case actionTypes.getWalletRejected: {
      return Object.assign({}, state, {
          error: action.error,
          walletsLoading: false
      })
    }
    case actionTypes.setExportWalletObject: {
      return Object.assign({}, state, {
          _09_exportWalletObjects: action.payload
      })
    }
    case actionTypes.setNewPw: {
      return Object.assign({}, state, {
          _09_newPw: action.payload
      })
    }
    case actionTypes.resetExportWalletState: {
      return Object.assign({}, state, {
        _09_exportWalletObjects: {},
        _09_newPw: '',
      })
    }
    case actionTypes.setPrivKeyAndV3ForBackup: {
      return Object.assign({}, state, {
          _06_privateKey: action.payload.privKey,
          _06_v3: action.payload.v3,
      })
    }
    case actionTypes.isExistToken: {
      return Object.assign({}, state, {
        _07_isExistToken: false,
        _07_isExistTokenLoading: true
      })
    }
    case actionTypes.isExistTokenFulfilled: {
      return Object.assign({}, state, {
        _07_isExistToken: action.payload,
        _07_isExistTokenLoading: false
      })
    }
    case actionTypes.isExistTokenRejected: {
      return Object.assign({}, state, {
        _07_isExistToken: false,
        _07_isExistTokenLoading: false
      })
    }
    case actionTypes.resetAddTokenState: {
      return Object.assign({}, state, {
        _07_isExistToken: false,
        _07_isExistTokenLoading: true,
      })
    }
    case actionTypes.getTokenInfo: {
      return Object.assign({}, state, {
        _07_tokenInfo: {},
        _07_tokenInfoLoading: true
      })
    }
    case actionTypes.getTokenInfoFulfilled: {
      return Object.assign({}, state, {
        _07_tokenInfo: action.payload,
        _07_tokenInfoLoading: false
      })
    }
    case actionTypes.getTokenInfoRejected: {
      return Object.assign({}, state, {
        _07_tokenInfoLoading: false
      })
    }
    case actionTypes.fetchCoinBalanceLoading: {
      return update(state, {
        wallets: {
          [action.account]: {
            balanceLoading: {$set: true}
          }
        }
      });
    }
    case actionTypes.fetchCoinBalanceFulfilled: {
      return update(state, {
        wallets: {
          [action.account]: {
            balance: {$set: action.balance},
            balanceLoading: {$set: false}
          }
        }
      });
    }
    case actionTypes.fetchCoinBalanceRejected: {
      return update(state, {
        error: action.error,
        wallets: {
          [action.account]: {
            balanceLoading: {$set: false}
          }
        }
      });
    }
    case actionTypes.fetchTokenBalanceLoading: {
      return update(state, {
        wallets: {
          [action.account]: {
            tokens: {
              [action.index]: {
                balanceLoading: {$set: true}
              }
            }
          }
        }
      });
    }
    case actionTypes.fetchTokenBalanceFulfilled: {
      return update(state, {
        wallets: {
          [action.account]: {
            tokens: {
              [action.index]: {
                balance: {$set: action.balance},
                balanceLoading: {$set: false}
              }
            }
          }
        }
      });
    }
    case actionTypes.fetchTokenBalanceRejected: {
      return update(state, {
        error: {$set: action.error},
        wallets: {
          [action.account]: {
            tokens: {
              [action.index]: {
                balanceLoading: {$set: false}
              }
            }
          }
        }
      });
    }
    case actionTypes.totalResultLoading: {
      return Object.assign({}, state, {
          totalResultLoading: true
      })
    }
    case actionTypes.totalResultFulfilled: {
      return Object.assign({}, state, {
          totalResultLoading: false
      })
    }
    case actionTypes.setCurrency: {
      return Object.assign({}, state, {
          currency: action.currency
      })
    }
    case actionTypes.getRateLoading: {
      return Object.assign({}, state, {
          rateLoading: true
      })
    }
    case actionTypes.getRateFulfilled: {
      return Object.assign({}, state, {
          rate: action.payload.result,
          currency: action.payload.currency,
          rateLoading: false
      })
    }
    case actionTypes.getRateRejected: {
      return Object.assign({}, state, {
          error: action.error,
          rateLoading: false
      })
    }
    case actionTypes.deleteToken:
      return Object.assign({}, state, {
      })
    case actionTypes.updateTokenFulfilled: {
      return update(state, {
        wallets: {
          [action.account]: {
            tokens: {
              [action.tokenIndex]: {
                name: {$set: action.payload.name},
                symbol: {$set: action.payload.symbol},
                decimals: {$set: action.payload.decimals}
              }
            }
          }
        }
      })
    }
    case actionTypes.updateTokenRejected: {
      return Object.assign({}, state, {
        error: action.error
      })
    }
    case actionTypes.addRecentTransactionFulfilled: {
      if(action.tokenIndex !== null) {
        return update(state, {
          wallets: {
            [action.account]: {
              tokens: {
                [action.tokenIndex]: {
                  recent: {$set: [action.transactionData, ...state.wallets[action.account].tokens[action.tokenIndex].recent]}
                }
              }
            }
          }
        })
      } else {
        if (state.wallets[action.account].type === "icx") {
          return update(state, {
            wallets: {
              [action.account]: {
                recent: {$set: [action.transactionData, ...state.wallets[action.account].recent]},
                pendingTransaction: {$set: [action.transactionData, ...state.wallets[action.account].pendingTransaction]}
              }
            }
          })
        } else {
          return update(state, {
            wallets: {
              [action.account]: {
                recent: {$set: [action.transactionData, ...state.wallets[action.account].recent]}
              }
            }
          })
        }
      }
    }
    default: {
      return state
    }
  }
}
