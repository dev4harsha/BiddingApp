import { Button, Grid, Paper, Typography, withStyles } from '@material-ui/core';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
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
    console.log(this.props);
    this.props.getUserAuction(this.props.match.params.auctionId);
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
      userAuction,
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
            {isSeller ? (
              [0, 2].includes(userAuction.delivery) ? (
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
            ) : isBuyer ? (
              <>
                {userAuction.delivery === 1 ? (
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
  userAuction: state.auction.userAuction,
  UI: state.UI,
});

const mapActionsToProps = {
  getUserAuction,
  auctionDeliveryRequest,
};
export default withRouter(
  connect(mapStateProps, mapActionsToProps)(withStyles(styles)(AuctionDelivery))
);
