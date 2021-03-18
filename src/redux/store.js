import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import userReducer from './reducers/userReducer';
import auctionReducer from './reducers/auctionReducer';
import uiReducer from './reducers/uiReducer';
import weblogReducer from './reducers/weblogReducer';

const initialState = {};
const middleware = [thunk];

const reducers = combineReducers({
  user: userReducer,
  auction: auctionReducer,
  UI: uiReducer,
  weblog: weblogReducer,
});

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const enhancer = composeEnhancers(
  applyMiddleware(...middleware)

  // other store enhancers if any
);
const store = createStore(reducers, initialState, enhancer);

export default store;
