import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
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
import { Container, ThemeProvider } from '@material-ui/core';
import theme from './theme';
import BlogPost from './pages/weblog/BlogPost';
import UserProfile from './pages/userProfile/UserProfile';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react';
import UserAuth from './pages/userProfile/UserAuth';

require('dotenv').config();

function App() {
  const routes = [
    { path: '/auction', component: Auction },
    { path: '/UserAuth', component: UserAuth },
    { path: '/contact', component: Contact },
    { path: '/terms', component: Terms },
    { path: '/weblog', component: Weblog },
    { path: '/about', component: About },
    { path: '/faq', component: Faq },
    { path: '/BlogPost', component: BlogPost },
    { path: '/bid', component: Bid },
    { path: '/user', component: UserProfile },
    { path: '/', component: Home },
  ];
  const routeComponents = routes.map(({ path, component: C }, key) => (
    <Route exact path={path} render={(props) => <C {...props} />} key={key} />
  ));
  return (
    <>
      <ThemeProvider theme={theme}>
        <Router>
          <Navbar />
          <Switch>{routeComponents}</Switch>
          <Footer />
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
