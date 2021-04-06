import { Button, Grid, Paper, Typography, withStyles } from '@material-ui/core';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
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
  auctionDeliveryToBuyer() {
    this.props.history.goBack();
  }
  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.paperStyle}>
        <Typography variant="h6">Auction Delivery</Typography>
        <Grid container direction="row" className={classes.gridContainer}>
          <Grid item>
            <Button
              variant="contained"
              size="small"
              color="primary"
              onClick={() => this.auctionDeliveryToBuyer()}
              className={classes.button}
            >
              Send
            </Button>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}
const mapStateProps = (state) => ({});

const mapActionsToProps = {};
export default withRouter(
  connect(mapStateProps, mapActionsToProps)(withStyles(styles)(AuctionDelivery))
);
