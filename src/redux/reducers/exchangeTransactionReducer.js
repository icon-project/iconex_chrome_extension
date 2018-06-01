import actionTypes from 'redux/actionTypes/actionTypes'
import { isAddress, isAddressIcx, getTypeText, convertNumberToText, calcTokenBalanceWithRate, isHex, checkHxPrefix, check0xPrefix } from 'utils'
import { store } from 'redux/store/store';
//import { coinRound as ROUND } from 'constants/index';
import BigNumber from 'bignumber.js';

const initialState = {
  pageType: '',
  pageTypeText: '',
  isLoggedIn: false,
  privKey: '',
  accountAddress: '',
  calcData: Object.assign({}),
  coinTypeIndex: '',
  isToken: false,
  coinQuantityError: '',
  coinQuantity: 0,
  recipientAddress: '',
  recipientAddressError: '',
  gasLoading: false,
  gasLimit: 21000,
  gasLimitError: '',
  gasPrice: 21,
  data: '',
  dataError: '',
  txFee: 0,
  tx: '',
  txLoading: false,
  submit: false,
  error: '',
  isInputReset: false
}

const CURRENCY = ['ICX', 'ETH', 'BTC'];

export function validateCoinQuantityError(state) {
  let error = '';
  if (!state.coinQuantity) {
    error = 'coinAmount'
  } else if (Number(state.coinQuantity) === 0) {
    error = 'coinAmountZero'
  } else if (state.calcData.isResultBalanceMinus) {
    error = 'coinAmountBalance'
  } else {
    error = ''
  }
  return error
}

export function validateRecipientAddressError(state) {
  let error = '';
  let recipientAddressLowerCase = state.recipientAddress.toLowerCase();
  let isAddressFunc = (s) => { return state.calcData.coinType === 'icx' ? isAddressIcx(s) : isAddress(s); }
  let isAddressSame = (s) => { if (state.calcData.coinType === 'icx') { return state.accountAddress === checkHxPrefix(s) } else { return state.accountAddress === check0xPrefix(s); } }
  if (!recipientAddressLowerCase) {
    error = 'transferAddressEnter'
  } else if (!isAddressFunc(recipientAddressLowerCase)) {
    error = 'transferAddressConfirm'
  } else if (isAddressSame(recipientAddressLowerCase)) {
    error = 'transferAddressSame'
  } else {
    error = ''
  }
  return error;
}

export function validateDataError(state) {
  let error = '';
  if (!isHex(state.data)) {
    error = 'checkData'
  } else {
    error = ''
  }
  return error;
}

export function validateGasLimitError(state) {
  let error = '';
  if (!state.gasLimit) {
    error = 'enterGasPrice'
  } else {
    error = ''
  }
  return error
}


const getCoinTypeObj = (wallet) => {
  const coinTypeObj = {}
  const tokens = Object.values(wallet.tokens);

  coinTypeObj[wallet.account] = wallet.type
  for(let i=0; i<tokens.length; i++) {
    coinTypeObj[tokens[i].address] = tokens[i].symbol
  }
  return coinTypeObj;
}

const calcData = (props) => {
  let { coinQuantity, accountAddress, coinTypeIndex, gasLimit, gasPrice, pageType } = props;

  const rate = store.getState().wallet.rate;
  const totalResultLoading = store.getState().wallet.totalResultLoading;
  const wallets = store.getState().wallet.wallets;
  const index = coinTypeIndex || accountAddress;
  const wallet = wallets[accountAddress];
  const coinTypeObj = getCoinTypeObj(wallet);
  const type = index === accountAddress ? coinTypeObj[wallet.account] : coinTypeObj[index]
  const usdRate = !totalResultLoading ? (rate[type] ? new BigNumber(rate[type]) : 0) : 0;
  const usdRateForToken = !totalResultLoading ? (rate[coinTypeObj[wallet.account]] ? new BigNumber(rate[coinTypeObj[wallet.account]]) : 0) : 0;
  const balance = index === accountAddress ? new BigNumber(wallet.balance) : new BigNumber(wallet.tokens[index].balance);
  const coinQuantityNumber = new BigNumber(coinQuantity || 0);

  let txFee = new BigNumber(gasLimit * window.web3.fromWei(gasPrice, 'gwei'));
  if (type === 'icx') {
    txFee = new BigNumber(0.01);
  }

  const totalBalance = pageType === 'exchange'
                        ? balance
                        : index === accountAddress
                          ? balance.minus(txFee)
                          : balance;
  const txFeeText = convertNumberToText(txFee, type, true);
  const sendQuantityText = convertNumberToText(coinQuantityNumber, 'transaction', true);
  const resultBalanceText = index === accountAddress ? convertNumberToText(balance.minus(txFee).minus(coinQuantityNumber), 'transaction', true) : convertNumberToText(balance.minus(coinQuantityNumber),  'transaction', true);
  let sendQuantityWithRateText, resultBalanceWithRateText;
  const txFeeWithRateText = !totalResultLoading && (usdRateForToken ? convertNumberToText(txFee.times(usdRateForToken), 'usd', false) : '-');

  if (index === accountAddress) {
    sendQuantityWithRateText = !totalResultLoading && convertNumberToText((coinQuantityNumber).times(usdRate), 'usd', false);
    resultBalanceWithRateText = !totalResultLoading && convertNumberToText((balance.minus(txFee).minus(coinQuantityNumber)).times(usdRate), 'usd', false);
  } else {
    sendQuantityWithRateText = !totalResultLoading && (usdRate ? convertNumberToText(calcTokenBalanceWithRate(coinQuantityNumber, usdRate, wallet.tokens[index].defaultDecimals, wallet.tokens[index].decimals), 'usd', false) : '-');
    resultBalanceWithRateText = !totalResultLoading && (usdRate ? convertNumberToText(calcTokenBalanceWithRate(balance.minus(coinQuantityNumber), usdRate, wallet.tokens[index].defaultDecimals, wallet.tokens[index].decimals), 'usd', false)  : '-');
  }

  if (pageType === 'exchange') {
    const currencyList = CURRENCY.filter(c => c !== type.toUpperCase())
    return {
      currencyList: currencyList,
      coinQuantityNumber: coinQuantityNumber,
      totalBalance: totalBalance,
      sendQuantity: sendQuantityText,
      sendQuantityWithRate: sendQuantityWithRateText,
      resultBalance: resultBalanceText,
      resultBalanceWithRate: resultBalanceWithRateText,
      isResultBalanceMinus: resultBalanceText.includes("-") ? true : false,
      coinType: type,
      coinTypeObj: coinTypeObj
    }
  } else {
    return {
      totalBalance: totalBalance.toFixed(18),
      txFee: txFeeText,
      txFeeWithRate: txFeeWithRateText,
      sendQuantity: sendQuantityText,
      sendQuantityWithRate: sendQuantityWithRateText,
      resultBalance: resultBalanceText,
      resultBalanceWithRate: resultBalanceWithRateText,
      isResultBalanceMinus: resultBalanceText.includes("-") ? true : false,
      coinType: type,
      coinTypeObj: coinTypeObj
    }
  }
};

export function exchangeTransactionReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.setEXTRPageType:
      return Object.assign({}, state, {
          pageType: action.payload,
          pageTypeText: getTypeText(action.payload, store.getState().global.language)
      })
    case actionTypes.setEXTRLogInState: {
      if (action.payload.isLoggedIn) {
        return Object.assign({}, state, {
            isLoggedIn: action.payload.isLoggedIn,
            privKey: action.payload.privKey
        })
      } else {
        return Object.assign({}, state, {
            isLoggedIn: action.payload.isLoggedIn,
            privKey: '',
            accountAddress: '',
            coinTypeIndex: ''
        })
      }
    }
    case actionTypes.setAccountAddress: {
      const newState = Object.assign({}, state, {
          isLoggedIn:  action.payload.isLoggedIn,
          accountAddress: action.payload.accountAddress,
          coinTypeIndex: action.payload.coinTypeIndex,
          coinQuantity: 0,
          coinQuantityError: '',
          recipientAddressError: '',
          isToken: action.payload.accountAddress === action.payload.coinTypeIndex ? false : true
      });
      return Object.assign({}, newState, {
          calcData: calcData(newState)
      })
    }
    case actionTypes.setCoinQuantity: {
      const newState = Object.assign({}, state, {
          coinQuantity: action.payload,
          coinQuantityError: ''
      })
      return Object.assign({}, newState, {
          calcData: calcData(newState)
      })
    }
    case actionTypes.setRecipientAddress:
      return Object.assign({}, state, {
          recipientAddress: action.payload,
          recipientAddressError: ''
      })
    case actionTypes.setCalcData:
      return Object.assign({}, state, {
          calcData: calcData(state)
      })
    case actionTypes.setGasLimit: {
      const newState = Object.assign({}, state, {
          gasLimit: action.payload,
      })
      return Object.assign({}, newState, {
          calcData: calcData(newState)
      })
    }
    case actionTypes.setGasPrice: {
      const newState = Object.assign({}, state, {
          gasPrice: action.payload,
      })
      return Object.assign({}, newState, {
          calcData: calcData(newState)
      })
    }
    case actionTypes.setData: {
      const newState = Object.assign({}, state, {
          data: action.payload,
      })
      return Object.assign({}, newState, {
          calcData: calcData(newState)
      })
    }
    case actionTypes.submitCall:
      let submit = false;
      if (!action.payload) {
        return Object.assign({}, state, {
          submit: submit
        })
      } else {
        if (state.coinType === 'icx') {
          const coinQuantityError = validateCoinQuantityError(state);
          const recipientAddressError = validateRecipientAddressError(state);
          if (!coinQuantityError && !recipientAddressError) {
            submit = true;
          }
          return Object.assign({}, state, {
            coinQuantityError: coinQuantityError,
            recipientAddressError: recipientAddressError,
            submit: submit
          })
        } else {
          const coinQuantityError = validateCoinQuantityError(state);
          const recipientAddressError = validateRecipientAddressError(state);
          const gasLimitError = validateGasLimitError(state);
          const dataError = validateDataError(state);
          if (!coinQuantityError && !recipientAddressError && !dataError && !gasLimitError) {
            submit = true;
          }
          return Object.assign({}, state, {
            coinQuantityError: coinQuantityError,
            recipientAddressError: recipientAddressError,
            gasLimitError: gasLimitError,
            dataError: dataError,
            submit: submit
          })
        }
      }
    case actionTypes.sendCall:
      return Object.assign({}, state, {
          txLoading: true,
          error: ''
      })
    case actionTypes.sendCallFulfilled:
      return Object.assign({}, state, {
          txLoading: false,
          tx: action.payload,
          error: ''
      })
    case actionTypes.sendCallRejected:
      return Object.assign({}, state, {
          txLoading: false,
          error: action.errorMsg
      })
    case actionTypes.setCoinQuantityError: {
      let error = validateCoinQuantityError(state);
      return Object.assign({}, state, {
          coinQuantityError: error
      })
    }
    case actionTypes.setRecipientAddressError: {
      let error = validateRecipientAddressError(state);
      return Object.assign({}, state, {
          recipientAddressError: error
      })
    }
    case actionTypes.setDataError: {
      let error = validateDataError(state);
      return Object.assign({}, state, {
          dataError: error
      })
    }
    case actionTypes.setGasLimitError: {
      let error = validateGasLimitError(state);
      return Object.assign({}, state, {
          gasLimitError: error
      })
    }
    case actionTypes.resetEXTRPageReducer:
      return Object.assign({}, initialState)

    case actionTypes.resetEXTRInputReducer:
      const { accountAddress, coinTypeIndex } = state;
      const isToken = accountAddress !== coinTypeIndex
      const newState = Object.assign({}, {
        ...state,
        coinQuantity: 0,
        recipientAddress: '',
        gasLimit: isToken ? 55000 : 21000,
        gasPrice: 21,
        data: '',
        submit: false,
        isInputReset: !state.isInputReset
      })

      return Object.assign({}, newState, {
        calcData: calcData(newState)
      })

    case actionTypes.getGasInfo:
      return Object.assign({}, state, {
          gasLoading: true
      })
    case actionTypes.getGasInfoFulfilled:
      const newGasState = Object.assign({}, state, {
        gasLoading: false,
        gasPrice: action.payload.gasPrice,
        gasLimit: action.payload.gasLimit,
      })
      return Object.assign({}, newGasState, {
        calcData: calcData(newGasState)
      })
    case actionTypes.getGasInfoRejected:
      return Object.assign({}, state, {
          gasLoading: false
      })
    // case actionTypes.getTxFee:
    //   const newState = Object.assign({}, state, {
    //
    //   });
    //   return Object.assign({}, newState, {
    //       calcData: calcData(newState)
    //   })
    // case actionTypes.getTxFeeFulfilled: {
    //   const newState = Object.assign({}, state, {
    //     txFee: action.payload
    //   });
    //   return Object.assign({}, newState, {
    //       calcData: calcData(newState)
    //   })
    // }
    // case actionTypes.getTxFeeRejected:
    //   return Object.assign({}, state, {
    //       error: action.error
    //   })
    default: {
      return state
    }
  }
}
