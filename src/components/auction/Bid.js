import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MuiAlert from '@material-ui/lab/Alert';
import { Typography, Container, Grid, withStyles } from '@material-ui/core';
import Participent from './Participent';
import AuctionDetails from './AuctionDetails';

import { Component } from 'react';
import { connect } from 'react-redux';
import { getAuction } from '../../redux/actions/auctionActions';
import PropTypes from 'prop-types';
import { ScaleLoader } from 'react-spinners';
import moment from 'moment';

import store from '../../redux/store';

import { CLEAR_AUCTION } from '../../redux/types';

const styles = (theme) => ({
  root: {},
  container: {
    paddingTop: theme.spacing(2),
  },
});

const override = `
        display: flex;
        align-items: center;
        justify-content: center;    
        border-color: red;
        `;

class Bid extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillUnmount() {
    store.dispatch({ type: CLEAR_AUCTION });
  }
  componentDidMount() {
    this.props.getAuction(this.props.match.params.auctionId);
  }
  render() {
    const { classes } = this.props;
    const { auction, loading } = this.props.auction;
    let bidToAuction = auction.bidsData ? (
      <>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            {auction.bidsData.map((bidData) => (
              <Participent key={bidData.bidId} bidData={bidData} />
            ))}
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <AuctionDetails />
          </Grid>
        </Grid>
      </>
    ) : (
      <ScaleLoader
        css={override}
        size={150}
        color={'#eb4034'}
        loading={loading}
      />
    );

    return (
      <>
        <Container maxWidth="lg" className={classes.container}>
          <Typography variant="h4" align="center">
            Auction information
          </Typography>

          {bidToAuction}
        </Container>
      </>
    );
  }
}
Bid.propType = {
  classes: PropTypes.object.isRequired,

  auction: PropTypes.object.isRequired,
};
const mapStateProps = (state) => ({
  auction: state.auction,
});
const mapActionsToProps = {
  getAuction,
};
export default connect(
  mapStateProps,
  mapActionsToProps
)(withStyles(styles)(Bid));
