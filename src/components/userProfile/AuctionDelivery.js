import { Button, Grid, Paper, Typography, withStyles } from '@material-ui/core';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { withRouter } from 'react-router';
import { compose } from 'redux';
import {
  getUserAuction,
  auctionDeliveryRequest,
} from '../../redux/actions/auctionActions';
const styles = (theme) => ({
  gridContainer: {
    textAlign: 'center',
    direction: 'column',
    justify: 'center',
    alignItems: 'center',
  },

  paperStyle: {
    padding: 10,
  },
  button: {
    margin: '10px',
  },
});
class AuctionDelivery extends Component {
  constructor() {
    super();
    this.state = {
      isSeller: false,
      isBuyer: false,
    };
  }
  handleDeliveryRequest(status) {
    this.props.auctionDeliveryRequest(
      this.props.match.params.auctionId,
      status
    );
  }
  goBack = () => {
    if (this.state.isSeller) {
      this.props.history.push('/user/myAuctions/', { selectedIndex: 1 });
    } else if (this.state.isBuyer) {
      this.props.history.push('/user', { selectedIndex: 0 });
    }
  };
  componentDidMount() {
    this.setState({
      isSeller: this.props.location.state.isSeller
        ? this.props.location.state.isSeller
        : false,
      isBuyer: this.props.location.state.isBuyer
        ? this.props.location.state.isBuyer
        : false,
    });
  }
  render() {
    const {
      classes,
      user,
      auction,
      UI: { loading },
    } = this.props;
    const { isSeller, isBuyer } = this.state;

    return (
      <Paper className={classes.paperStyle}>
        <Typography variant="h6">Auction Delivery</Typography>
        <Grid container direction="row" className={classes.gridContainer}>
          <Grid item>
            <Button
              variant="contained"
              size="small"
              color="primary"
              onClick={this.goBack}
              className={classes.button}
              disabled={loading}
            >
              Go Back
            </Button>
            {isSeller && auction ? (
              [0, 2].includes(auction.delivery) ? (
                <>
                  <Button
                    variant="contained"
                    size="small"
                    color="primary"
                    onClick={() => this.handleDeliveryRequest(1)}
                    className={classes.button}
                    disabled={loading}
                  >
                    Send
                  </Button>
                </>
              ) : null
            ) : isBuyer && auction ? (
              <>
                {auction.delivery === 1 ? (
                  <>
                    <Button
                      variant="contained"
                      size="small"
                      color="secondary"
                      onClick={() => this.handleDeliveryRequest(2)}
                      className={classes.button}
                      disabled={loading}
                    >
                      Reqest Redelivery
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      color="primary"
                      onClick={() => this.handleDeliveryRequest(3)}
                      className={classes.button}
                      disabled={loading}
                    >
                      Accept
                    </Button>
                  </>
                ) : null}
              </>
            ) : null}
          </Grid>
        </Grid>
      </Paper>
    );
  }
}
const mapStateProps = (state) => ({
  user: state.user,
  auction: state.firestore.data.bidAuction,
  UI: state.UI,
});

const mapActionsToProps = {
  auctionDeliveryRequest,
};

export default withRouter(
  compose(
    connect(mapStateProps, mapActionsToProps),
    firestoreConnect((props) => [
      {
        collection: 'auctions',
        doc: props.match.params.auctionId,
        storeAs: 'bidAuction',
      },
    ])
  )(withStyles(styles)(AuctionDelivery))
);
