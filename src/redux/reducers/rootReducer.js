import { combineReducers } from 'redux';
import { globalReducer } from 'redux/reducers/globalReducer'
import { popupReducer } from 'redux/reducers/popupReducer'
import { signupReducer } from 'redux/reducers/signupReducer'
import { authReducer } from 'redux/reducers/authReducer'
import { walletReducer } from 'redux/reducers/walletReducer'
import { mainPageUIReducer } from 'redux/reducers/mainPageUIReducer'
import { exchangeTransactionReducer } from 'redux/reducers/exchangeTransactionReducer'
import { historyReducer } from 'redux/reducers/historyReducer'

const rootReducer = combineReducers({
  global: globalReducer,
  popup: popupReducer,
  signup: signupReducer,
  auth: authReducer,
  wallet: walletReducer,
  exchangeTransaction: exchangeTransactionReducer,
  history: historyReducer,
  mainPage: mainPageUIReducer,
});

export default rootReducer;
