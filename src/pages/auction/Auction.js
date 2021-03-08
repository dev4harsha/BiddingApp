import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { Typography, Container } from '@material-ui/core';
import AuctionCommon from './AuctionCommon';

const useStyles = makeStyles((theme) => ({
  root: {},
  container: {
    paddingTop: theme.spacing(3),
  },
}));

function Auction() {
  const classes = useStyles();

  return (
    <>
      <Container maxWidth="lg" className={classes.container}>
        <Typography variant="h4" gutterBottom align="center">
          Auction
        </Typography>
        <AuctionCommon />
        <AuctionCommon />
        <AuctionCommon />
        <AuctionCommon />
      </Container>
    </>
  );
}

export default Auction;
