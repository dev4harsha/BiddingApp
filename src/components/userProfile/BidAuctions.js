import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Grid,
  IconButton,
  Paper,
  Tooltip,
  Typography,
  withStyles,
} from '@material-ui/core';
import { connect } from 'react-redux';
import {
  getUserBidAuctions,
  makePayment,
} from '../../redux/actions/auctionActions';
import { ScaleLoader } from 'react-spinners';
import {
  overrideScaleLoaderCSS,
  paymentBuyerStatus,
  buyerDeliveryStatus,
  soldStatus,
} from '../../constant';
import VisibilityIcon from '@material-ui/icons/Visibility';
import ViewAuctionPopDetails from './ViewAuctionPopDetails';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import { withRouter } from 'react-router';

const styles = (theme) => ({
  gridContainer: {
    textAlign: 'center',
    direction: 'column',
    justify: 'center',
    alignItems: 'center',
  },

  paper: {
    marginBottom: '15px',
  },
});
class BidAuctions extends Component {
  state = {
    viweAuctionPop: false,
    userAuction: null,
  };
  viewDelivery(auctionId) {
    this.props.history.push(`/user/bidAuction/delivery/${auctionId}`, {
      selectedIndex: 0,
      isBuyer: true,
    });
  }
  handleViewAuctionPop(userAuction = null) {
    this.setState({
      viweAuctionPop: !this.state.viweAuctionPop,
      userAuction: userAuction,
    });
  }
  componentWillMount() {
    this.props.getUserBidAuctions();
  }
  handleMakePayment = (auctionId, index) => {
    this.props.makePayment(auctionId, index);
  };

  render() {
    const { classes } = this.props;
    const { userAuctions, loading } = this.props.auction;
    const { credentials } = this.props.user;

    let bidAuctionMarkUp = !loading ? (
      userAuctions.length > 0 ? (
        userAuctions.map((userAuction, index) => (
          <Paper className={classes.paper} key={index}>
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
                  <Typography variant="h6">
                    {userAuction.auctionName}
                  </Typography>
                )}
              </Grid>

              <Grid item>
                <Typography variant="body2">Buy Now Price</Typography>
                {userAuction.buyNowAmount && (
                  <Typography variant="h6">
                    {userAuction.buyNowAmount}
                  </Typography>
                )}
              </Grid>
              <Grid item>
                <Typography variant="body2">Heighest Bid</Typography>
                {userAuction.maxBid && (
                  <Typography variant="h6">{userAuction.maxBid}</Typography>
                )}
              </Grid>
              {userAuction.approval === 1 && (
                <Grid item>
                  <Typography variant="body2">Auction Status</Typography>

                  <Typography variant="h6">
                    {soldStatus[userAuction.sold]}
                  </Typography>
                </Grid>
              )}
              {userAuction.maxBidUserId === credentials.userId &&
                userAuction.sold === 1 && (
                  <Grid item>
                    <Typography variant="body2">Payment Status</Typography>
                    {userAuction.payment == 1 ? (
                      <Button
                        variant="outlined"
                        size="small"
                        color="primary"
                        onClick={() =>
                          this.handleMakePayment(userAuction.auctionId, index)
                        }
                      >
                        Make Payment
                      </Button>
                    ) : userAuction.maxBidUserId === credentials.userId &&
                      userAuction.sold === 1 ? (
                      <Typography variant="h6">
                        {paymentBuyerStatus[userAuction.payment]}
                      </Typography>
                    ) : null}
                  </Grid>
                )}

              {userAuction.maxBidUserId === credentials.userId &&
                userAuction.sold === 1 &&
                userAuction.payment == 2 && (
                  <Grid item>
                    <Typography variant="body2">Delivery Status</Typography>
                    {userAuction.delivery !== 0 ? (
                      <Button
                        variant="outlined"
                        size="small"
                        color="primary"
                        onClick={() => this.viewDelivery(userAuction.auctionId)}
                      >
                        {buyerDeliveryStatus[userAuction.delivery]}
                      </Button>
                    ) : (
                      <Typography variant="h6">
                        {buyerDeliveryStatus[userAuction.delivery]}
                      </Typography>
                    )}
                  </Grid>
                )}

              <Grid item>
                <Tooltip title="View Auction Details" aria-label="add">
                  <IconButton
                    color="secondary"
                    onClick={() => this.handleViewAuctionPop(userAuction)}
                  >
                    <VisibilityIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Paper>
        ))
      ) : (
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
              <Typography variant="h6">
                You have no bids on Auctions!
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      )
    ) : (
      <ScaleLoader
        css={overrideScaleLoaderCSS}
        size={150}
        color={'#eb4034'}
        loading={loading}
      />
    );
    return (
      <>
        {bidAuctionMarkUp}
        {this.state.userAuction && (
          <ViewAuctionPopDetails
            userAuction={this.state.userAuction}
            open={this.state.viweAuctionPop}
            close={() => this.handleViewAuctionPop()}
          />
        )}
      </>
    );
  }
}
BidAuctions.propTypes = { classes: PropTypes.object.isRequired };
const mapStateProps = (state) => ({
  auction: state.auction,
  user: state.user,
});

const mapActionsToProps = {
  getUserBidAuctions,
  makePayment,
};
export default withRouter(
  connect(mapStateProps, mapActionsToProps)(withStyles(styles)(BidAuctions))
);
