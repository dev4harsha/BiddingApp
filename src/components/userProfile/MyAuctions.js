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
  getUserAuctions,
  deleteUserAuction,
  endAuction,
} from '../../redux/actions/auctionActions';
import { ScaleLoader } from 'react-spinners';
import {
  approvalStatus,
  overrideScaleLoaderCSS,
  paymentSellerStatus,
  soldStatus,
  sellerDeliveryStatus,
} from '../../constant';
import VisibilityIcon from '@material-ui/icons/Visibility';
import ViewAuctionPopDetails from './ViewAuctionPopDetails';
import DeleteIcon from '@material-ui/icons/Delete';
import AddEditAuction from './AddEditAuction';
import EditIcon from '@material-ui/icons/Edit';
import EventBusyIcon from '@material-ui/icons/EventBusy';
import AuctionDelivery from './AuctionDelivery';
import { Route, matchPath, withRouter, Switch } from 'react-router';
import { Link } from 'react-router-dom';
import EditDetails from './EditDetails';

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
class MyAuctions extends Component {
  state = {
    viweAuctionPop: false,
    editDialog: false,
    userAuction: null,
    index: null,
    loadDelivery: false,
  };
  viewDelivery(auctionId, index) {
    this.props.history.push(`/user/myAuction/delivery/${auctionId}`, {
      selectedIndex: 1,
      isSeller: true,
    });
  }
  handleEditDialog = (userAuction = null, index = null) => {
    this.setState({
      editDialog: !this.state.editDialog,
      index: index,
      userAuction: userAuction,
    });
  };
  handleEndAuction(auctionId, index) {
    this.props.endAuction(auctionId, index);
  }
  handleViewAuctionPop(userAuction = null) {
    this.setState({
      viweAuctionPop: !this.state.viweAuctionPop,
      userAuction: userAuction,
    });
  }
  componentWillMount() {
    this.props.getUserAuctions();
  }
  handleDeleteUserAuction(auctionId, index) {
    this.props.deleteUserAuction(auctionId, index);
  }
  render() {
    const { classes } = this.props;
    const { userAuctions, loading } = this.props.auction;

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
                <Typography variant="body2">Heighest Bid</Typography>
                {userAuction.maxBid && (
                  <Typography variant="h6">{userAuction.maxBid}</Typography>
                )}
              </Grid>
              <Grid item>
                <Typography variant="body2">Approval</Typography>

                <Typography variant="h6">
                  {approvalStatus[userAuction.approval]}
                </Typography>
              </Grid>
              {userAuction.approval === 1 && (
                <Grid item>
                  <Typography variant="body2">Auction Status</Typography>

                  <Typography variant="h6">
                    {soldStatus[userAuction.sold]}
                  </Typography>
                </Grid>
              )}

              {userAuction.sold == 1 && (
                <>
                  <Grid item>
                    <Typography variant="body2">Payment Status</Typography>
                    {userAuction.maxBid && (
                      <Typography variant="h6">
                        {paymentSellerStatus[userAuction.payment]}
                      </Typography>
                    )}
                  </Grid>
                </>
              )}
              {userAuction.payment == 2 && (
                <>
                  <Grid item>
                    <Typography variant="body2">Delivery Status</Typography>
                    <Button
                      variant="outlined"
                      size="small"
                      color="primary"
                      onClick={() =>
                        this.viewDelivery(userAuction.auctionId, index)
                      }
                    >
                      {sellerDeliveryStatus[userAuction.delivery]}
                    </Button>
                  </Grid>
                </>
              )}

              <Grid item>
                <Tooltip title="View Auction Details" aria-label="add">
                  <IconButton
                    color="primary"
                    onClick={() => this.handleViewAuctionPop(userAuction)}
                  >
                    <VisibilityIcon />
                  </IconButton>
                </Tooltip>
                {userAuction.approval != 1 ? (
                  <>
                    <Tooltip title="Delete Auction" aria-label="add">
                      <IconButton
                        color="secondary"
                        onClick={() =>
                          this.handleDeleteUserAuction(
                            userAuction.auctionId,
                            index
                          )
                        }
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit Auction" aria-label="add">
                      <IconButton
                        color="primary"
                        onClick={() =>
                          this.handleEditDialog(userAuction, index)
                        }
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                  </>
                ) : userAuction.bids > 0 && userAuction.sold != 1 ? (
                  <Tooltip
                    title="End Auction with heighest bis"
                    aria-label="add"
                  >
                    <IconButton
                      color="secondary"
                      onClick={() =>
                        this.handleEndAuction(userAuction.auctionId, index)
                      }
                    >
                      <EventBusyIcon />
                    </IconButton>
                  </Tooltip>
                ) : null}
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
              <Typography variant="h6">You have no posted auctions!</Typography>
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
        {this.state.userAuction && (
          <AddEditAuction
            edit={true}
            open={this.state.editDialog}
            reduxIndex={this.state.index}
            userAuction={this.state.userAuction}
            close={this.handleEditDialog}
          />
        )}
      </>
    );
  }
}
MyAuctions.propTypes = { classes: PropTypes.object.isRequired };
const mapStateProps = (state) => ({
  auction: state.auction,
});

const mapActionsToProps = {
  getUserAuctions,
  deleteUserAuction,
  endAuction,
};
export default withRouter(
  connect(mapStateProps, mapActionsToProps)(withStyles(styles)(MyAuctions))
);
