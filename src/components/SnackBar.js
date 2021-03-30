import { Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import MuiAlert from '@material-ui/lab/Alert';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import store from '../redux/store';
import { CLEAR_MESSAGES, CLEAR_ERRORS } from '../redux/types';

class SnackBar extends Component {
  state = {
    open: false,
    vertical: 'top',
    horizontal: 'right',
    type: '',
    message: '',
  };
  handleClose = () => {
    this.setState({ open: false });
    store.dispatch({ type: CLEAR_MESSAGES });
    store.dispatch({ type: CLEAR_ERRORS });
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors && nextProps.UI.errors.error) {
      this.setState({
        type: 'error',
        message: nextProps.UI.errors.error,
        open: true,
      });
    }
    if (nextProps.UI.messages && nextProps.UI.messages.message) {
      this.setState({
        type: 'success',
        message: nextProps.UI.messages.message,
        open: true,
      });
    }
  }

  render() {
    const { open, vertical, horizontal, message, type } = this.state;
    return (
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        autoHideDuration={5000}
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

const mapStateToProps = (state) => ({
  UI: state.UI,
});
export default connect(mapStateToProps, {})(SnackBar);
