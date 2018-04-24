import { fork, put, takeLatest, call, all } from 'redux-saga/effects'
import AT from 'redux/actionTypes/actionTypes';
import { resetSignupReducer, setWalletName } from 'redux/actions/signupActions';
import { initPopupState } from 'redux/actions/popupActions';
import { logInFulfilled } from 'redux/actions/authActions';
import { getWallet } from 'redux/actions/walletActions';
import { resetMainPageUIReducer } from 'redux/actions/mainPageUIActions';
import {
  generateWalletApi as GENERATE_WALLET,
  createWalletApi as CREATE_WALLET,
  isWalletExistApi as IS_LOGGED_IN
} from 'redux/api/walletApi';

function* generateWalletFunc(action) {
  try {
    const payload = yield call(GENERATE_WALLET, action.pw, action.coinType);
    yield put(setWalletName(action.walletName))
    yield put({type: AT.generateWalletFulfilled, payload});
  } catch (e) {
    alert(e);
    yield put({type: AT.generateWalletRejected, error: e});
  }
}

function* createWalletFunc(action) {
  try {
    yield call(CREATE_WALLET, action.walletObject);
    yield put({type: AT.createWalletFulfilled});
  } catch (e) {
    alert(e);
    yield put({type: AT.createWalletRejected, error: e});
  }
}

function* createWalletsFunc(action) {
  try {
    let arr = [];
    for (let i = 0; i < action.walletObjects.length; i++) {
      arr.push(call(CREATE_WALLET, action.walletObjects[i]))
    }
    yield all(arr);
    yield put({type: AT.createWalletsFulfilled});
  } catch (e) {
    alert(e);
    yield put({type: AT.createWalletsRejected, error: e});
  }
}

function* logInFunc(action) {
  try {
    const isLoggedIn = yield call(IS_LOGGED_IN);
    yield put(resetSignupReducer());
    yield put(initPopupState());
    if (isLoggedIn) {
      yield put(logInFulfilled());
      yield put(resetMainPageUIReducer());
      yield put(getWallet());
    }
  } catch (e) {
    alert(e);
  }
}

function* watchSetKey() { yield takeLatest(AT.generateWallet, generateWalletFunc) }
function* watchCreateWallet() { yield takeLatest(AT.createWallet, createWalletFunc) }
function* watchCreateWallets() { yield takeLatest(AT.createWallets, createWalletsFunc) }
function* watchLogin() { yield takeLatest(AT.logIn, logInFunc) }

export default function* signupSaga() {
 yield fork(watchSetKey);
 yield fork(watchCreateWallet);
 yield fork(watchCreateWallets);
 yield fork(watchLogin);
}
