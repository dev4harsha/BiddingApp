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
  Button,
} from '@material-ui/core';
import {
  getUserAuctions,
  endAuction,
  deleteUserAuction,
  makePayment,
} from '../../redux/actions/auctionActions';
import { Edit, Delete } from '@material-ui/icons';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AddEditAuction from './AddEditAuction';
import EventBusyIcon from '@material-ui/icons/EventBusy';
import { approvalStatus } from '../../constant';
import { USER_END_AUCTION } from '../../redux/types';
import { paymentStatus } from '../../constant';
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
  state = {
    openEditDialog: false,
  };
  handleEndAuction = () => {
    this.props.endAuction(this.props.userAuction.auctionId, this.props.index);
  };
  handleDeleteUserAuction = () => {
    this.props.deleteUserAuction(
      this.props.userAuction.auctionId,
      this.props.index
    );
  };
  handleOpenEditDialog = () => {
    this.setState({ openEditDialog: true });
  };
  handleCloseEditDialog = () => {
    this.setState({ openEditDialog: false });
  };
  handleMakePayment = () => {
    this.props.makePayment(this.props.userAuction.auctionId, this.props.index);
  };
  render() {
    const { classes } = this.props;
    const { userAuction, user } = this.props;
    let editDialogMarkUp = this.state.openEditDialog ? (
      <AddEditAuction
        edit={true}
        reduxIndex={this.props.index}
        userAuction={userAuction}
        close={this.handleCloseEditDialog}
      />
    ) : null;
    let paymentMarkUp = (
      <Grid item>
        <Typography variant="body2">Payment Status</Typography>

        <Typography variant="h6">
          {paymentStatus[userAuction.payment]}
        </Typography>
      </Grid>
    );

    return (
      <>
        {editDialogMarkUp}
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
              {userAuction.auctionName && (
                <Typography variant="h6">{userAuction.auctionName}</Typography>
              )}
            </Grid>
            <Grid item>
              <Typography variant="body2">Auction Type</Typography>
              {userAuction.auctionType && (
                <Typography variant="h6">{userAuction.auctionType}</Typography>
              )}
            </Grid>
            <Grid item>
              <Typography variant="body2">Description</Typography>
              {userAuction.itemDescription && (
                <Typography variant="h6">
                  {userAuction.itemDescription}
                </Typography>
              )}
            </Grid>
            <Grid item>
              <Typography variant="body2">Created at</Typography>
              {userAuction.createdAt && (
                <Typography variant="h6">
                  {moment
                    .unix(userAuction.createdAt._seconds)
                    .format('MM/DD/YYYY h:mm A')}
                </Typography>
              )}
            </Grid>
            <Grid item>
              <Typography variant="body2">End Date</Typography>
              {userAuction.endDateTime && (
                <Typography variant="h6">
                  {moment
                    .unix(userAuction.endDateTime._seconds)
                    .format('MM/DD/YYYY h:mm A')}
                </Typography>
              )}
            </Grid>
            <Grid item>
              <Typography variant="body2">Base Price</Typography>
              {userAuction.initAmount && (
                <Typography variant="h6">{userAuction.initAmount}</Typography>
              )}
            </Grid>
            <Grid item>
              <Typography variant="body2">Buy Now Price</Typography>
              {userAuction.buyNowAmount && (
                <Typography variant="h6">{userAuction.buyNowAmount}</Typography>
              )}
            </Grid>
            <Grid item>
              <Typography variant="body2">Heighest Bid</Typography>
              {userAuction.maxBid && (
                <Typography variant="h6">{userAuction.maxBid}</Typography>
              )}
            </Grid>
            <Grid item>
              <Typography variant="body2">No of Bids</Typography>
              {userAuction.bids && (
                <Typography variant="h6">{userAuction.bids}</Typography>
              )}
            </Grid>

            <Grid item>
              <Typography variant="body2">Approval</Typography>

              <Typography variant="h6">
                {approvalStatus[userAuction.approval]}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2">End Auction</Typography>

              <IconButton onClick={this.handleEndAuction}>
                <EventBusyIcon color="primary" />
              </IconButton>
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
              <IconButton color="secondary" onClick={this.handleOpenEditDialog}>
                <EditIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={this.handleMakePayment}
              >
                Make Payment
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </>
    );
  }
}

ViewAuctionItem.propType = {
  classes: PropTypes.object.isRequired,
};
const mapStateProps = (state) => ({
  auction: state.auction,
  user: state.user,
});

const mapActionsToProps = {
  endAuction,
  deleteUserAuction,
  makePayment,
};
export default connect(
  mapStateProps,
  mapActionsToProps
)(withStyles(styles)(ViewAuctionItem));
