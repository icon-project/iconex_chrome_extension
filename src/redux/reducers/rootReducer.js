import { combineReducers } from 'redux';
import { globalReducer } from 'redux/reducers/globalReducer'
import { popupReducer } from 'redux/reducers/popupReducer'
import { signupReducer } from 'redux/reducers/signupReducer'
import { authReducer } from 'redux/reducers/authReducer'
import { walletReducer } from 'redux/reducers/walletReducer'
import { exchangeTransactionReducer } from 'redux/reducers/exchangeTransactionReducer'
import { historyReducer } from 'redux/reducers/historyReducer'
import { contractReducer } from 'redux/reducers/contractReducer'
import { rateReducer } from 'redux/reducers/rateReducer'
import { ledgerReducer } from 'redux/reducers/ledgerReducer'
import { addressBookReducer } from 'redux/reducers/addressBookReducer'
import { externalReducer } from 'redux/reducers/externalReducer'

const rootReducer = combineReducers({
  global: globalReducer,
  popup: popupReducer,
  signup: signupReducer,
  auth: authReducer,
  wallet: walletReducer,
  exchangeTransaction: exchangeTransactionReducer,
  history: historyReducer,
  contract: contractReducer,
  rate: rateReducer,
  ledger: ledgerReducer,
  addressBook: addressBookReducer,
  external: externalReducer
});

export default rootReducer;
