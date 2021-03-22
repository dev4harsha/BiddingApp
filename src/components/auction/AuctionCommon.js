import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { Button, Grid, Typography } from '@material-ui/core';
import { People } from '@material-ui/icons';
import TimerIcon from '@material-ui/icons/Timer';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import { Redirect } from 'react-router-dom';
import moment from 'moment';
import withStyles from '@material-ui/core/styles/withStyles';
import { render } from 'react-dom';
import { Component } from 'react';
import { withRouter } from 'react-router';

const styles = (theme) => ({
  root: {
    display: 'flex',
  },
  container: {
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '25px',
    height: '100%',
    marginBottom: theme.spacing(1),
    backgroundColor: '#fff',
    boxShadow: '0px 0px 20px #8888883b',
  },
  items: {
    padding: theme.spacing(1),
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item2: {
    order: 2,
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      order: 3,
    },
  },

  item3: {
    order: 3,
    [theme.breakpoints.down('sm')]: {
      order: 2,
    },
  },
  formButton: {
    height: '30px',
    fontSize: '15px',
    border: '1px solid #fff',
    borderRadius: '25px',
    backgroundColor: '#1c2237',
    '&:hover': {
      backgroundColor: '#1c2237',
      color: '#FFF',
      border: '1px solid #f00946',
    },
  },

  typoIcon: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  icons: {
    marginRight: '5px',
  },
});

class AuctionCommon extends Component {
  viweAuction = (value) => {
    //this.props.history.push(/auction/:auctionId/bid"`, { postId: postId });
    this.props.history.push(`/auction/${this.props.auction.auctionId}/bid`);
  };

  render() {
    const { classes } = this.props;
    const { auctionName, initAmount, bids, endDateTime } = this.props.auction;
    return (
      <div className={classes.root}>
        <Grid container justify="flex-start" className={classes.container}>
          <Grid item className={classes.items} xs={6} sm={6} md={3} lg={3}>
            <Typography variant="h5">{auctionName}</Typography>
          </Grid>

          <Grid item className={classes.item2} xs={12} sm={12} md={6} lg={6}>
            <Grid item className={classes.items} xs>
              <Typography variant="h6" className={classes.typoIcon}>
                <LocalOfferIcon className={classes.icons} />

                {initAmount}
              </Typography>
            </Grid>
            <Grid item className={classes.items} xs>
              <Typography
                variant="h6"
                align="center"
                className={classes.typoIcon}
              >
                <People className={classes.icons} />
                {bids}
              </Typography>
            </Grid>
            <Grid item className={classes.items} xs>
              <Typography
                variant="h6"
                align="center"
                className={classes.typoIcon}
              >
                <TimerIcon className={classes.icons} />

                {moment.unix(endDateTime._seconds).format('h:mm:ss A')}
              </Typography>
            </Grid>
          </Grid>

          <Grid
            item
            className={`${classes.item3} ${classes.items}`}
            xs={6}
            sm={6}
            md={3}
            lg={6}
          >
            <Button
              className={classes.formButton}
              variant="contained"
              color="primary"
              onClick={() => this.viweAuction(false)}
              fullWidth
            >
              Bid now
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(AuctionCommon));
