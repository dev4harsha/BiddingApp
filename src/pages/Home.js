import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Container, Grid, Paper } from '@material-ui/core';

import Auction from './Auction';
import Weblog from './Weblog';

const useStyles = makeStyles((theme) => ({
  root: {},
  container: {
    paddingTop: theme.spacing(3),
  },
}));

function Home() {
  const override = `
        display: flex;
        align-items: center;
        justify-content: center;    
        border-color: red;
    `;
  const classes = useStyles();

  return (
    <>
      <Container maxwidth="lg" className={classes.container}>
        <Grid item>
          <Auction noOfDoms={5} />
        </Grid>

        <Grid item>
          <Weblog noOfPosts={3} />
        </Grid>
      </Container>
    </>
  );
}

export default Home;
