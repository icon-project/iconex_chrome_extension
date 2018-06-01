import { fork } from 'redux-saga/effects'
import signupSaga from './signupSaga';
import authSaga from './authSaga';
import walletSaga from './walletSaga';
import lockSaga from './lockSaga';
import transactionSaga from './transactionSaga'

export default function* rootSaga() {
 yield [
        fork(signupSaga),
        fork(authSaga),
        fork(walletSaga),
        fork(lockSaga),
        fork(transactionSaga)
    ];
}
