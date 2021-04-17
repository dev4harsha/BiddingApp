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
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

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
  state = {};

  render() {
    const { classes, auctions, loading } = this.props;

    const recentAuctions =
      auctions && !loading ? (
        <>
          {auctions.map((auction) => (
            <AuctionCommon key={auction.id} auction={auction} />
          ))}
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
  auctions: state.firestore.ordered.publicAuctions,
  loading: state.firestore.status.requesting.publicAuctions,
});
//which action we use
const mapActionsToProps = {};
export default compose(
  connect(mapStateProps, mapActionsToProps),
  firestoreConnect([
    {
      collection: 'auctions',
      where: [
        ['approval', '==', 1],
        ['sold', '==', 0],
      ],
      storeAs: 'publicAuctions',
    },
  ])
)(withStyles(styles)(Auction));
