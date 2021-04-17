import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  IconButton,
  Paper,
  Tooltip,
  Typography,
  withStyles,
} from '@material-ui/core';
import { connect } from 'react-redux';
import {
  getUserAuctionsSell,
  getUserAuctionsBuy,
} from '../../redux/actions/auctionActions';
import { ScaleLoader } from 'react-spinners';
import {
  paymentSellerStatus,
  paymentBuyerStatus,
  buyerDeliveryStatus,
  sellerDeliveryStatus,
  soldStatus,
  overrideScaleLoaderCSS,
} from '../../constant';
import VisibilityIcon from '@material-ui/icons/Visibility';
import ViewAuctionPopDetails from './ViewAuctionPopDetails';

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
class HistoryBuySell extends Component {
  state = {
    viweAuctionPop: false,
    userAuction: null,
  };
  handleViewAuctionPop(userAuction = null) {
    this.setState({
      viweAuctionPop: !this.state.viweAuctionPop,
      userAuction: userAuction,
    });
  }
  componentDidMount() {
    this.loadDataToRedux(this.props);
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.componentType != nextProps.componentType)
      this.loadDataToRedux(nextProps);
  }
  loadDataToRedux(props) {
    if (props.componentType === 'sell') {
      //  props.getUserAuctionsSell();
    } else if (props.componentType === 'buy') {
      // props.getUserAuctionsBuy();
    }
  }
  render() {
    const { classes } = this.props;
    const { auctions, loading } = this.props.auction;

    let bidAuctionMarkUp = !loading ? (
      auctions.length > 0 ? (
        auctions.map((userAuction, index) => (
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
                <Typography variant="body2">
                  {this.props.componentType == 'buy'
                    ? 'Buy Amount'
                    : 'Sold Amount'}
                </Typography>
                {userAuction.maxBid && (
                  <Typography variant="h6">{userAuction.maxBid}</Typography>
                )}
              </Grid>
              <Grid item>
                <Typography variant="body2"> Auction</Typography>
                <Typography variant="h6">
                  {soldStatus[userAuction.sold]}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2"> Payment</Typography>
                {this.props.componentType == 'buy' ? (
                  <Typography variant="h6">
                    {paymentBuyerStatus[userAuction.payment]}
                  </Typography>
                ) : (
                  <Typography variant="h6">
                    {paymentSellerStatus[userAuction.payment]}
                  </Typography>
                )}
              </Grid>
              <Grid item>
                <Typography variant="body2"> Delivery</Typography>
                {this.props.componentType == 'buy' ? (
                  <Typography variant="h6">
                    {buyerDeliveryStatus[userAuction.delivery]}
                  </Typography>
                ) : (
                  <Typography variant="h6">
                    {sellerDeliveryStatus[userAuction.payment]}
                  </Typography>
                )}
              </Grid>

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
              <Typography variant="h6">Auctions not available!</Typography>
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
HistoryBuySell.propTypes = { classes: PropTypes.object.isRequired };
const mapStateProps = (state) => ({
  auction: state.auction,
});

const mapActionsToProps = {};
export default connect(
  mapStateProps,
  mapActionsToProps
)(withStyles(styles)(HistoryBuySell));
