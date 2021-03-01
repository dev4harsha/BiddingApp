import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import firebase from 'firebase';

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

const useStyles = makeStyles((theme) => ({
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
}));

const UserAuth = (props) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const signInbtnClick = async () => {};

  return (
    <>
      <Container maxWidth="sm" className={classes.container}>
        <ToastContainer />
        <Grid item>
          <Tabs
            value={value}
            onChange={handleChange}
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
        <Grid
          item
          className={classes.root}
          justify="space-evenly"
          alignItems="center"
        >
          {value == 0 ? (
            <Paper className={classes.paper}>
              <Typography variant="h5" gutterBottom align="center">
                Create Account
              </Typography>

              <form className={classes.root} noValidate autoComplete="on">
                <TextField
                  fullWidth
                  id="name"
                  label="Name and surename"
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  id="mobile"
                  label="Mobile number"
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  id="email"
                  label="Email"
                  variant="outlined"
                />
                <Button
                  fullWidth
                  className={classes.formButton}
                  variant="contained"
                  color="primary"
                >
                  Register
                </Button>
              </form>
            </Paper>
          ) : (
            <Paper className={classes.paper}>
              <Typography variant="h5" gutterBottom align="center">
                Login
              </Typography>

              <form className={classes.root} noValidate autoComplete="on">
                <TextField
                  fullWidth
                  id="mobile"
                  label="Mobile number"
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  id="otp"
                  label="OPT Code"
                  variant="outlined"
                />
                <Button
                  fullWidth
                  className={classes.formButton}
                  variant="contained"
                  color="primary"
                >
                  Login
                </Button>
              </form>
              <Button
                fullWidth
                className={classes.formButton}
                variant="contained"
                color="primary"
                onClick={signInbtnClick}
              >
                Login with Google
              </Button>
            </Paper>
          )}
        </Grid>
      </Container>
    </>
  );
};

export default UserAuth;
