import { fork, put, takeEvery, takeLatest, call, all } from 'redux-saga/effects'
import AT from 'redux/actionTypes/actionTypes';
import { isEmpty } from 'utils/';
import { initPopupState } from 'redux/actions/popupActions';
import {
  getWallet
} from 'redux/actions/walletActions';
import {
  setLock
} from 'redux/actions/globalActions';
import { resetMainPageUIReducer } from 'redux/actions/mainPageUIActions';
import { logOut } from 'redux/actions/authActions';
import { getRate as GET_RATE_API } from 'redux/api/rateApi'
import {
  getWalletApi as GET_WALLET,
  updateWalletNameApi as UPDATE_WALLET_NAME,
  updatePasswordApi as UPDATE_PASSWORD,
  addTokenApi as ADD_TOKEN,
  isExistTokenApi as IS_EXIST_TOKEN,
  getTokenInfoApi as GET_TOKEN_INFO,
  deleteWalletApi as DELETE_WALLET,
  deleteTokenApi as DELETE_TOKEN,
  updateTokenApi as UPDATE_TOKEN,
  fetchCoinBalanceApi as FETCH_COIN_BALANCE,
  fetchTokenBalanceApi as FETCH_TOKEN_BALANCE,
  fetchTransactionHistoryApi as FETCH_TRANSACTION_HISTORY_API,
  getTransactionReceiptApi as GET_TRANSACTION_RECEIPT_API,
  getBlockNumberApi as GET_BLOCK_NUMBER,
  addRecentTransactionApi as ADD_RECENT_TRANSACTION
} from 'redux/api/walletApi';
import { icx_checkIcxTransactionExist as CHECK_ICX_TRANSACTION_EXIST } from 'redux/api/walletIcxApi';
import { blockSearchNum as BLOCK_SEARCH_NUM } from 'constants/index'

function* getWalletFunc(action) {
  try {
    yield put({type: AT.getWalletLoading});
    const payload = yield call(GET_WALLET);
    if (isEmpty(payload))  {
      yield put({type: AT.getWalletFulfilled, payload});
      yield put(setLock(''));
      yield put(logOut());
    } else {
      yield put({type: AT.getWalletFulfilled, payload});
      yield put({type: AT.fetchAll, payload});
    }
  } catch (e) {
    alert(e);
    yield put({type: AT.getWalletRejected, error: e});
  }
}

function* fetchAllFunc(action) {
  try {
    yield put({type: AT.totalResultLoading});
    let keys = Object.keys(action.payload);
    let values = Object.values(action.payload);

    let fetchDataArr = [];
    for(let i=0; i<keys.length; i++) {
      let param = {
        account: keys[i],
        tokens: values[i].tokens,
        coinType: values[i].type
      }
      fetchDataArr.push(call(fetchWalletDataFunc, param));
    }

    fetchDataArr.push(call(getRateFunc, { currency: 'usd', wallets: action.payload }));
    yield all(fetchDataArr);
    yield put({type: AT.totalResultFulfilled});
  } catch (e) {
    yield put({type: AT.totalResultRejected});
    alert(e);
  }
}

function* fetchWalletDataFunc(action) {
  try {
    let arr = [];
    let param = {
      account: action.account,
      coinType: action.coinType
    }
    arr.push(call(fetchCoinBalanceFunc, param));
    const tokens = Object.values(action.tokens);
    for (let i=0; i<tokens.length; i++) {
      param = {
        index: tokens[i].address,
        address: tokens[i].address,
        customDecimal: tokens[i].decimals,
        account: action.account,
        coinType: action.coinType
      }
      arr.push(call(fetchTokenBalanceFunc, param));
    }
    yield all(arr);
    yield put({type: AT.fetchWalletDataFulfilled});
  } catch (e) {
    alert(e);
    yield put({type: AT.fetchWalletDataRejected, error: e});
  }
}

function* fetchCoinBalanceFunc(action) {
  try {
    yield put({type: AT.fetchCoinBalanceLoading, account: action.account});
    const balance = yield call(FETCH_COIN_BALANCE, action.account, action.coinType);
    yield put({
      type: AT.fetchCoinBalanceFulfilled,
      account: action.account,
      balance: balance
    });
  } catch (e) {
    alert(e);
    yield put({
      type: AT.fetchCoinBalanceRejected,
      error: e
    });
  }
}

function* fetchTokenBalanceFunc(action) {
  try {
    yield put({type: AT.fetchTokenBalanceLoading, index: action.index, account: action.account});
    const balance = yield call(FETCH_TOKEN_BALANCE, action.address, action.customDecimal, action.account, action.coinType);
    yield put({
      type: AT.fetchTokenBalanceFulfilled,
      index: action.index,
      address: action.address,
      account: action.account,
      balance: balance
    });
  } catch (e) {
    alert(e);
    yield put({
      type: AT.fetchTokenBalanceRejected,
      index: action.index,
      error: e
    });

  }
}

function* fetchTransactionHistoryFunc(action) {
  try {
    yield put({type: AT.fetchTransactionHistoryLoading, account: action.account});

    if (action.data.coinType === 'icx') {
      if (action.data.isPending) {
        let callArr = [];
        for (let i = 0; i<action.data.pendingList.length; i++) {
          callArr.push(call(CHECK_ICX_TRANSACTION_EXIST, {
            pendingObj: action.data.pendingList[i]
          }))
        }
        let resultArr = yield all(callArr);
        const payload = yield call(FETCH_TRANSACTION_HISTORY_API, {
          account: action.account,
          pendingList: resultArr,
          coinType: action.data.coinType
        });
        yield put({ type: AT.fetchTransactionHistoryFulfilled, payload: payload.data });
      } else {
        const payload = yield call(FETCH_TRANSACTION_HISTORY_API, {
          account: action.account,
          page: action.data.page,
          coinType: action.data.coinType
        })
        yield put({ type: AT.fetchTransactionHistoryFulfilled, payload: payload.data, totalData: payload.total });
      }
    }
    else {
      let callArr = [];
      let startBlock, endBlock;
      if (action.data.isPending) {
        callArr.push(call(FETCH_TRANSACTION_HISTORY_API, {
          account: action.account,
          blockNumber: 'pending',
          tokenAddress: action.data.tokenAddress,
          coinType: action.data.coinType
        }))
      } else {
        endBlock = action.data.endBlockNumber;
        if (!endBlock) {
          endBlock = yield call(GET_BLOCK_NUMBER, action.data.coinType);
        }
        startBlock = endBlock - BLOCK_SEARCH_NUM;
        for (let i = endBlock; i>startBlock; i--) {
          callArr.push(call(FETCH_TRANSACTION_HISTORY_API, {
            account: action.account,
            blockNumber: i,
            tokenAddress: action.data.tokenAddress,
            coinType: action.data.coinType
          }))
        }
      }

      const history = yield all(callArr);
      const historyArr = Object.values(history).filter(i => i.length !== 0);
      let resultArr = [];
      if (historyArr.length !== 0) {
        resultArr = historyArr.reduce((prev, next) => {
          if (historyArr.length === 1) {
            return prev
          } else {
            return prev.concat(next);
          }
        });
      }

      if (!action.data.isPending) {
        callArr = [];
        for (let i = 0; i<resultArr.length; i++) {
          callArr.push(call(GET_TRANSACTION_RECEIPT_API, resultArr[i], action.data.coinType))
        }
        resultArr = yield all(callArr);
      }
      yield put({ type: AT.fetchTransactionHistoryFulfilled, startBlock: startBlock, endBlock: endBlock, payload: resultArr });
    }
  } catch (e) {
    yield put({
      type: AT.fetchTransactionHistoryRejected,
      error: e
    });
  }
}


function* updateWalletNameFunc(action) {
  try {
    const payload = yield call(UPDATE_WALLET_NAME, action.account, action.name);
    yield put({type: AT.updateWalletNameFulfilled, payload});
    yield put(getWallet());
    yield put(resetMainPageUIReducer());
    yield put(initPopupState());
  } catch (e) {
    alert(e);
    yield put({type: AT.updateWalletNameRejected, error: e});
  }
}

function* updatePasswordFunc(action) {
  try {
    const payload = yield call(UPDATE_PASSWORD, action.account, action.priv);
    yield put({type: AT.updatePasswordFulfilled, payload});
  } catch (e) {
    alert(e);
    yield put({type: AT.updatePasswordRejected, error: e});
  }
}

function* isExistTokenFunc(action) {
  try {
    const payload = yield call(IS_EXIST_TOKEN, action.address, action.coinType);
    if (payload) {
      yield put({type: AT.isExistTokenFulfilled, payload: true});
    } else {
      yield put({type: AT.isExistTokenFulfilled, payload: false});
    }
  } catch (e) {
    yield put({type: AT.isExistTokenRejected, error: e});
  }
}

function* getTokenInfoFunc(action) {
  try {
    const payload = yield call(GET_TOKEN_INFO, action.address, action.coinType);
    yield put({type: AT.getTokenInfoFulfilled, payload});
  } catch (e) {
    yield put({type: AT.getTokenInfoRejected, error: e});
  }
}

function* addTokenFunc(action) {
  try {
    for(let i=0; i<action.tokenArr.length; i++) {
      yield call(ADD_TOKEN, action.address, action.tokenArr[i], action.coinType)
    }
    yield put({type: AT.addTokenFulfilled});
    yield put(getWallet());
    yield put(resetMainPageUIReducer());
    yield put(initPopupState());
  } catch (e) {
    alert(e);
    yield put({type: AT.addTokenRejected, error: e});
  }
}

function* deleteWalletFunc(action) {
  try {
    const payload = yield call(DELETE_WALLET, action.address);
    yield put({type: AT.deleteWalletFulfilled, payload});
    yield put(getWallet());
    yield put(resetMainPageUIReducer());
    yield put(initPopupState());
  } catch (e) {
    alert(e);
    yield put({type: AT.deleteWalletRejected, error: e});
  }
}

function* deleteTokenFunc(action) {
  try {
    const payload = yield call(DELETE_TOKEN, action.account, action.index);
    yield put({type: AT.deleteTokenFulfilled, payload});
    yield put(getWallet());
    yield put(resetMainPageUIReducer());
    yield put(initPopupState());
  } catch (e) {
    alert(e);
    yield put({type: AT.deleteTokenRejected, error: e});
  }
}


function* updateTokenFunc(action) {
  try {
    yield call(UPDATE_TOKEN, action.account, action.index, action.data);
    yield put({type: AT.updateTokenFulfilled, account: action.account, tokenIndex: action.index, payload: action.data});
    yield put(getWallet());
    yield put(initPopupState());
  } catch (e) {
    alert(e);
    yield put({type: AT.updateTokenRejected, error: e});
  }
}

export function* getRateFunc(action) {
  try {
    yield put({type: AT.getRateLoading});
    let keys = Object.keys(action.wallets);
    let values = Object.values(action.wallets);
    let symbolList = [];
    for(let i=0; i<keys.length; i++) {
      symbolList.push(values[i].type);
      const tokensValues = Object.values(values[i].tokens)
      for (let v = 0; v< tokensValues.length; v++) {
        symbolList.push(tokensValues[v].defaultSymbol.toLowerCase());
      }
    }
    const result = yield call(GET_RATE_API, action['currency'], symbolList);
    yield put({type: AT.getRateFulfilled, payload: { result: result, currency: action.currency }});
  } catch (e) {
    alert(e);
    yield put({type: AT.getRateRejected, error: e});
  }
}

export function* addRecentTransactionFunc(action) {
  try {
    yield call(ADD_RECENT_TRANSACTION, action.account, action.tokenIndex, action.transactionData)
    yield put({
      type: AT.addRecentTransactionFulfilled,
      account: action.account,
      tokenIndex: action.tokenIndex,
      transactionData: action.transactionData
    })
  }
  catch(e) {
    alert(e);
  }
}

function* watchGetRate() {
  yield takeLatest(AT.getRate, getRateFunc)
}

function* watchFetchAll() {
  yield takeLatest(AT.fetchAll, fetchAllFunc)
}

function* watchFetchWalletData() {
  yield takeEvery(AT.fetchWalletData, fetchWalletDataFunc)
}

function* watchFetchCoinBalance() {
  yield takeEvery(AT.fetchCoinBalance, fetchCoinBalanceFunc)
}

function* watchFetchTokenBalance() {
  yield takeEvery(AT.fetchTokenBalance, fetchTokenBalanceFunc)
}

function* watchFetchTransactionHistory() {
  yield takeLatest(AT.fetchTransactionHistory, fetchTransactionHistoryFunc)
}

function* watchGetWallet() {
  yield takeLatest(AT.getWallet, getWalletFunc)
}

function* watchUpdateWalletName() {
  yield takeLatest(AT.updateWalletName, updateWalletNameFunc)
}

function* watchUpdatePassword() {
  yield takeLatest(AT.updatePassword, updatePasswordFunc)
}

function* watchIsExistToken() {
  yield takeLatest(AT.isExistToken, isExistTokenFunc)
}

function* wtchGetTokenInfo() {
  yield takeLatest(AT.getTokenInfo, getTokenInfoFunc)
}

function* watchAddToken() {
  yield takeEvery(AT.addToken, addTokenFunc)
}

function* watchDeleteWallet() {
  yield takeLatest(AT.deleteWallet, deleteWalletFunc)
}

function* watchDeleteToken() {
  yield takeLatest(AT.deleteToken, deleteTokenFunc)
}

function* watchUpdateToken() {
  yield takeLatest(AT.updateToken, updateTokenFunc)
}

function* watchAddRecentTransaction() {
  yield takeLatest(AT.addRecentTransaction, addRecentTransactionFunc)
}

export default function* walletSaga() {
   yield fork(watchGetWallet);
   yield fork(watchFetchAll);
   yield fork(watchFetchWalletData);
   yield fork(watchFetchCoinBalance);
   yield fork(watchFetchTokenBalance);
   yield fork(watchFetchTransactionHistory);
   yield fork(watchGetRate);
   yield fork(watchUpdateWalletName);
   yield fork(watchUpdatePassword);
   yield fork(watchIsExistToken);
   yield fork(wtchGetTokenInfo);
   yield fork(watchAddToken);
   yield fork(watchDeleteWallet);
   yield fork(watchDeleteToken);
   yield fork(watchUpdateToken);
   yield fork(watchAddRecentTransaction);
}
