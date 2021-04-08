import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import userReducer from './reducers/userReducer';
import auctionReducer from './reducers/auctionReducer';
import uiReducer from './reducers/uiReducer';
import weblogReducer from './reducers/weblogReducer';
import {
  reduxFirestore,
  getFirestore,
  firestoreReducer,
} from 'redux-firestore';
import firebase from '../config/fbConfig';

const initialState = {};
const middleware = [thunk.withExtraArgument({ getFirestore })];

const reducers = combineReducers({
  user: userReducer,
  auction: auctionReducer,
  UI: uiReducer,
  weblog: weblogReducer,
  firestore: firestoreReducer,
});

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const enhancer = composeEnhancers(
  applyMiddleware(...middleware),
  reduxFirestore(firebase)
  // other store enhancers if any
);
const store = createStore(reducers, initialState, enhancer);

export default store;
