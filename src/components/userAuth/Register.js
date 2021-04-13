import { withStyles } from '@material-ui/core';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { signupUser } from '../../redux/actions/userActions';
import { Button, Typography, TextField, Paper } from '@material-ui/core';
import PropTypes from 'prop-types';
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
class Register extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      errors: {},
    };

    this.signUpOnSubmit = this.signUpOnSubmit.bind(this);
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
    if (!nextProps.user.isEmpty) {
      nextProps.history.location.state
        ? nextProps.history.push(nextProps.history.location.state.from)
        : nextProps.history.push('/user');
    }
  }

  signUpOnSubmit = (event) => {
    event.preventDefault();
    const NewUserData = {
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
    };

    this.props.signupUser(NewUserData);
  };
  render() {
    const {
      classes,
      UI: { loading },
    } = this.props;
    const { errors } = this.state;
    return (
      <>
        <Paper className={classes.paper}>
          <Typography variant="h5" align="center">
            Create Account
          </Typography>

          <form
            onSubmit={this.signUpOnSubmit}
            className={classes.root}
            noValidate
            autoComplete="on"
          >
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email"
              variant="outlined"
              onChange={this.handleChange}
              helperText={errors.email}
              error={errors.email ? true : false}
            />
            <TextField
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              variant="outlined"
              onChange={this.handleChange}
              helperText={errors.password}
              error={errors.password ? true : false}
            />
            <TextField
              fullWidth
              id="confirmPassword"
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              variant="outlined"
              onChange={this.handleChange}
              helperText={errors.confirmPassword}
              error={errors.confirmPassword ? true : false}
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
            >
              Register
            </Button>
          </form>
        </Paper>
      </>
    );
  }
}

Register.propType = {
  classes: PropTypes.object.isRequired,

  UI: PropTypes.object.isRequired,
  signupUser: PropTypes.func.isRequired,
};
//takes globl stats
const mapStateProps = (state) => ({
  user: state.firebase.auth,
  UI: state.UI,
});
//which action we use
const mapActionsToProps = {
  signupUser,
};
export default withRouter(
  connect(mapStateProps, mapActionsToProps)(withStyles(styles)(Register))
);
