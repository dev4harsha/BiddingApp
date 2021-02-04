
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
import 'fontsource-roboto';

function App() {
  return (
    <Router>
      <Navbar/>
      <Switch>
        <Route path='/' exact component={Home}/>
        <Route path='/contact' component={Contact} />
        <Route path='/auction' component={Auction} />
        <Route path='/terms' component={Terms} />
        <Route path='/weblog' component={Weblog} />
        <Route path='/about' component={About} />
        <Route path='/faq' component={Faq} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
