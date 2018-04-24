import { combineReducers } from 'redux';
import { globalReducer } from 'backgroundRedux/reducers/globalReducer'

const rootReducer = combineReducers({
  global: globalReducer
});

export default rootReducer;
