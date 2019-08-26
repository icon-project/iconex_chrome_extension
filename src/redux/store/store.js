import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from 'redux/reducers/rootReducer';
import rootSaga from 'redux/sagas/rootSaga';
import persistState from 'redux-localstorage';
import { composeWithDevTools } from 'remote-redux-devtools';

const generateStore = (port) => {
  const sagaMiddleware = createSagaMiddleware();
  const composeEnhancers = composeWithDevTools({ realtime: true, hostname: 'localhost', port: port });
  const composeFunc = process.env.NODE_ENV === 'production' ? compose : composeEnhancers;
  const store = createStore(rootReducer, {}, composeFunc(
    applyMiddleware(sagaMiddleware),
    persistState(null, {
      slicer: (paths) => (state) => {
        return {
          global: state['global'],
        }
      }
    }),
  )
  );
  sagaMiddleware.run(rootSaga);
  return store
}

const store = generateStore(8000);
//const popupStore = generateStore(9000);

export {
  store
}
