import React from 'react';
import {
  Grid,
  IconButton,
  Paper,
  Typography,
  withStyles,
  Button,
} from '@material-ui/core';
import moment from 'moment';

import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { CLEAR_ERRORS, CLEAR_MESSAGES } from '../../redux/types';
import { getAuction, postBid } from '../../redux/actions/auctionActions';
import { withRouter } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';
import store from '../../redux/store';
const styles = (theme) => ({
  paperStyle: {
    borderRadius: 10,
    border: '2px solid #ed5a05',
    padding: theme.spacing(4),
  },
  container: {
    paddingTop: theme.spacing(2),
  },
  paperStyleHighestBid: {
    borderRadius: 25,
    backgroundColor: '#e3e3e3',

    paddingInline: '40px',
  },

  GridContainerHighestBid: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  GridItemBidTime: {
    padding: theme.spacing(2),
    backgroundColor: '#1a6331',
    borderRadius: 15,
    color: '#fff',
    margin: '5px',
  },
  GridPlaceBid: {
    marginTop: '10px',
    marginBottom: '10px',
  },
  formButton: {
    height: '60px',
    fontSize: '20px',
    backgroundColor: '#1c2237',
    color: '#FFF',
    borderRadius: '40px',
    border: '2px solid #fff',
    '&:hover': {
      backgroundColor: '#1c2237',
      color: '#fff',
      border: '2px solid #f00946',
    },
  },
});
class AuctionDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      maxBid: parseFloat(this.props.auction.auction.maxBid).toFixed(2),
    };
    this.increaseBidAmount = this.increaseBidAmount.bind(this);
    this.decreasBidAmount = this.decreasBidAmount.bind(this);
  }

  increaseBidAmount = () => {
    this.setState({
      maxBid: parseFloat(this.state.maxBid - -0.01).toFixed(2),
    });
  };
  decreasBidAmount = () => {
    this.setState({
      maxBid: parseFloat(this.state.maxBid - 0.01).toFixed(2),
    });
  };

  placeBid = () => {
    if (this.props.authenticated) {
      const bidData = {
        bidAmount: this.state.maxBid,
      };
      this.props.postBid(bidData, this.props.match.params.auctionId);
    } else {
      console.log(this.props);
      this.props.history.push('/UserAuth', { from: this.props.location });
    }
  };
  componentDidMount() {
    if (this.props.auction.auction.bids > 0) {
      this.setState({
        maxBid: parseFloat(this.props.auction.auction.maxBid).toFixed(2),
      });
    } else {
      this.setState({
        maxBid: parseFloat(this.props.auction.auction.initAmount).toFixed(2),
      });
    }
  }

  render() {
    const { classes } = this.props;
    const { auction, loading } = this.props.auction;
    return (
      <>
        <ToastContainer />
        <Paper className={classes.paperStyle} elevation={4}>
          <Grid
            container
            item
            justify="center"
            alignItems="center"
            className={classes.container}
          >
            <Typography variant="h5" align="center">
              Base Price ${auction.initAmount}
            </Typography>
          </Grid>
          <Grid
            className={classes.GridContainerHighestBid}
            item
            container
            justify="center"
            alignItems="center"
          >
            <Paper elevation={0} className={classes.paperStyleHighestBid}>
              <Grid
                container
                justify="space-evenly"
                alignItems="center"
                spacing={2}
              >
                <Grid itemScope>
                  <Typography variant="h4">${auction.maxBid}</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h4">Highest bid</Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          <Grid item container justify="center" alignItems="center">
            <Typography variant="h6" align="center">
              Domain Type : {auction.auctionType}
            </Typography>
          </Grid>

          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Grid item>
              <Typography variant="h6">Remaining time</Typography>
            </Grid>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Grid item className={classes.GridItemBidTime}>
                <Typography variant="h4">10h</Typography>
              </Grid>
              <Grid item className={classes.GridItemBidTime}>
                <Typography variant="h4">20m</Typography>
              </Grid>
              <Grid item className={classes.GridItemBidTime}>
                <Typography variant="h4">49s</Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="h6">
                Auction due on{' '}
                {moment
                  .unix(auction.createdAt._seconds)
                  .format('MM/DD/YYYY h:mm:ss A')}
              </Typography>
            </Grid>
          </Grid>

          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            className={classes.GridPlaceBid}
          >
            <Grid item>
              <IconButton onClick={this.decreasBidAmount}>
                <RemoveIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <Typography variant="h3">${this.state.maxBid}</Typography>
            </Grid>
            <Grid item>
              <IconButton onClick={this.increaseBidAmount}>
                <AddIcon />
              </IconButton>
            </Grid>
          </Grid>

          <Grid item className={classes.formGridButton}>
            <Button
              variant="outlined"
              fullWidth
              color="primary"
              className={classes.formButton}
              onClick={this.placeBid}
            >
              Participate in auctions
            </Button>
          </Grid>
        </Paper>
      </>
    );
  }
}

AuctionDetails.propType = {
  classes: PropTypes.object.isRequired,
  auction: PropTypes.object.isRequired,
  authenticated: PropTypes.bool.isRequired,
};
const mapStateProps = (state) => ({
  auction: state.auction,
  authenticated: state.user.authenticated,
  UI: state.UI,
});
const mapActionsToProps = {
  getAuction,
  postBid,
};
export default connect(
  mapStateProps,
  mapActionsToProps
)(withRouter(withStyles(styles)(AuctionDetails)));
