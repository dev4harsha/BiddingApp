import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import userReducer from './reducers/userReducer';

import uiReducer from './reducers/uiReducer';
import weblogReducer from './reducers/weblogReducer';
import {
  reduxFirestore,
  getFirestore,
  firestoreReducer,
} from 'redux-firestore';
import {
  reactReduxFirebase,
  firebaseReducer,
  getFirebase,
} from 'react-redux-firebase';
import firebase from '../config/fbConfig';

const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB
  // enableClaims: true // Get custom claims along with the profile
};

const initialState = {};
const middleware = [thunk.withExtraArgument({ getFirestore, getFirebase })];

const reducers = combineReducers({
  user: userReducer,

  UI: uiReducer,
  weblog: weblogReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
});

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const enhancer = composeEnhancers(
  applyMiddleware(...middleware),
  reduxFirestore(firebase),
  reactReduxFirebase(firebase, rrfConfig)
  // other store enhancers if any
);
const store = createStore(reducers, initialState, enhancer);

export default store;
