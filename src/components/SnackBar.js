import { Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import MuiAlert from '@material-ui/lab/Alert';
import React, { Component } from 'react';

import store from '../redux/store';
import { CLEAR_MESSAGE, CLEAR_ERRORS } from '../redux/types';

export class SnackBar extends Component {
  state = {
    open: false,
    vertical: 'top',
    horizontal: 'right',
  };
  handleClose = () => {
    this.setState({ open: false });
    store.dispatch({ type: CLEAR_MESSAGE });
    store.dispatch({ type: CLEAR_ERRORS });
  };
  componentWillMount() {
    this.setState({ open: this.props.open });
  }

  render() {
    const { type, message } = this.props;
    const { open, vertical, horizontal } = this.state;
    return (
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        autoHideDuration={6000}
        open={open}
        onClose={this.handleClose}
        anchorOrigin={{ vertical, horizontal }}
        direction="left"
      >
        <Alert onClose={this.handleClose} severity={type}>
          {message}
        </Alert>
      </Snackbar>
    );
  }
}

export default SnackBar;
