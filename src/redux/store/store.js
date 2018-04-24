import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from 'redux/reducers/rootReducer';
import rootSaga from 'redux/sagas/rootSaga';
import persistState from 'redux-localstorage';
import { composeWithDevTools } from 'remote-redux-devtools';

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = composeWithDevTools({ realtime: true, hostname: 'localhost', port: 8000 });

const composeFunc = process.env.NODE_ENV === 'production' ? compose : composeEnhancers;

const store = createStore(rootReducer, {}, composeFunc(
    applyMiddleware(sagaMiddleware),
    persistState(null, {
      slicer: (paths) => (state) => {
        return {
          global: state['global']
        }
      }
    }),
  )
);

sagaMiddleware.run(rootSaga);

export {
  store
}
