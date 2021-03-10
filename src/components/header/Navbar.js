import React, { useState, Component, useContext } from 'react';
import { Link } from 'react-router-dom';
import { MdFingerprint } from 'react-icons/md';
import { FaBars, FaTimes } from 'react-icons/fa';
//import { Button } from '../Button';
import './Navbar.css';
import { IconContext } from 'react-icons/lib';

import { Button, Avatar } from '@material-ui/core';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      click: false,
    };
  }

  handleClick = (event) => {
    this.setState({ click: !this.state.click });
  };
  closeMobileMenu = (event) => {
    this.setState({ click: false });
  };

  signOutbtnClick = () => {};

  render() {
    const { authenticated } = this.props;

    return (
      <>
        <IconContext.Provider value={{ color: '#fff' }}>
          <div className="navbar">
            <div className="navbar-container container">
              <Link
                to="/"
                className="navbar-logo"
                onClick={this.closeMobileMenu}
              >
                <MdFingerprint className="navbar-icon"></MdFingerprint>
                BID
              </Link>
              <div className="menu-icon" onClick={this.handleClick}>
                {this.state.click ? <FaTimes /> : <FaBars />}
              </div>

              <ul
                className={this.state.click ? 'nav-menu active ' : 'nav-menu'}
              >
                <li className="nav-item">
                  <Link
                    to="/"
                    className="nav-links"
                    onClick={this.closeMobileMenu}
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/auction"
                    className="nav-links"
                    onClick={this.closeMobileMenu}
                  >
                    Auction
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/terms"
                    className="nav-links"
                    onClick={this.closeMobileMenu}
                  >
                    Terms
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/weblog"
                    className="nav-links"
                    onClick={this.closeMobileMenu}
                  >
                    Weblog
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/about"
                    className="nav-links"
                    onClick={this.closeMobileMenu}
                  >
                    About Us
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/contact"
                    className="nav-links"
                    onClick={this.closeMobileMenu}
                  >
                    Contact Us
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/faq"
                    className="nav-links"
                    onClick={this.closeMobileMenu}
                  >
                    FAQ
                  </Link>
                </li>
                {authenticated ? (
                  <>
                    <li className="nav-item">
                      <Link
                        to="/user"
                        className="nav-links"
                        onClick={this.closeMobileMenu}
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
                        onClick={this.closeMobileMenu}
                      >
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={this.signOutbtnClick}
                        >
                          LogOut
                        </Button>
                      </Link>
                    </li>
                  </>
                ) : (
                  <li className="nav-btn">
                    <Link
                      to="/UserAuth"
                      className="nav-links"
                      onClick={this.closeMobileMenu}
                    >
                      <Button variant="contained" color="primary">
                        SIGN UP
                      </Button>
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </IconContext.Provider>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
});
Navbar.propTypes = {
  authenticated: PropTypes.bool.isRequired,
};
export default connect(mapStateToProps)(Navbar);
