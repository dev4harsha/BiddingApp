import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { MdFingerprint } from 'react-icons/md';
import { FaBars, FaTimes } from 'react-icons/fa';
//import { Button } from '../Button';
import './Navbar.css';
import { IconContext } from 'react-icons/lib';

import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  DialogContentText,
  DialogActions,
  Avatar,
} from '@material-ui/core';

const Navbar = () => {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const signOutbtnClick = async () => {};

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className="navbar">
          <div className="navbar-container container">
            <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
              <MdFingerprint className="navbar-icon"></MdFingerprint>
              BID
            </Link>
            <div className="menu-icon" onClick={handleClick}>
              {click ? <FaTimes /> : <FaBars />}
            </div>

            <ul className={click ? 'nav-menu active ' : 'nav-menu'}>
              <li className="nav-item">
                <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/auction"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  Auction
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/terms"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  Terms
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/weblog"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  Weblog
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/about"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  About Us
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/contact"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  Contact Us
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/faq" className="nav-links" onClick={closeMobileMenu}>
                  FAQ
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  to="/user"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  <Button>
                    <Avatar variant="circular" alt="Remy Sharp" src="" />
                  </Button>
                </Link>
              </li>
              <li className="nav-btn">
                <Link
                  to="/UserAuth"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={signOutbtnClick}
                  >
                    LogOut
                  </Button>
                </Link>
              </li>

              <li className="nav-btn">
                <Link
                  to="/UserAuth"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  <Button variant="contained" color="primary">
                    SIGN UP
                  </Button>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </IconContext.Provider>
    </>
  );
};

export default Navbar;
