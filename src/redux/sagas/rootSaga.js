import { fork } from 'redux-saga/effects'
import signupSaga from './signupSaga';
import authSaga from './authSaga';
import walletSaga from './walletSaga';
import lockSaga from './lockSaga';
import transactionSaga from './transactionSaga'
import contractSaga from './contractSaga'
import txFeeSaga from './txFeeSaga'
import externalSaga from './externalSaga'

export default function* rootSaga() {
 yield [
        fork(signupSaga),
        fork(authSaga),
        fork(walletSaga),
        fork(lockSaga),
        fork(transactionSaga),
        fork(contractSaga),
        fork(externalSaga)
        fork(txFeeSaga),
    ];
}
