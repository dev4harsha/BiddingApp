

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Contact from './components/pages/contact/Contact';
import Footer from './components/footer/Footer';
import Navbar from './components/header/Navbar';
import Home from './components/pages/home/Home';
import Auction from './components/pages/auction/Auction';
import Terms from './components/pages/terms/Terms';
import Weblog from './components/pages/weblog/Weblog';
import About from './components/pages/about/About';
import Faq from './components/pages/faq/Faq';
import Bid from './components/pages/auction/bid/Bid'
import 'fontsource-roboto';
import { Container, ThemeProvider } from '@material-ui/core';
import theme from './theme';
import BlogPost from './components/pages/weblog/BlogPost';
import UserProfile from './components/pages/userProfile/view/UserProfile';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react';
import UserAuth from './components/pages/userProfile/view/UserAuth';
import { UserContextProvider } from './contexts/user';

require('dotenv').config()

function App() {



  const routes = [
    { path: '/auction', component: Auction, },
    { path: '/UserAuth', component: UserAuth, },
    { path: '/contact', component: Contact, },
    { path: '/terms', component: Terms, },
    { path: '/weblog', component: Weblog, },
    { path: '/about', component: About, },
    { path: '/faq', component: Faq, },
    { path: '/BlogPost', component: BlogPost, },
    { path: '/bid', component: Bid, },
    { path: '/user', component: UserProfile, },
    { path: '/', component: Home, },
  ]
  const routeComponents = routes.map(({ path, component: C }, key) => <Route exact path={path} render={(props) => <C {...props} />} key={key} />);
  return (
    <>


      <ThemeProvider theme={theme}>

        <Router>
          <UserContextProvider>
            <Navbar />
            <Switch>
              {routeComponents}
            </Switch>
            <Footer />
          </UserContextProvider>
        </Router>
      </ThemeProvider>
    </>
  );

}

export default App;
