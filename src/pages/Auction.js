import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { Typography, Container } from '@material-ui/core';
import AuctionCommon from '../components/auction/AuctionCommon';
import { ScaleLoader } from 'react-spinners';
import withStyles from '@material-ui/core/styles/withStyles';
import { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { getAuctions } from '../redux/actions/auctionActions';
import PropTypes from 'prop-types';

const styles = (theme) => ({
  root: {},
  container: {
    paddingTop: theme.spacing(3),
  },
});
const override = `
display: flex;
align-items: center;
justify-content: center;    
border-color: red;
`;
class Auction extends Component {
  state = {
    auctionsListPoints: { start: 0, end: 10 },
  };

  componentWillMount() {
    // this.props.getAuctions();
  }
  render() {
    const { classes } = this.props;
    const { auctions, loading } = this.props.auction;
    const { auctionsListPoints } = this.state;
    const recentAuctions = loading ? (
      <ScaleLoader
        css={override}
        size={150}
        color={'#eb4034'}
        loading={loading}
      />
    ) : (
      <>
        {auctions
          .slice(
            auctionsListPoints.start,
            this.props.noOfAuctions || auctionsListPoints.end
          )
          .map((auction) => (
            <AuctionCommon key={auction.auctionId} auction={auction} />
          ))}
      </>
    );
    return (
      <>
        <Container maxWidth="lg" className={classes.container}>
          <Typography variant="h4" gutterBottom align="center">
            The latest auctions
          </Typography>
          {recentAuctions}
        </Container>
      </>
    );
  }
}

Auction.propType = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};
//takes globl stats
const mapStateProps = (state) => ({
  auction: state.auction,
});
//which action we use
const mapActionsToProps = {
  getAuctions,
};
export default connect(
  mapStateProps,
  mapActionsToProps
)(withStyles(styles)(Auction));
