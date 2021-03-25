import React from 'react';
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import { ScaleLoader } from 'react-spinners';
import moment from 'moment';
import {
  IconButton,
  Container,
  Grid,
  Typography,
  TextField,
  Paper,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  TableContainer,
  Button,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Table,
  Divider,
  Switch,
} from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';
import withStyles from '@material-ui/core/styles/withStyles';
import { Edit, Delete } from '@material-ui/icons';
import { getUserAuctions } from '../../redux/actions/auctionActions';
import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

const styles = (theme) => ({
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
});

const override = `
        display: flex;
        align-items: center;
        justify-content: center;
        border-color: red;
    `;

class ViewAction extends Component {
  state = {};

  componentDidMount() {
    this.props.getUserAuctions();
  }

  render() {
    const { classes } = this.props;
    const { userAuctions } = this.props.auction;

    let recentDomainsMarkup = userAuctions
      ? userAuctions.map((userAucton) => (
          <Paper className={classes.paper} key={userAucton.auctionId}>
            <Grid
              container
              direction="row"
              justify="center"
              item
              xs={12}
              sm={12}
              md={12}
              spacing={2}
              wrap="wrap"
              className={classes.gridContainer}
            >
              <Grid item>
                <Typography variant="body2">Auction Name</Typography>
                {userAucton.auctionName && (
                  <Typography variant="h6">{userAucton.auctionName}</Typography>
                )}
              </Grid>
              <Grid item>
                <Typography variant="body2">Auction Type</Typography>
                {userAucton.auctionType && (
                  <Typography variant="h6">{userAucton.auctionType}</Typography>
                )}
              </Grid>
              <Grid item>
                <Typography variant="body2">Description</Typography>
                {userAucton.itemDescription && (
                  <Typography variant="h6">
                    {userAucton.itemDescription}
                  </Typography>
                )}
              </Grid>
              <Grid item>
                <Typography variant="body2">Created at</Typography>
                {userAucton.createdAt && (
                  <Typography variant="h6">
                    {moment(userAucton.createdAt)
                      .utc()
                      .format('YYYY-MM-DD hh:mm:ss A')}
                  </Typography>
                )}
              </Grid>
              <Grid item>
                <Typography variant="body2">End Date</Typography>
                {userAucton.endDateTime && (
                  <Typography variant="h6">
                    {moment(userAucton.endDateTime)
                      .utc()
                      .format('YYYY-MM-DD hh:mm:ss A')}
                  </Typography>
                )}
              </Grid>

              <Grid item>
                <Typography variant="body2">Base Price</Typography>
                {userAucton.initAmount && (
                  <Typography variant="h6">{userAucton.initAmount}</Typography>
                )}
              </Grid>
              <Grid item>
                <Typography variant="body2">Heighest Bid</Typography>
                {userAucton.maxBid && (
                  <Typography variant="h6">{userAucton.maxBid}</Typography>
                )}
              </Grid>
              <Grid item>
                <Typography variant="body2">No of Bids</Typography>
                {userAucton.bids && (
                  <Typography variant="h6">{userAucton.bids}</Typography>
                )}
              </Grid>

              <Grid item>
                <Typography variant="body2">Approval</Typography>
                {userAucton.approval && (
                  <Typography variant="h6">
                    {userAucton.approval ? 'Approved' : 'Not Approved'}
                  </Typography>
                )}
              </Grid>
              <Grid item>
                <Typography variant="body2">Status</Typography>
                {userAucton.active && (
                  <>
                    {userAucton.approval ? (
                      <IconButton aria-label="delete" color="primary">
                        <VisibilityIcon />
                      </IconButton>
                    ) : (
                      <IconButton aria-label="delete" color="secondary">
                        <VisibilityOffIcon />
                      </IconButton>
                    )}
                  </>
                )}
              </Grid>
              <Grid item>
                <Typography variant="body2">Remove</Typography>
                <IconButton aria-label="delete" color="secondary">
                  <DeleteIcon />
                </IconButton>
              </Grid>
              <Grid item>
                <Typography variant="body2">Edit</Typography>
                <IconButton aria-label="delete" color="secondary">
                  <EditIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Paper>
        ))
      : null;

    return <>{recentDomainsMarkup}</>;
  }
}

ViewAction.propType = {
  classes: PropTypes.object.isRequired,
};
const mapStateProps = (state) => ({
  auction: state.auction,
});
const mapActionsToProps = {
  getUserAuctions,
};
export default connect(
  mapStateProps,
  mapActionsToProps
)(withStyles(styles)(ViewAction));
