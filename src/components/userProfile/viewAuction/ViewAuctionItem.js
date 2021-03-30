import React, { Component } from 'react';
import moment from 'moment';
import {
  IconButton,
  Container,
  Grid,
  Typography,
  TextField,
  Paper,
  withStyles,
} from '@material-ui/core';
import {
  getUserAuctions,
  auctionStatusChange,
  deleteUserAuction,
} from '../../../redux/actions/auctionActions';
import { Edit, Delete } from '@material-ui/icons';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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
  paper: {
    marginBottom: '15px',
  },
});
class ViewAuctionItem extends Component {
  handleAuctionStatusChange = () => {
    this.props.auctionStatusChange(
      this.props.userAucton.auctionId,
      this.props.index
    );
  };
  handleDeleteUserAuction = () => {
    this.props.deleteUserAuction(
      this.props.userAucton.auctionId,
      this.props.index
    );
    console.log(this.props.index);
  };

  render() {
    const { classes } = this.props;
    const { userAucton } = this.props;
    return (
      <Paper className={classes.paper}>
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
              <Typography variant="h6">{userAucton.itemDescription}</Typography>
            )}
          </Grid>
          <Grid item>
            <Typography variant="body2">Created at</Typography>
            {userAucton.createdAt && (
              <Typography variant="h6">
                {moment
                  .unix(userAucton.createdAt._seconds)
                  .format('MM/DD/YYYY h:mm:ss A')}
              </Typography>
            )}
          </Grid>
          <Grid item>
            <Typography variant="body2">End Date</Typography>
            {userAucton.endDateTime && (
              <Typography variant="h6">
                {moment
                  .unix(userAucton.endDateTime._seconds)
                  .format('MM/DD/YYYY h:mm:ss A')}
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
            <Typography variant="body2">Buy Now Price</Typography>
            {userAucton.buyNowAmount && (
              <Typography variant="h6">{userAucton.buyNowAmount}</Typography>
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

            <Typography variant="h6">
              {userAucton.approval ? 'Approved' : 'Not Approved'}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2">Status</Typography>
            <>
              <IconButton onClick={this.handleAuctionStatusChange}>
                {userAucton.active ? (
                  <VisibilityIcon color="primary" />
                ) : (
                  <VisibilityOffIcon color="secondary" />
                )}
              </IconButton>
            </>
          </Grid>
          <Grid item>
            <Typography variant="body2">Remove</Typography>
            <IconButton
              color="secondary"
              onClick={this.handleDeleteUserAuction}
            >
              <DeleteIcon />
            </IconButton>
          </Grid>
          <Grid item>
            <Typography variant="body2">Edit</Typography>
            <IconButton color="secondary">
              <EditIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

ViewAuctionItem.propType = {
  classes: PropTypes.object.isRequired,
};
const mapStateProps = (state) => ({
  auction: state.auction,
});

const mapActionsToProps = {
  auctionStatusChange,
  deleteUserAuction,
};
export default connect(
  mapStateProps,
  mapActionsToProps
)(withStyles(styles)(ViewAuctionItem));
