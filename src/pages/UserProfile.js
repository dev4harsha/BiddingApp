import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
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
import ProfileDetails from '../components/userProfile/ProfileDetails';
import UserHistory from '../components/userProfile/UserHistory';
import ViewAuction from '../components/userProfile/ViewAuction';

const styles = (theme) => ({
  ...theme.spreadThis,
  tabpanel: {
    padding: '4px',
  },
});

class UserProfile extends Component {
  constructor() {
    super();
    this.state = {
      value: '1',
    };
  }

  handleChange = (event, newValue) => {
    this.setState({ value: newValue });
  };

  render() {
    const { classes } = this.props;
    return (
      <>
        <Container className={(classes.container, classes.root)}>
          <Grid item>
            <TabContext value={this.state.value}>
              <Tabs
                value={this.state.value}
                onChange={this.handleChange}
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
                  value="2"
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
                <UserHistory />
              </TabPanel>
              <TabPanel value="3" className={classes.tabpanel}>
                <ProfileDetails />
              </TabPanel>
            </TabContext>
          </Grid>
        </Container>
      </>
    );
  }
}

export default withStyles(styles)(UserProfile);
