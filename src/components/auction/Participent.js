import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import withStyles from '@material-ui/core/styles/withStyles';

import {
  Button,
  Divider,
  Grid,
  Typography,
  Hidden,
  Avatar,
  ListItemAvatar,
  ListItemText,
  List,
  ListItem,
} from '@material-ui/core';
import { Component } from 'react';
import { render } from 'react-dom';
import moment from 'moment';

const styles = (theme) => ({
  root: {
    border: `2px solid ${theme.palette.divider}`,
    borderRadius: '25px',
    height: '70px',
    marginBottom: theme.spacing(1),
    backgroundColor: '#fff',
    boxShadow: '0px 0px 20px #8888883b',
  },
  container: {
    paddingTop: theme.spacing(3),
  },
  typoIcon: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
});

class Participent extends Component {
  render() {
    const { classes, bidData } = this.props;
    return (
      <Grid
        className={classes.root}
        container
        justify="space-evenly"
        alignItems="center"
      >
        <Grid item>
          <Typography variant="h6" align="center">
            {moment.unix(bidData.createdAt._seconds).format('MM/DD h:mm:ss A')}
          </Typography>
        </Grid>

        <Grid item>
          <Typography variant="h6" align="center">
            {bidData.bidAmount}
          </Typography>
        </Grid>

        <Grid item>
          <List>
            <ListItem>
              <ListItemAvatar>
                <Avatar alt="Travis Howard" src={bidData.imageurl} />
              </ListItemAvatar>
              <ListItemText>{bidData.userName}</ListItemText>
            </ListItem>
          </List>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(Participent);
