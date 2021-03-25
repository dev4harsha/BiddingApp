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
import AddAuction from '../components/userProfile/AddAuction';
import store from '../redux/store';
import { SET_USER_MENU_INDEX } from '../redux/types';
import { connect } from 'react-redux';
import EditDetails from '../components/userProfile/EditDetails';
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
      openAuction: false,
      openHistory: false,
      openProfile: false,
    };
    this.handleListItemClick = this.handleListItemClick.bind(this);
  }

  componentWillMount() {
    this.setState({
      openAuction: this.props.userMenuIndex === 1 ? true : false,
    });
    this.setState({
      openHistory: this.props.userMenuIndex === 2 ? true : false,
    });
    this.setState({
      openProfile: this.props.userMenuIndex === 3 ? true : false,
    });
  }
  handleListItemClick = (event, index) => {
    store.dispatch({ type: SET_USER_MENU_INDEX, payload: index });
    (index === 1 && !this.state.openAuction) || index === 10
      ? this.setState({ openAuction: true })
      : this.setState({ openAuction: false });
    (index === 2 && !this.state.openHistory) || index === 20 || index === 21
      ? this.setState({ openHistory: true })
      : this.setState({ openHistory: false });
    (index === 3 && !this.state.openProfile) || index === 30
      ? this.setState({ openProfile: true })
      : this.setState({ openProfile: false });
  };
  handleChange = (event, newValue) => {
    this.setState({ value: newValue });
  };

  render() {
    const { classes } = this.props;
    const { openHistory, openAuction, openProfile } = this.state;
    let selectedIndex = this.props.userMenuIndex;
    let selectedMenuView;
    switch (selectedIndex) {
      case 1:
      case 10:
        selectedIndex === 10
          ? (selectedMenuView = (
              <>
                <ViewAuction />
                <AddAuction />
              </>
            ))
          : (selectedMenuView = <ViewAuction />);

        break;

      case 2:
        selectedMenuView = <UserHistory />;
        break;
      case 3:
      case 30:
        selectedIndex === 30
          ? (selectedMenuView = (
              <>
                <ProfileDetails />
                <EditDetails />
              </>
            ))
          : (selectedMenuView = (
              <>
                <ProfileDetails />
              </>
            ));

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
                  {openAuction ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openAuction} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItem
                      className={classes.nested}
                      selected={selectedIndex === 10}
                      button
                      onClick={(event) => this.handleListItemClick(event, 10)}
                    >
                      <ListItemIcon>
                        <EditIcon />
                      </ListItemIcon>
                      <ListItemText primary="Add to Auction" />
                    </ListItem>
                  </List>
                </Collapse>
                <ListItem
                  button
                  onClick={(event) => this.handleListItemClick(event, 2)}
                  selected={selectedIndex === 2}
                >
                  <ListItemIcon>
                    <TimelineIcon />
                  </ListItemIcon>
                  <ListItemText primary="History" />
                  {openHistory ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openHistory} timeout="auto" unmountOnExit>
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
                  {openProfile ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
              </List>
              <Collapse in={openProfile} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem
                    className={classes.nested}
                    selected={selectedIndex === 30}
                    button
                    onClick={(event) => this.handleListItemClick(event, 30)}
                  >
                    <ListItemIcon>
                      <EditIcon />
                    </ListItemIcon>
                    <ListItemText primary="Edit Profile" />
                  </ListItem>
                </List>
              </Collapse>
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
const mapStateToProps = (state) => ({
  userMenuIndex: state.UI.userMenuIndex,
});
export default connect(mapStateToProps, {})(withStyles(styles)(UserProfile));
