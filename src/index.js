import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './redux/store';
import { SET_AUTHENTICATED } from './redux/types';
import { logoutUser, getUserData } from './redux/actions/userActions';
import { getPosts } from './redux/actions/weblogActions';
import { getAuctions } from './redux/actions/auctionActions';
import axios from 'axios';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import themeFile from './theme';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
const theme = createMuiTheme(themeFile);

store.dispatch(getPosts());
store.dispatch(getAuctions());

const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    //window.location.href = '/UserAuth';

    store.dispatch(logoutUser());
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData());
  }
}

ReactDOM.render(
  <Router>
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </MuiThemeProvider>
  </Router>,
  document.getElementById('root')
);
