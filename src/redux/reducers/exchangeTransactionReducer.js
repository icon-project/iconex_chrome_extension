import actionTypes from 'redux/actionTypes/actionTypes'
import { isAddress, isEmpty, isIcxWalletAddress, checkLength, isIcxContractAddress, getTypeText, convertNumberToText, calcTokenBalanceWithRate, isHex, checkHxPrefix, check0xPrefix, parseError } from 'utils'
import { store } from 'redux/store/store';
import { IS_V3 } from 'constants/config.js'
//import { coinRound as ROUND } from 'constants/index';
import BigNumber from 'bignumber.js';

const mainState = {
  isLoggedIn: false,
  privKey: '',
}

const uiState = {
  calcData: {},
  walletSelectorError: '',
  coinQuantityError: '',
  coinQuantity: 0,
  recipientAddress: '',
  recipientAddressError: '',
  isFullBalance: false,

  txFeeLoading: false,
  txFeeLimit: 21000,
  txFeeLimitError: '',
  txFeePrice: 21,
  stepLimitTable: {},

  data: '',
  dataError: '',
  txFee: 0,
  tx: '',
  txLoading: false,

  submit: false,
  error: '',
}

const initialState = {
  ...mainState,
  ...uiState
}

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
  const selectedAccount = store.getState().wallet.selectedWallet.account;
  let error = '';
  let recipientAddressLowerCase = state.recipientAddress.toLowerCase();
  let isAddressFunc = (s) => {
    return state.calcData.walletCoinType === 'icx' ? (isIcxWalletAddress(s) || isIcxContractAddress(s)) : isAddress(s);
  }
  let isAddressSame = (s) => {
    if (state.calcData.walletCoinType === 'icx') {
      return selectedAccount === checkHxPrefix(s)
    } else {
      return selectedAccount === check0xPrefix(s);
    }
  }
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

export function validateTxFeeLimitError(state) {
  let error = '';
  if (!state.txFeeLimit) {
    error = 'enterGasPrice'
  } else {
    error = ''
  }
  return error
}

export function validateContractTxFeeLimitError(state) {
  let error = '';
  if (!state.txFeeLimit) {
    error = 'enterGasPrice'
  } else if (state.calcData.isResultBalanceMinus) {
    error = 'notEnoughBalance'
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
  let {
    coinQuantity,
    txFeeLimit,
    txFeePrice,
    account: selectedAccount = store.getState().wallet.selectedWallet.account,
    tokenId: selectedTokenId = store.getState().wallet.selectedWallet.tokenId,
    isToken = store.getState().wallet.selectedWallet.isToken,
  } = props;

  const isLedger = store.getState().ledger.isLedger;
  const ledgerWallet = store.getState().ledger.ledgerWallet;

  const rate = store.getState().rate.rate;
  const totalResultLoading = store.getState().wallet.totalResultLoading;
  const wallets = store.getState().wallet.wallets;
  const wallet = isLedger ? ledgerWallet : wallets[selectedAccount];
  const coinTypeObj = getCoinTypeObj(wallet);
  const walletCoinType = wallet.type;
  const type = !isToken ? coinTypeObj[wallet.account] : coinTypeObj[selectedTokenId]
  const usdRate = !totalResultLoading ? (rate[type.toLowerCase()] ? new BigNumber(rate[type.toLowerCase()]) : 0) : 0;
  const txFeeUsdRate = !totalResultLoading ? (rate[walletCoinType.toLowerCase()] ? new BigNumber(rate[walletCoinType.toLowerCase()]) : 0) : 0;
  const balance = !isToken ? new BigNumber(wallet.balance) : new BigNumber(wallet.tokens[selectedTokenId].balance);
  const coinQuantityNumber = new BigNumber(coinQuantity || 0);
  const txFeeLimitNumber = new BigNumber(txFeeLimit || 0);
  let txFeePriceCalc = new BigNumber(window.web3.fromWei(window.web3.toWei(txFeePrice, walletCoinType === 'icx' ? 'wei' : 'gwei'), 'ether'))
  let txFee = txFeePriceCalc.times(txFeeLimitNumber)
  const txFeePriceWithRate = convertNumberToText(txFeePriceCalc.times(usdRate), 'usd', false);

  if(!IS_V3 && walletCoinType === 'icx') {
    txFee = new BigNumber(0.01);
  }

  const totalBalance = !isToken
                          ? balance.minus(txFee)
                          : balance;
  const txFeeText = convertNumberToText(txFee, 'transaction', true);
  const sendQuantityText = convertNumberToText(coinQuantityNumber, 'transaction', true);
  const resultBalanceText = !isToken ? convertNumberToText(balance.minus(txFee).minus(coinQuantityNumber), 'transaction', true) : convertNumberToText(balance.minus(coinQuantityNumber),  'transaction', true);
  let sendQuantityWithRateText, resultBalanceWithRateText;
  const txFeeWithRateText = !totalResultLoading && (txFeeUsdRate ? convertNumberToText(txFee.times(txFeeUsdRate), 'usd', false) : '-');

  if (!isToken) {
    sendQuantityWithRateText = !totalResultLoading && convertNumberToText((coinQuantityNumber).times(usdRate), 'usd', false);
    resultBalanceWithRateText = !totalResultLoading && convertNumberToText((balance.minus(txFee).minus(coinQuantityNumber)).times(usdRate), 'usd', false);
  } else {
    sendQuantityWithRateText = !totalResultLoading && (usdRate ? convertNumberToText(calcTokenBalanceWithRate(coinQuantityNumber, usdRate, wallet.tokens[selectedTokenId].defaultDecimals, wallet.tokens[selectedTokenId].decimals), 'usd', false) : '-');
    resultBalanceWithRateText = !totalResultLoading && (usdRate ? convertNumberToText(calcTokenBalanceWithRate(balance.minus(coinQuantityNumber), usdRate, wallet.tokens[selectedTokenId].defaultDecimals, wallet.tokens[selectedTokenId].decimals), 'usd', false)  : '-');
  }

  return {
    totalBalance: totalBalance.toFixed(18),
    txFeePriceWithRate: txFeePriceWithRate,
    txFee: txFeeText,
    txFeeWithRate: txFeeWithRateText,
    sendQuantity: sendQuantityText,
    sendQuantityWithRate: sendQuantityWithRateText,
    resultBalance: resultBalanceText,
    resultBalanceWithRate: resultBalanceWithRateText,
    isResultBalanceMinus: resultBalanceText.includes("-") ? true : false,
    coinType: type,
    walletCoinType: walletCoinType,
    coinTypeObj: coinTypeObj
  }
};

// const updateStepLimit = () => {
//   const txFeeLimitTable = store.getState().exchangeTransaction.txFeeLimitTable;
//   const data = store.getState().exchangeTransaction.data;
//
//   if (isEmpty(txFeeLimitTable)) return 0;
//   let stepLimit = ''
//   // if() {
//   //   stepLimit = parseInt(txFeeLimitTable['default'], 16)
//   if(data) {
//     stepLimit = parseInt(txFeeLimitTable['input'], 16) * checkLength(data)
//   }else{
//     stepLimit = parseInt(txFeeLimitTable['default'], 16)
//   }
//   return stepLimit
// }

export function exchangeTransactionReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.setEXTRLogInStateForLedger: {
      return Object.assign({}, state, {
          isLoggedIn: action.payload.isLoggedIn
      })
    }
    case actionTypes.setEXTRLogInState: {
      return Object.assign({}, state, {
          isLoggedIn: action.payload.isLoggedIn,
          privKey: action.payload.isLoggedIn ? action.payload.privKey : '',
          walletSelectorError: ''
      })
    }
    case actionTypes.setSelectedWallet: {
      const newState = Object.assign({}, state, uiState);
      return Object.assign({}, newState, {
          calcData: calcData({
              ...newState,
              account: action.payload.account,
              tokenId: action.payload['tokenId'] || '',
              isToken: !!action.payload['tokenId']
          })
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
    case actionTypes.setTxFeeLimit: {
      const newState = Object.assign({}, state, {
          txFeeLimit: action.payload,
      })
      return Object.assign({}, newState, {
          calcData: calcData(newState)
      })
    }
    case actionTypes.setTxFeePrice: {
      const newState = Object.assign({}, state, {
          txFeePrice: action.payload,
      })
      return Object.assign({}, newState, {
          calcData: calcData(newState)
      })
    }
    case actionTypes.setData: {
      const walletCoinType = state.calcData.walletCoinType
      const newState = Object.assign({}, state, {
          data: action.payload,
          txFeeLimit: walletCoinType === 'icx'
                        ? (action.payload.length > 0 ? parseInt(state.txFeeLimitTable['default'], 16) + parseInt(state.txFeeLimitTable['input'], 16) * checkLength(action.payload)
                                                     : parseInt(state.txFeeLimitTable['default'], 16))
                        : state.txFeeLimit
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
        if (state.walletCoinType === 'icx') {
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
          const txFeeLimitError = validateTxFeeLimitError(state);
          const dataError = validateDataError(state);
          if (!coinQuantityError && !recipientAddressError && !dataError && !txFeeLimitError) {
            submit = true;
          }
          return Object.assign({}, state, {
            coinQuantityError: coinQuantityError,
            recipientAddressError: recipientAddressError,
            txFeeLimitError: txFeeLimitError,
            dataError: dataError,
            submit: submit
          })
        }
      }
    case actionTypes.sendCall:
      return Object.assign({}, state, {
          txLoading: true,
          tx: '',
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
          tx: '',
          error: parseError(action.errorMsg, state.calcData.walletCoinType)
      })
    case actionTypes.setCoinQuantityError: {
      let error = validateCoinQuantityError(state);
      return Object.assign({}, state, {
          coinQuantityError: error
      })
    }
    case actionTypes.toggleFullBalance: {
      return Object.assign({}, state, {
          isFullBalance: action.payload
      })
    }
    case actionTypes.setRecipientAddressError: {
      let error = validateRecipientAddressError(state);
      return Object.assign({}, state, {
          recipientAddressError: error
      })
    }
    case actionTypes.setWalletSelectorError: {
      return Object.assign({}, state, {
          walletSelectorError: 'alertWalletFirst'
      })
    }
    case actionTypes.setDataError: {
      let error = validateDataError(state);
      return Object.assign({}, state, {
          dataError: error
      })
    }
    case actionTypes.setTxFeeLimitError: {
      let error = validateTxFeeLimitError(state);
      return Object.assign({}, state, {
          txFeeLimitError: error
      })
    }
    case actionTypes.setContractTxFeeLimitError: {
      let error = validateContractTxFeeLimitError(state);
      return Object.assign({}, state, {
          txFeeLimitError: error
      })
    }
    case actionTypes.resetContractInputOutput:
    case actionTypes.resetEXTRPageReducer:
      return Object.assign({}, state, initialState)

    case actionTypes.resetEXTRInputReducer:
      const isToken = store.getState().wallet.selectedWallet.isToken;
      const newState = Object.assign({}, state, {
        ...uiState,
        txFeeLimit: isToken ? 55000 : 21000
      })

      return Object.assign({}, newState, {
        calcData: calcData(newState)
      })

    case actionTypes.getTxFeeInfo:
      return Object.assign({}, state, {
          txFeeLoading: true
      })
    case actionTypes.getTxFeeInfoFulfilled:
      const { txFeePrice, txFeeLimit, txFeeLimitTable } = action.payload
      const newTxFeeState = Object.assign({}, state, {
        txFeeLoading: false,
        txFeePrice: txFeePrice,
        txFeeLimit: txFeeLimitTable ? parseInt(txFeeLimitTable['default'], 16) : txFeeLimit,
        txFeeLimitTable: txFeeLimitTable || {}
      })
      return Object.assign({}, newTxFeeState, {
        calcData: calcData(newTxFeeState)
      })
    case actionTypes.getTxFeeInfoRejected:
      return Object.assign({}, state, {
          txFeeLoading: false
      })
    case actionTypes.updateStepLimit: {
      const { dataType } = action.payload
      const { txFeeLimitTable, data } = state
      let stepLimit = ''
      switch(dataType) {
        case 'default':
          stepLimit = parseInt(txFeeLimitTable['default'], 16)
          break;
        case 'message':
          stepLimit = parseInt(txFeeLimitTable['input'], 16) * checkLength(data)
          break;
        default:
          break;
      }
      const newState = Object.assign({}, state, {
        txFeeLimit: stepLimit
      })
      return Object.assign({}, newState, {
        calcData: calcData(newState)
      })
    }
    default: {
      return state
    }
  }
}
