import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import {MdFingerprint} from 'react-icons/md';
import {FaBars, FaTimes} from 'react-icons/fa';
import { Button } from './Button';
import './Navbar.css';
import {IconContext} from 'react-icons/lib'

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if(window.innerWidth <= 1250){
      setButton(false);
    } else{
      setButton(true);
    }
  };
  useEffect(() =>{
    showButton();
  },[]);

  window.addEventListener('resize', showButton);
  

    return (
      <>
      <IconContext.Provider value={{ color: '#fff'}}>
      <div className="navbar">
          <div className="navbar-container container">
            <Link className="navbar-logo" onClick={closeMobileMenu}>
              <MdFingerprint className="navbar-icon"></MdFingerprint>
                BID DOMAIN
            </Link>
            <div className="menu-icon" onClick={handleClick}>
            {click ? <FaTimes/> : <FaBars/>}
            </div>

            <ul className={click ? 'nav-menu active ': 'nav-menu'}>
              <li className="nav-item">
                <Link to='/' className="nav-links" onClick={closeMobileMenu}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to='/auction' className="nav-links" onClick={closeMobileMenu}>
                  Auction
                </Link>
              </li>
              <li className="nav-item">
                <Link to='/terms-and-conditions' className="nav-links" onClick={closeMobileMenu}>
                  Terms and Conditions
                </Link>
              </li>
              <li className="nav-item">
                <Link to='/weblog' className="nav-links" onClick={closeMobileMenu}>
                  Weblog
                </Link>
              </li>
              <li className="nav-item">
                <Link to='/about-us' className="nav-links" onClick={closeMobileMenu}>
                  About Us
                </Link>
              </li>
              <li className="nav-item">
                <Link to='/contact-us' className="nav-links" onClick={closeMobileMenu}>
                  Contact Us
                </Link>
              </li>
              <li className="nav-item">
                <Link to='/faq' className="nav-links" onClick={closeMobileMenu}>
                  FAQ
                </Link>
              </li>
              <li className="nav-btn">
                {button ? (
                  <Link to='/sign-up' className="btn-link" >
                    <Button buttonStyle='btn--outline'>SIGN UP</Button>
                  </Link>
                ) : (
                  <Link to='/sign-up' className="btn-link" onClick={closeMobileMenu}>
                    <Button buttonStyle='btn--outline' buttonSize='btn-mobile'>
                      SIGN UP
                    </Button>
                  </Link>
                )}
              </li>
            </ul>
          </div>
      </div>
      </IconContext.Provider>
      </>
    )
}

export default Navbar
