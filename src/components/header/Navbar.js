import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import {MdFingerprint} from 'react-icons/md';
import {FaBars, FaTimes} from 'react-icons/fa';
import { Button } from '../Button';
import './Navbar.css';
import {IconContext} from 'react-icons/lib'
import SignUp from '../pages/userProfile/SignUp';
import { Dialog, DialogContent, DialogTitle, TextField, DialogContentText, DialogActions } from '@material-ui/core';

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [open, setOpen] = useState(false);

  const handleOpen = ()=>{
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  };

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
                <Link to='/terms' className="nav-links" onClick={closeMobileMenu}>
                  Terms and Conditions
                </Link>
              </li>
              <li className="nav-item">
                <Link to='/weblog' className="nav-links" onClick={closeMobileMenu}>
                  Weblog
                </Link>
              </li>
              <li className="nav-item">
                <Link to='/about' className="nav-links" onClick={closeMobileMenu}>
                  About Us
                </Link>
              </li>
              <li className="nav-item">
                <Link to='/contact' className="nav-links" onClick={closeMobileMenu}>
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
                  <Link  className="btn-link" onClick={handleOpen}>
                    <Button buttonStyle='btn--outline'>SIGN UP</Button>
                    
                  </Link>
                ) : (
                  <Link  className="btn-link" onClick={closeMobileMenu}>
                    <Button buttonStyle='btn--outline' buttonSize='btn--mobile'>
                      SIGN UP
                    </Button>
                  </Link>
                )}
              </li>
            </ul>
          </div>
      </div>

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Mobile Number"
            type="email"
            
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="OTP Number"
            type="email"
            
          />
        </DialogContent>
     
      </Dialog>

      </IconContext.Provider>
      </>
    )
}

export default Navbar
