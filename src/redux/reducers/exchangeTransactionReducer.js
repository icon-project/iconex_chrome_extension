import actionTypes from 'redux/actionTypes/actionTypes'
import {
  convertNumberToText,
  calcTokenBalanceWithRate,
  parseError
} from 'utils'
import {
  validateCoinQuantityError,
  validateRecipientAddressError,
  validateDataError,
  validateTxFeeLimitError,
  validateContractTxFeeLimitError,
} from 'redux/helper/validation'
import { store } from 'redux/store/store';
import { IS_V3 } from 'constants/config.js'
import {
  walletSelector,
  assetSymbolListSelector,
  walletCoinTypeSelector,
  symbolSelector
} from 'redux/helper/walletSelector'
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

const calcData = (props) => {
  let {
    coinQuantity,
    txFeeLimit,
    txFeePrice,
    tokenId: selectedTokenId = store.getState().wallet.selectedWallet.tokenId,
    isToken = store.getState().wallet.selectedWallet.isToken,
  } = props;

  const rate = store.getState().rate.rate;
  const totalResultLoading = store.getState().wallet.totalResultLoading;
  const wallet = walletSelector();
  const coinTypeObj = assetSymbolListSelector();
  const walletCoinType = walletCoinTypeSelector();
  const type = symbolSelector();
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
      // return Object.assign({}, newState, {
      //     calcData: calcData({
      //         ...newState,
      //         account: action.payload.account,
      //         tokenId: action.payload['tokenId'] || '',
      //         isToken: !!action.payload['tokenId']
      //     })
      // })
      return Object.assign({}, newState);
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
        if (state.calcData.walletCoinType === 'icx') {
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
      const newGasState = Object.assign({}, state, {
        txFeeLoading: false,
        txFeePrice: action.payload.txFeePrice,
        txFeeLimit: action.payload.txFeeLimit,
      })
      return Object.assign({}, newGasState, {
        calcData: calcData(newGasState)
      })
    case actionTypes.getTxFeeInfoRejected:
      return Object.assign({}, state, {
          txFeeLoading: false
      })
    default: {
      return state
    }
  }
}
