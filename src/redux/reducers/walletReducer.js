import actionTypes from 'redux/actionTypes/actionTypes'
import update from 'react-addons-update';

const initialState = {
  wallets: {},
  walletsLoading: true,
  totalResultLoading: false,
  // rate: {},
  // rateLoading: true,
  // currency: 'usd',
  selectedWallet: {
    account: '',
    tokenId: '',
    isToken: false
  },
  _06_privateKey: '', // 06 BACKUP WALLETS,
  _06_v3: '', // 06 BACKUP WALLETS

  _07_tokenInfo: {},
  _07_tokenInfoLoading: false,
  _07_tokenInfoError: '',

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
            isError: false,
            recent: []
          }, tokensValues[v])
          values[i].tokens[tokensValues[v].address] = newTokenObject
        }
        result[keys[i]] = Object.assign({}, {
          account: keys[i],
          balance: 0,
          isError: false,
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
    case actionTypes.getTokenInfo: {
      return Object.assign({}, state, {
        _07_tokenInfo: {},
        _07_tokenInfoLoading: true,
        _07_tokenInfoError: ''
      })
    }
    case actionTypes.getTokenInfoFulfilled: {
      return Object.assign({}, state, {
        _07_tokenInfo: action.payload,
        _07_tokenInfoLoading: false,
        _07_tokenInfoError: ''
      })
    }
    case actionTypes.getTokenInfoRejected: {
      return Object.assign({}, state, {
        _07_tokenInfoLoading: false,
        _07_tokenInfoError: action.error
      })
    }
    case actionTypes.fetchCoinBalanceLoading: {
      return update(state, {
        wallets: {
          [action.account]: {
            balanceLoading: {$set: true},
            isError: {$set: false}
          }
        }
      });
    }
    case actionTypes.fetchCoinBalanceFulfilled: {
      return update(state, {
        wallets: {
          [action.account]: {
            balance: {$set: action.balance},
            balanceLoading: {$set: false},
            isError: {$set: action.isError}
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
                balanceLoading: {$set: true},
                isError: {$set: false}
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
                balanceLoading: {$set: false},
                isError: {$set: action.isError}
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
    // case actionTypes.setCurrency: {
    //   return Object.assign({}, state, {
    //       currency: action.currency
    //   })
    // }
    // case actionTypes.getRateLoading: {
    //   return Object.assign({}, state, {
    //       rateLoading: true
    //   })
    // }
    // case actionTypes.getRateFulfilled: {
    //   return Object.assign({}, state, {
    //       rate: action.payload.result,
    //       currency: action.payload.currency,
    //       rateLoading: false
    //   })
    // }
    // case actionTypes.getRateRejected: {
    //   return Object.assign({}, state, {
    //       error: action.error,
    //       rateLoading: false
    //   })
    // }
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
      const { contractAddress, from } = action.payload
      if (contractAddress) {
        if (state.wallets[from].type === "icx") {
          return update(state, {
            wallets: {
              [from]: {
                tokens: {
                  [contractAddress]: {
                    recent: {$set: [action.payload.recent]},
                    pendingTransaction: {$set: [action.payload.pending, ...state.wallets[from].tokens[contractAddress].pendingTransaction]}
                  }
                }
              }
            }
          })
        } else {
          return update(state, {
            wallets: {
              [from]: {
                tokens: {
                  [contractAddress]: {
                    recent: {$set: [action.payload.recent, ...state.wallets[from].tokens[contractAddress].recent].slice(0, 5)}
                  }
                }
              }
            }
          })
        }
      } else {
        if (state.wallets[from].type === "icx") {
          return update(state, {
            wallets: {
              [from]: {
                recent: {$set: [action.payload.recent]},
                pendingTransaction: {$set: [action.payload.pending, ...state.wallets[from].pendingTransaction]}
              }
            }
          })
        } else {
          return update(state, {
            wallets: {
              [from]: {
                recent: {$set: [action.payload.recent, ...state.wallets[from].recent].slice(0, 5)}
              }
            }
          })
        }
      }
    }
    case actionTypes.setSelectedWallet: {
      const selectedWallet = {
        account: action.payload.account,
        tokenId: action.payload['tokenId'] || '',
        isToken: !!action.payload['tokenId']
      }
      return Object.assign({}, state, {
          selectedWallet: selectedWallet
      })
    }

    /* TODO: selectedWallet 어떤 상황에서 리셋해야 하는지 체크*/
    case actionTypes.resetContractInputOutput:
    case actionTypes.resetEXTRPageReducer:
    case actionTypes.resetSelectedWallet:
      const selectedWallet = {
        account: '',
        tokenId: '',
        isToken: false
      }
      return Object.assign({}, state, {
          selectedWallet: selectedWallet
      })
    default: {
      return state
    }
  }
}
