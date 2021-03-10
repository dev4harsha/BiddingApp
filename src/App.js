import { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
//Pages
import Contact from './pages/contact/Contact';
import Footer from './components/footer/Footer';
import Navbar from './components/header/Navbar';
import Home from './pages/home/Home';
import Auction from './pages/auction/Auction';
import Terms from './pages/terms/Terms';
import Weblog from './pages/weblog/Weblog';
import About from './pages/about/About';
import Faq from './pages/faq/Faq';
import Bid from './pages/auction/bid/Bid';
import 'fontsource-roboto';
import BlogPost from './pages/weblog/BlogPost';
import UserProfile from './pages/userProfile/UserProfile';

import 'react-toastify/dist/ReactToastify.css';
import UserAuth from './pages/userProfile/UserAuth';
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
import axios from 'axios';

const theme = createMuiTheme(themeFile);

const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    window.location.href = '/login';

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
          <Router>
            <Navbar />
            <Route exact path="/" component={Home} />
            <Route exact path="/auction" component={Auction} />
            <Route exact path="/BlogPost" component={BlogPost} />
            <Route exact path="/faq" component={Faq} />
            <Route exact path="/about" component={About} />
            <Route exact path="/weblog" component={Weblog} />
            <Route exact path="/terms" component={Terms} />
            <Route exact path="/contact" component={Contact} />
            <Route exact path="/UserAuth" component={UserAuth} />

            <AuthRoute path="/user" component={UserProfile} />
            <AuthRoute path="/bid" component={Bid} />
            <Footer />
          </Router>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
