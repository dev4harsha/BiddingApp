import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import HistoryIcon from '@material-ui/icons/History';

import {
  Tab,
  Container,
  Grid,
  Typography,
  TextField,
  Tabs,
  Paper,
} from '@material-ui/core';
import { TabPanel, TabContext } from '@material-ui/lab';
import ProfileDetails from './ProfileDetails';
import History from './History';
import ViewAuction from './ViewAuction';

const useStyles = makeStyles((theme) => ({
  tabpanel: {
    padding: '4px',
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
  },
}));

function UserProfile() {
  const classes = useStyles();
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Container maxWidth="lg" className={(classes.container, classes.root)}>
        <Grid item>
          <TabContext value={value}>
            <Tabs
              value={value}
              onChange={handleChange}
              centered
              indicatorColor="secondary"
              textColor="secondary"
              aria-label="icon label tabs example"
            >
              <Tab
                icon={<AddShoppingCartIcon fontSize="small" />}
                label="Auction"
                value="1"
              />
              <Tab
                icon={<HistoryIcon fontSize="small" />}
                label="History"
                value="2}"
              />
              <Tab
                icon={<AccountCircleIcon fontSize="small" />}
                label="Profile"
                value="3"
              />
              {/* <Tab icon={<FavoriteIcon />} label="Log In" /> */}
            </Tabs>
            {/* 
                <Grid item className={classes.root}   justify="space-evenly" alignItems="center" >
                </Grid> */}

            <TabPanel value="1" className={classes.tabpanel}>
              <ViewAuction />
            </TabPanel>
            <TabPanel value="2" className={classes.tabpanel}>
              <ProfileDetails />
            </TabPanel>
            <TabPanel value="3" className={classes.tabpanel}>
              <History />
            </TabPanel>
          </TabContext>
        </Grid>
      </Container>
    </>
  );
}

export default UserProfile;
