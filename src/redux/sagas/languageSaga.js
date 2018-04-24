import { fork, put, takeLatest, call } from 'redux-saga/effects'
import AT from 'redux/actionTypes/actionTypes';
import { setLanguageApi as SET_LANGUAGE_API } from 'redux/api/languageApi'

function* setLanguageFunc(action) {
  try {
    const payload = yield call(SET_LANGUAGE_API, action.payload);
    yield put({type: AT.setLanguageFulfilled, payload: payload});
  } catch (e) {
    alert(e);
    yield put({type: AT.setLanguageRejected, error: e});
  }
}

function* watchSetLanguage() {
  yield takeLatest(AT.setLanguage, setLanguageFunc)
}

export default function* languageSaga() {
 yield fork(watchSetLanguage);
}
