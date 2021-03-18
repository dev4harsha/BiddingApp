import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import {
  Typography,
  Container,
  Grid,
  Paper,
  List,
  ListItem,
  FormControl,
  InputLabel,
  OutlinedInput,
  Button,
  IconButton,
  withStyles,
} from '@material-ui/core';
import Participent from './Participent';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { Component } from 'react';

const styles = (theme) => ({
  root: {},
  paperStyle: {
    borderRadius: 10,
    border: '2px solid #ed5a05',
    padding: theme.spacing(4),
  },
  paperStyleHighestBid: {
    borderRadius: 25,
    backgroundColor: '#e3e3e3',

    paddingInline: '40px',
  },
  container: {
    paddingTop: theme.spacing(1),
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
  formGridButton: {},
});

class Bid extends Component {
  render() {
    const { classes } = this.props;
    return (
      <>
        <Container maxWidth="lg" className={classes.container}>
          <Typography variant="h4" align="center">
            Auction Information
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Participent />
              <Participent />
              <Participent />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Paper className={classes.paperStyle} elevation={4}>
                <Grid
                  container
                  item
                  justify="center"
                  alignItems="center"
                  className={classes.container}
                >
                  <Typography variant="h5" align="center">
                    Base Price $300
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
                        <Typography variant="h4">$500</Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="h4">Highest bid</Typography>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>

                <Grid item container justify="center" alignItems="center">
                  <Typography variant="h6" align="center">
                    Domain Type : weblog
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
                      Auction due on 19th February 2021
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
                    <IconButton aria-label="delete">
                      <RemoveIcon />
                    </IconButton>
                  </Grid>
                  <Grid item>
                    <Typography variant="h3">$520</Typography>
                  </Grid>
                  <Grid item>
                    <IconButton aria-label="delete">
                      <AddIcon />
                    </IconButton>
                  </Grid>
                </Grid>

                <Grid item className={classes.formGridButton}>
                  <Button
                    variant="outlined"
                    fullWidth
                    color="primary"
                    href="#outlined-buttons"
                    className={classes.formButton}
                  >
                    Participate in auctions
                  </Button>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </>
    );
  }
}

export default withStyles(styles)(Bid);
