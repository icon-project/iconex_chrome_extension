import { fork, put, takeEvery, takeLatest, call, all, select } from 'redux-saga/effects'
import AT from 'redux/actionTypes/actionTypes';
import { isEmpty } from 'utils/';
import { closePopup, openPopup } from 'redux/actions/popupActions';
import {
  getWallet,
  resetSelectedWallet
} from 'redux/actions/walletActions';
import {
  setLock
} from 'redux/actions/globalActions';
import { logOut } from 'redux/actions/authActions';
import { getRate as GET_RATE_API } from 'redux/api/rateApi'
import BigNumber from 'bignumber.js';
import {
  getWalletApi as GET_WALLET,
  updateWalletNameApi as UPDATE_WALLET_NAME,
  updatePasswordApi as UPDATE_PASSWORD,
  addTokenApi as ADD_TOKEN,
  getTokenInfoApi as GET_TOKEN_INFO,
  deleteWalletApi as DELETE_WALLET,
  deleteTokenApi as DELETE_TOKEN,
  updateTokenApi as UPDATE_TOKEN,
  fetchCoinBalanceApi as FETCH_COIN_BALANCE,
  fetchTokenBalanceApi as FETCH_TOKEN_BALANCE,
  fetchTransactionHistoryApi as FETCH_TRANSACTION_HISTORY_API,
  addRecentTransactionApi as ADD_RECENT_TRANSACTION
} from 'redux/api/walletApi';
import { icx_checkIcxTransactionExist as CHECK_ICX_TRANSACTION_EXIST } from 'redux/api/walletIcxApi';

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
      if (!action.payload.fetchWithoutBalance) {
        yield put({type: AT.fetchAll, payload});
      }
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

    fetchDataArr.push(call(getRateFunc, { currency: 'usd' }));
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
    const isError = balance === 'error';
    yield put({
      type: AT.fetchCoinBalanceFulfilled,
      account: action.account,
      balance: isError ? new BigNumber(0) : balance,
      isError: isError
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
    const isError = balance === 'error';
    yield put({
      type: AT.fetchTokenBalanceFulfilled,
      index: action.index,
      address: action.address,
      account: action.account,
      balance: isError ? new BigNumber(0) : balance,
      isError: isError
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

function* updateWalletBalanceFunc(action) {
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
    yield all(fetchDataArr);
    yield put({type: AT.totalResultFulfilled});
    yield put({type: AT.setCalcData});
  } catch (e) {
    yield put({type: AT.totalResultRejected});
    alert(e);
  }
}

function* updateLedgerWalletBalanceFunc(action) {
  try {
    const isToken = yield select(state => state.wallet.selectedWallet.isToken)
    const selectedTokenId = yield select(state => state.wallet.selectedWallet.tokenId)
    const ledgerWallet = yield select(state => state.ledger.ledgerWallet)
    let balance = '', isError = '';
    if (isToken) {
      balance = yield call(FETCH_TOKEN_BALANCE, selectedTokenId, ledgerWallet.tokens[selectedTokenId].decimals, ledgerWallet.account, 'icx');
      isError = balance === 'error';
      yield put({
        type: AT.fetchTokenBalanceFulfilledForLedger,
        address: selectedTokenId,
        balance: isError ? new BigNumber(0) : balance,
        isError: isError
      });
    } else {
      balance = yield call(FETCH_COIN_BALANCE, ledgerWallet.account, 'icx');
      isError = balance === 'error';
      yield put({
        type: AT.updateLedgerWalletBalanceFulfilled,
        balance: isError ? new BigNumber(0) : balance,
        isError: isError
      });
    }
    yield put({
      type: AT.setCalcData,
    });
  } catch (e) {
    alert(e);
    yield put({
      type: AT.updateLedgerWalletBalanceRejected,
      error: e
    });
  }
}

function* fetchRecentHistoryFunc(action) {
  try {
    const wallets = yield select(state => state.wallet.wallets);
    const selectedAccount = yield select(state => state.wallet.selectedWallet.account);
    const contractAddress = yield select(state => state.wallet.selectedWallet.tokenId);
    const isToken = yield select(state => state.wallet.selectedWallet.isToken);
    const isLedger = yield select(state => state.ledger.isLedger);
    const ledgerWallet = yield select(state => state.ledger.ledgerWallet);
    const currentWallet = isLedger ? ledgerWallet : wallets[selectedAccount];
    const walletCoinType = currentWallet.type;

    yield put({ type: AT.fetchTransactionHistoryLoading });

    if (walletCoinType === 'icx') {
      const payload = yield call(FETCH_TRANSACTION_HISTORY_API, {
        account: selectedAccount,
        walletCoinType,
        contractAddress,
        isPending: false
      });
      yield put({ type: AT.fetchTransactionHistoryFulfilled, payload: payload.data, totalData: payload.total });
    } else {
      const recent = isToken ? currentWallet.tokens[contractAddress].recent : currentWallet.recent
      yield put({ type: AT.fetchTransactionHistoryFulfilled, payload: recent });
    }

    yield put(openPopup({
      popupType: 'history_transaction'
    }));
  } catch (e) {
    console.log(e)
    alert(e)
    yield put({
      type: AT.fetchTransactionHistoryRejected,
      error: e
    });
  }
}

function* fetchTransactionHistoryFunc(action) {
  const { walletCoinType, isPending, pendingList, contractAddress } = action.payload
  try {
    yield put({ type: AT.fetchTransactionHistoryLoading });
    if (walletCoinType === 'icx') {
      if (isPending) {
        let callArr = [];
        console.log(pendingList)
        for (let i = 0; i < pendingList.length; i++) {
          callArr.push(call(CHECK_ICX_TRANSACTION_EXIST, {
            ...pendingList[i],
            isToken: !!contractAddress
          }))
        }
        let resultArr = yield all(callArr);
        console.log(resultArr)
        const payload = yield call(FETCH_TRANSACTION_HISTORY_API, {
          ...action.payload,
          pendingList: resultArr,
        });
        yield put({ type: AT.fetchTransactionHistoryFulfilled, payload: payload.data });
      } else {
        console.log(action.payload)
        const payload = yield call(FETCH_TRANSACTION_HISTORY_API, action.payload)
        yield put({ type: AT.fetchTransactionHistoryFulfilled, payload: payload.data, totalData: payload.total });
      }
    }
  } catch (e) {
    console.log(e)
    alert(e)
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
    yield put(resetSelectedWallet());
    yield put(closePopup());
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

function* getTokenInfoFunc(action) {
  try {
    const payload = yield call(GET_TOKEN_INFO, action.address, action.coinType);
    console.log(payload)
    yield put({type: AT.getTokenInfoFulfilled, payload});
  } catch (error) {
    yield put({type: AT.getTokenInfoRejected, error});
  }
}

function* addTokenFunc(action) {
  try {
    const isLedger = yield select(state => state.ledger.isLedger);
    const ledgerWallet = yield select(state => state.ledger.ledgerWallet);
    if (isLedger) {
      const fetchArr = [];
      const setArr = [];
      const tokenObj = action.tokenArr.reduce((acc, cur) => {
          acc[cur.address] = cur
          return acc
      }, {});
      
      yield put({type: AT.addTokenFulfilledForLedger, payload: tokenObj});

      for (let i=0; i<action.tokenArr.length; i++) {
        fetchArr.push(call(FETCH_TOKEN_BALANCE, action.tokenArr[0].address, action.tokenArr[0].decimals, ledgerWallet.account, ledgerWallet.type));
      }
      const resultArr = yield all(fetchArr);
      console.log(resultArr)
      for (let i=0; i<action.tokenArr.length; i++) {
        const isError = resultArr[i] === 'error'
        setArr.push(put({
          type: AT.fetchTokenBalanceFulfilledForLedger,
          address: action.tokenArr[i].address,
          balance: isError ? new BigNumber(0) : resultArr[i],
          isError: isError
        }));
      }
      yield all(setArr);

      yield put({
        type: AT.setSelectedWallet,
        payload: {
          account: ledgerWallet.account,
          tokenId: action.tokenArr[0].address
        }
      })
      yield put(closePopup());
    } else {
      for(let i=0; i<action.tokenArr.length; i++) {
        yield call(ADD_TOKEN, action.address, action.tokenArr[i], action.coinType)
      }
      yield put({type: AT.addTokenFulfilled});
      yield put(getWallet());
      yield put(resetSelectedWallet());
      yield put(closePopup());
    }
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
    yield put(resetSelectedWallet());
    yield put(closePopup());
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
    yield put(resetSelectedWallet());
    yield put(closePopup());
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
    yield put(resetSelectedWallet());
    yield put(closePopup());
  } catch (e) {
    alert(e);
    yield put({type: AT.updateTokenRejected, error: e});
  }
}

export function* getRateFunc(action) {
  try {
    const wallets = yield select(state => state.wallet.wallets);
    yield put({type: AT.getRateLoading});
    let keys = Object.keys(wallets);
    let values = Object.values(wallets);
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
    yield call(ADD_RECENT_TRANSACTION, action.transactionData)
    yield put({
      type: AT.addRecentTransactionFulfilled,
      payload: action.transactionData
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

function* watchUpdateWalletBalance() {
  yield takeLatest(AT.updateWalletBalance, updateWalletBalanceFunc)
}

function* watchUpdateLedgerWalletBalance() {
  yield takeLatest(AT.updateLedgerWalletBalance, updateLedgerWalletBalanceFunc)
}

function* watchFetchRecentHistory() {
  yield takeLatest(AT.fetchRecentHistory, fetchRecentHistoryFunc)
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
   yield fork(watchUpdateWalletBalance);
   yield fork(watchUpdateLedgerWalletBalance);
   yield fork(watchFetchTokenBalance);
   yield fork(watchFetchRecentHistory);
   yield fork(watchFetchTransactionHistory);
   yield fork(watchGetRate);
   yield fork(watchUpdateWalletName);
   yield fork(watchUpdatePassword);
   yield fork(wtchGetTokenInfo);
   yield fork(watchAddToken);
   yield fork(watchDeleteWallet);
   yield fork(watchDeleteToken);
   yield fork(watchUpdateToken);
   yield fork(watchAddRecentTransaction);
}
