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
    auction: null,
  };
  viewDelivery(auctionId) {
    this.props.history.push(`/user/bidAuction/delivery/${auctionId}`, {
      selectedIndex: 0,
      isBuyer: true,
    });
  }
  handleViewAuctionPop(auction = null) {
    this.setState({
      viweAuctionPop: !this.state.viweAuctionPop,
      auction: auction,
    });
  }
  componentDidMount() {
    this.props.getUserBidAuctions();
  }
  handleMakePayment = (auctionId, index) => {
    this.props.makePayment(auctionId, index);
  };

  render() {
    const { classes, user } = this.props;
    const { auctions, loading } = this.props.auction;

    let bidAuctionMarkUp = !loading ? (
      auctions.length > 0 ? (
        auctions.map((auction, index) => (
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
                {auction.auctionName && (
                  <Typography variant="h6">{auction.auctionName}</Typography>
                )}
              </Grid>

              <Grid item>
                <Typography variant="body2">Buy Now Price</Typography>
                {auction.buyNowAmount && (
                  <Typography variant="h6">{auction.buyNowAmount}</Typography>
                )}
              </Grid>
              <Grid item>
                <Typography variant="body2">Heighest Bid</Typography>
                {auction.maxBid && (
                  <Typography variant="h6">{auction.maxBid}</Typography>
                )}
              </Grid>
              {auction.approval === 1 && (
                <Grid item>
                  <Typography variant="body2">Auction Status</Typography>

                  <Typography variant="h6">
                    {soldStatus[auction.sold]}
                  </Typography>
                </Grid>
              )}

              {auction.maxBidUserId === user.userId && auction.sold === 1 && (
                <Grid item>
                  <Typography variant="body2">Payment Status</Typography>
                  {auction.payment == 1 ? (
                    <Button
                      variant="outlined"
                      size="small"
                      color="primary"
                      onClick={() =>
                        this.handleMakePayment(auction.auctionId, index)
                      }
                    >
                      Make Payment
                    </Button>
                  ) : auction.maxBidUserId === user.userId &&
                    auction.sold === 1 ? (
                    <Typography variant="h6">
                      {paymentBuyerStatus[auction.payment]}
                    </Typography>
                  ) : null}
                </Grid>
              )}

              {auction.maxBidUserId === user.userId &&
                auction.sold === 1 &&
                auction.payment == 2 && (
                  <Grid item>
                    <Typography variant="body2">Delivery Status</Typography>
                    {auction.delivery !== 0 ? (
                      <Button
                        variant="outlined"
                        size="small"
                        color="primary"
                        onClick={() => this.viewDelivery(auction.auctionId)}
                      >
                        {buyerDeliveryStatus[auction.delivery]}
                      </Button>
                    ) : (
                      <Typography variant="h6">
                        {buyerDeliveryStatus[auction.delivery]}
                      </Typography>
                    )}
                  </Grid>
                )}

              <Grid item>
                <Tooltip title="View Auction Details" aria-label="add">
                  <IconButton
                    color="secondary"
                    onClick={() => this.handleViewAuctionPop(auction)}
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
        {this.state.auction && (
          <ViewAuctionPopDetails
            userAuction={this.state.auction}
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
  user: state.firebase.profile,
});

const mapActionsToProps = {
  getUserBidAuctions,
  makePayment,
};
export default withRouter(
  connect(mapStateProps, mapActionsToProps)(withStyles(styles)(BidAuctions))
);
