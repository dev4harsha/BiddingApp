import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from '@material-ui/core';
import moment from 'moment';
import React, { Component } from 'react';
import { approvalStatus } from '../../constant';

class ViewAuctionPopDetails extends Component {
  handleClose = () => {
    this.setState({ open: false });
    this.props.close();
  };
  render() {
    const { open, userAuction } = this.props;

    return (
      <Dialog
        open={open}
        onClose={this.handleClose}
        scroll="body"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Auction Details</DialogTitle>
        <DialogContent>
          <Grid container justify="center" item spacing={1}>
            <Grid item xs={12}>
              {userAuction.auctionName && (
                <>
                  <Typography variant="body2">Auction Name</Typography>
                  <Typography variant="h6">
                    {userAuction.auctionName}
                  </Typography>
                </>
              )}
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2">Auction Type</Typography>
              {userAuction.auctionType && (
                <Typography variant="h6">{userAuction.auctionType}</Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2">Description</Typography>
              {userAuction.itemDescription && (
                <Typography variant="h6">
                  {userAuction.itemDescription}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2">Created at</Typography>
              {userAuction.createdAt && (
                <Typography variant="h6">
                  {moment
                    .unix(userAuction.createdAt._seconds)
                    .format('MM/DD/YYYY h:mm A')}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2">End Date</Typography>
              {userAuction.endDateTime && (
                <Typography variant="h6">
                  {moment
                    .unix(userAuction.endDateTime._seconds)
                    .format('MM/DD/YYYY h:mm A')}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2">Base Price</Typography>
              {userAuction.initAmount && (
                <Typography variant="h6">{userAuction.initAmount}</Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2">Buy Now Price</Typography>
              {userAuction.buyNowAmount && (
                <Typography variant="h6">{userAuction.buyNowAmount}</Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2">Heighest Bid</Typography>
              {userAuction.maxBid && (
                <Typography variant="h6">{userAuction.maxBid}</Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2">No of Bids</Typography>
              <Typography variant="h6">
                {userAuction.bids.toString()}
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default ViewAuctionPopDetails;
