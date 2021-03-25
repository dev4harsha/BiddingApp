import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import { Container, Grid } from '@material-ui/core';
import { TabPanel, TabContext } from '@material-ui/lab';
import ProfileDetails from '../components/userProfile/ProfileDetails';
import UserHistory from '../components/userProfile/UserHistory';
import ViewAuction from '../components/userProfile/ViewAuction';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import EditIcon from '@material-ui/icons/Edit';
import TimelineIcon from '@material-ui/icons/Timeline';
import DnsIcon from '@material-ui/icons/Dns';

const styles = (theme) => ({
  ...theme.spreadThis,
  container: {
    paddingTop: theme.spacing(3),
  },
  subGrid: {
    padding: theme.spacing(1),
  },
  root: {
    // width: '100%',
    // maxWidth: 260,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
});

class UserProfile extends Component {
  constructor() {
    super();
    this.state = {
      value: '1',
      open: false,
      selectedIndex: 1,
    };
  }

  handleListItemClick = (event, index) => {
    this.setState({ selectedIndex: index });
    console.log(index);
    index === 2 || index === 20 || index === 21
      ? this.setState({ open: true })
      : this.setState({ open: false });
  };
  handleChange = (event, newValue) => {
    this.setState({ value: newValue });
  };

  render() {
    const { classes } = this.props;
    const { open, selectedIndex } = this.state;
    let selectedMenuView;
    switch (selectedIndex) {
      case 1:
        selectedMenuView = <ViewAuction />;
        break;
      case 2:
        selectedMenuView = <UserHistory />;
        break;
      case 3:
        selectedMenuView = <ProfileDetails />;
        break;

      default:
        break;
    }
    return (
      <>
        <Container className={classes.container}>
          <Grid container direction="row">
            <Grid className={classes.subGrid} item sm={4} md={3} lg={3}>
              <List component="nav" className={classes.root}>
                <ListItem
                  selected={selectedIndex === 1}
                  button
                  onClick={(event) => this.handleListItemClick(event, 1)}
                >
                  <ListItemIcon>
                    <DnsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Auctions" />
                </ListItem>

                <ListItem
                  button
                  onClick={(event) => this.handleListItemClick(event, 2)}
                  selected={selectedIndex === 2}
                >
                  <ListItemIcon>
                    <TimelineIcon />
                  </ListItemIcon>
                  <ListItemText primary="History" />
                  {open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={open} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItem
                      className={classes.nested}
                      selected={selectedIndex === 20}
                      button
                      onClick={(event) => this.handleListItemClick(event, 20)}
                    >
                      <ListItemIcon>
                        <EditIcon />
                      </ListItemIcon>
                      <ListItemText primary="Sell" />
                    </ListItem>
                    <ListItem
                      className={classes.nested}
                      selected={selectedIndex === 21}
                      button
                      onClick={(event) => this.handleListItemClick(event, 21)}
                    >
                      <ListItemIcon>
                        <EditIcon />
                      </ListItemIcon>
                      <ListItemText primary="Buy" />
                    </ListItem>
                  </List>
                </Collapse>
                <ListItem
                  selected={selectedIndex === 3}
                  button
                  onClick={(event) => this.handleListItemClick(event, 3)}
                >
                  <ListItemIcon>
                    <AccountBoxIcon />
                  </ListItemIcon>
                  <ListItemText primary="Profile" />
                </ListItem>
              </List>
            </Grid>
            <Grid className={classes.subGrid} item sm={8} md={9} md={9}>
              {selectedMenuView}
            </Grid>
          </Grid>
        </Container>
      </>
    );
  }
}

export default withStyles(styles)(UserProfile);
