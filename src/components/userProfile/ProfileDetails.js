import React, { useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { ScaleLoader } from 'react-spinners';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import {
  Container,
  Grid,
  Typography,
  TextField,
  Paper,
  Card,
  CardActionArea,
  CardMedia,
  Box,
  CircularProgress,
  Button,
} from '@material-ui/core';
import { Component } from 'react';
import { uploadImage } from '../../redux/actions/userActions';
import EditDetails from './EditDetails';

const styles = (theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  paper: {},
  media: {
    height: 240,
  },
  card: {},
  gridItems: {},
  gridContainer: {
    textAlign: 'center',
    direction: 'column',
    justify: 'center',
    alignItems: 'center',
    padding: 10,
  },
  input: {
    display: 'none',
  },
  inputDiv: {
    margin: theme.spacing(1),
  },
});
const override = `
        display: flex;
        align-items: center;
        justify-content: center;
        border-color: red;
    `;
class ProfileDetails extends Component {
  handleImageChange = (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append('image', image, image.name);
    this.props.uploadImage(formData);
  };
  render() {
    const {
      classes,
      user: {
        credentials: {
          country,
          email,
          firstName,
          lastName,
          createdAt,
          imageUrl,
          mobile,
        },
        loading,
      },
    } = this.props;

    let profileMarkUp = (
      <Paper className={classes.paper}>
        <Grid container className={classes.gridContainer}>
          <Grid item xs={12} sm={12} md={4}>
            <CardMedia className={classes.media} image={imageUrl} />
          </Grid>
          <Grid
            container
            direction="row"
            justify="center"
            item
            xs={12}
            sm={12}
            md={8}
          >
            <Grid container justify="center" className={classes.inputDiv}>
              <Grid item xs={6} sm={3} md={3} className={classes.gridItems}>
                <Typography variant="body2">First Name</Typography>
                {firstName && (
                  <>
                    <Typography variant="h6">{firstName}</Typography>
                  </>
                )}
              </Grid>
              <Grid item xs={6} sm={3} md={3} className={classes.gridItems}>
                <Typography variant="body2">Last Name</Typography>
                {lastName && (
                  <>
                    <Typography variant="h6">{lastName}</Typography>
                  </>
                )}
              </Grid>{' '}
              <Grid item xs={6} sm={3} md={3} className={classes.gridItems}>
                <Typography variant="body2">Email Address</Typography>
                {email && (
                  <>
                    <Typography variant="h6">{email}</Typography>
                  </>
                )}
              </Grid>
              <Grid item xs={6} sm={3} md={3} className={classes.gridItems}>
                <Typography variant="body2">Country</Typography>
                {country && (
                  <>
                    <Typography variant="h6">{country}</Typography>
                  </>
                )}{' '}
              </Grid>{' '}
              <Grid item xs={6} sm={3} md={3} className={classes.gridItems}>
                <Typography variant="body2">Mobile</Typography>
                {mobile && (
                  <>
                    <Typography variant="h6">{mobile}</Typography>
                  </>
                )}{' '}
              </Grid>{' '}
              <Grid item xs={6} sm={3} md={3} className={classes.gridItems}>
                <Typography variant="body2">Member since</Typography>
                {createdAt && (
                  <>
                    <Typography variant="h6">
                      {moment({ createdAt }).utc().format('YYYY-MM-DD')}
                    </Typography>
                  </>
                )}
              </Grid>
            </Grid>
            <Grid item className={classes.inputDiv}>
              <>
                <input
                  accept="image/*"
                  className={classes.input}
                  id="imageInput"
                  type="file"
                  onChange={this.handleImageChange}
                />
                <label htmlFor="imageInput">
                  <Button
                    variant="contained"
                    color="primary"
                    component="span"
                    disabled={loading}
                  >
                    Change Image
                  </Button>
                </label>
              </>
            </Grid>
            <Grid item className={classes.inputDiv}>
              <EditDetails />
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    );
    return <>{profileMarkUp}</>;
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});
const mapActionsToProps = { uploadImage };
ProfileDetails.propTypes = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  uploadImage: PropTypes.func.isRequired,
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(ProfileDetails));
