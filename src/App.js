import { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
//Pages
import Contact from './pages/Contact';
import Footer from './components/footer/Footer';
import Navbar from './components/header/Navbar';
import Home from './pages/Home';
import Auction from './pages/Auction';
import Terms from './pages/Terms';
import Weblog from './pages/Weblog';
import About from './pages/About';
import Faq from './pages/Faq';
import Bid from './components/auction/Bid';
import 'fontsource-roboto';
import BlogPost from './components/weblog/BlogPost';
import UserProfile from './pages/UserProfile';

import 'react-toastify/dist/ReactToastify.css';
import UserAuth from './pages/UserAuth';
import jwtDecode from 'jwt-decode';
import AuthRoute from './AuthRoute';
//theme
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import themeFile from './theme';
//Redux
import { Provider } from 'react-redux';
import store from './redux/store';
import { SET_AUTHENTICATED } from './redux/types';
import { logoutUser, getUserData } from './redux/actions/userActions';
import { getPosts } from './redux/actions/weblogActions';
import { getAuctions } from './redux/actions/auctionActions';
import axios from 'axios';

const theme = createMuiTheme(themeFile);
// store.dispatch(getPosts());
// store.dispatch(getAuctions());

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

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <Navbar />
          <Route exact path="/" component={Home} />
          <Route exact path="/auction" component={Auction} />
          <Route exact path="/BlogPost/:postId" component={BlogPost} />
          <Route exact path="/faq" component={Faq} />
          <Route exact path="/about" component={About} />
          <Route exact path="/weblog" component={Weblog} />
          <Route exact path="/terms" component={Terms} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/UserAuth" component={UserAuth} />
          <Route path="/auction/:auctionId/bid" component={Bid} />

          <AuthRoute path="/user" component={UserProfile} />

          <Footer />
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
