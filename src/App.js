import { Component } from 'react';
import { Route, useHistory, withRouter } from 'react-router-dom';
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

import AuthRoute from './AuthRoute';

//theme

//Redux

class App extends Component {
  render() {
    return (
      <>
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
      </>
    );
  }
}

export default App;
