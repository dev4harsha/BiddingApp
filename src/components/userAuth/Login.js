import { withStyles } from '@material-ui/core';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { Button, Typography, TextField, Paper } from '@material-ui/core';
import { loginUser } from '../../redux/actions/userActions';
const styles = (theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  container: {
    paddingTop: theme.spacing(3),
  },
  formButton: {
    margin: '8px',
    height: '60px',
    fontSize: '20px',
    backgroundColor: '#1c2237',
    border: '1px solid #fff',
    '&:hover': {
      backgroundColor: '#1c2237',
      color: '#FFF',
      border: '1px solid #f00946',
    },
  },
  paper: {
    padding: theme.spacing(3),
    textAlign: 'center',
  },
  customError: {
    color: 'red',
    marginTop: '10px',
  },
});
class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errors: {},
    };

    this.handleChange = this.handleChange.bind(this);
  }
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
    if (!nextProps.auth.isEmpty) {
      nextProps.history.location.state
        ? nextProps.history.push(nextProps.history.location.state.from)
        : nextProps.history.push('/user');
    }
  }
  signInOnSubmit = (event) => {
    event.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };

    this.props.loginUser(userData);
  };

  render() {
    const {
      classes,
      auth: { isLoaded },
    } = this.props;
    const { errors } = this.state;
    return (
      <Paper className={classes.paper}>
        <Typography variant="h5" align="center">
          Login
        </Typography>

        <form
          onSubmit={this.signInOnSubmit}
          className={classes.root}
          noValidate
          autoComplete="on"
        >
          <TextField
            fullWidth
            id="email"
            label="Email"
            variant="outlined"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
            helperText={errors.email}
            error={errors.email ? true : false}
          />
          <TextField
            fullWidth
            id="password"
            label="Password"
            variant="outlined"
            type="password"
            name="password"
            value={this.state.password}
            helperText={errors.password}
            error={errors.password ? true : false}
            onChange={this.handleChange}
          />
          {errors.error && (
            <Typography variant="body2" className={classes.customError}>
              {errors.error}
            </Typography>
          )}
          <Button
            fullWidth
            className={classes.formButton}
            variant="contained"
            color="primary"
            type="submit"
            disabled={!isLoaded}
          >
            Login
          </Button>
        </form>
      </Paper>
    );
  }
}

Login.propType = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
};
//takes globl stats
const mapStateProps = (state) => ({
  auth: state.firebase.auth,
  UI: state.UI,
});
//which action we use
const mapActionsToProps = {
  loginUser,
};
export default withRouter(
  connect(mapStateProps, mapActionsToProps)(withStyles(styles)(Login))
);
