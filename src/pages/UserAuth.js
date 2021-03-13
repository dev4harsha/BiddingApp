import React, { Component } from 'react';
import firebase from 'firebase';
import axios from 'axios';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import {
  Tab,
  Button,
  Container,
  Grid,
  Typography,
  TextField,
  Paper,
  Tabs,
} from '@material-ui/core';
import { FaSignInAlt } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
//Redux
import { connect } from 'react-redux';
import { loginUser, signupUser } from '../redux/actions/userActions';

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

class UserAuth extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      errors: {},
      tabValue: 0,
    };
  }
  //const [value, setValue] = useState(0);
  handleChangeTab = (event, newValue) => {
    this.setState({ tabValue: newValue });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
  }

  signInOnSubmit = (event) => {
    event.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.loginUser(userData, this.props.history);
  };

  signUpOnSubmit = (event) => {
    event.preventDefault();
    const NewUserData = {
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
    };

    this.props.signupUser(NewUserData, this.props.history);
  };

  render() {
    const {
      classes,
      UI: { loading },
    } = this.props;
    const { errors } = this.state;

    return (
      <Container maxWidth="sm" className={classes.container}>
        <ToastContainer />
        <Grid item>
          <Tabs
            value={this.state.tabValue}
            onChange={this.handleChangeTab}
            variant="fullWidth"
            indicatorColor="secondary"
            textColor="secondary"
            aria-label="icon label tabs example"
          >
            <Tab label="Register" />
            <Tab label="Log In" />
            {/* <Tab icon={<FavoriteIcon />} label="Log In" /> */}
          </Tabs>
        </Grid>
        <Grid item className={classes.root}>
          {this.state.tabValue == 0 ? (
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
          ) : (
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
                  disabled={loading}
                >
                  Login
                </Button>
              </form>
            </Paper>
          )}
        </Grid>
      </Container>
    );
  }
}

UserAuth.propType = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  signupUser: PropTypes.func.isRequired,
};
//takes globl stats
const mapStateProps = (state) => ({
  user: state.user,
  UI: state.UI,
});
//which action we use
const mapActionsToProps = {
  loginUser,
  signupUser,
};
export default connect(
  mapStateProps,
  mapActionsToProps
)(withStyles(styles)(UserAuth));
