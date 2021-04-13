import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import { Container, Grid } from '@material-ui/core';

import ProfileDetails from '../components/userProfile/ProfileDetails';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';

import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import AccountBoxIcon from '@material-ui/icons/AccountBox';
import EditIcon from '@material-ui/icons/Edit';
import TimelineIcon from '@material-ui/icons/Timeline';
import DnsIcon from '@material-ui/icons/Dns';
import AddEditAuction from '../components/userProfile/AddEditAuction';
import store from '../redux/store';
import { GET_USER_TOKEN, SET_USER_MENU_INDEX } from '../redux/types';
import { connect } from 'react-redux';
import EditDetails from '../components/userProfile/EditDetails';
import SnackBar from '../components/SnackBar';
import BidAuctions from '../components/userProfile/BidAuctions';
import MyAuctions from '../components/userProfile/MyAuctions';
import HistoryBuySell from '../components/userProfile/HistoryBuySell';
import AuctionDelivery from '../components/userProfile/AuctionDelivery';
import { Route, matchPath, withRouter, Switch } from 'react-router';
import { Link } from 'react-router-dom';
import { parseWithOptions } from 'date-fns/fp';
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

const pathList = {
  0: '/user',
  1: '/user/myAuctions',
  10: '/user/myAuctions/addAuction',
  2: '/user/history',
  20: '/user/history/sell',
  21: '/user/history/buy',
  3: '/user/profile',
  30: '/user/profile/editDetails',
};

class UserProfile extends Component {
  constructor() {
    super();
    this.state = {
      value: '1',
      openAuction: false,
      openHistory: false,
      openProfile: false,
      path: '/',
      selectedIndex: null,
    };
    this.handleListItemClick = this.handleListItemClick.bind(this);
    this.handleDialog = this.handleDialog.bind(this);
  }
  componentDidMount() {
    const historyIndex = this.props.history.location.state
      ? this.props.history.location.state.selectedIndex
      : 0;
    this.setState({
      selectedIndex: historyIndex,
    });
    this.handleChangeOpen(historyIndex);
  }

  handleListItemClick = (event, index) => {
    this.setState({ selectedIndex: index });
    this.props.history.push(pathList[index], { selectedIndex: index });
    this.setState({ path: pathList[index] });
    this.handleChangeOpen(index);
  };
  handleChangeOpen = (index) => {
    index === 1 || index === 10
      ? this.setState({ openAuction: true })
      : this.setState({ openAuction: false });
    index === 2 || index === 20 || index === 21
      ? this.setState({ openHistory: true })
      : this.setState({ openHistory: false });
    index === 3 || index === 30
      ? this.setState({ openProfile: true })
      : this.setState({ openProfile: false });
  };
  handleDialog = () => {
    // this.props.history.goBack();

    this.setState({
      selectedIndex: parseInt(
        this.state.selectedIndex.toString().substring(0, 1)
      ),
    });

    this.handleListItemClick(
      null,
      parseInt(this.state.selectedIndex.toString().substring(0, 1))
    );
  };
  render() {
    const {
      classes,
      UI: { message, errors },
    } = this.props;

    const {
      openHistory,
      openAuction,
      openProfile,
      path,
      selectedIndex,
    } = this.state;

    return (
      <>
        <Container className={classes.container}>
          <Grid container direction="row">
            <Grid className={classes.subGrid} item sm={4} md={3} lg={3}>
              <List component="nav" className={classes.root}>
                <ListItem
                  selected={selectedIndex === 0}
                  button
                  onClick={(event) => this.handleListItemClick(event, 0)}
                >
                  <ListItemIcon>
                    <DnsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Bid Auctions" />
                </ListItem>
                <ListItem
                  selected={selectedIndex === 1}
                  button
                  onClick={(event) => this.handleListItemClick(event, 1)}
                >
                  <ListItemIcon>
                    <DnsIcon />
                  </ListItemIcon>
                  <ListItemText primary="My Auctions" />
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
              {/* {selectedMenuView} */}
              <Switch>
                <Route exact path={this.props.match.url}>
                  <BidAuctions />
                </Route>
                <Route path={`${this.props.match.url}/myAuctions`}>
                  <MyAuctions />
                  {matchPath(this.props.history.location.pathname, {
                    path: `${this.props.match.url}/myAuctions/addAuction`,
                    exact: true,
                    strict: false,
                  }) && (
                    <AddEditAuction open={true} close={this.handleDialog} />
                  )}
                </Route>

                <Route exact path={`${this.props.match.url}/history`}></Route>
                <Route exact path={`${this.props.match.url}/history/buy`}>
                  <HistoryBuySell componentType="buy" />
                </Route>
                <Route exact path={`${this.props.match.url}/history/sell`}>
                  <HistoryBuySell componentType="sell" />
                </Route>
                <Route path={`${this.props.match.url}/profile`}>
                  <ProfileDetails />
                  {matchPath(this.props.history.location.pathname, {
                    path: `${this.props.match.url}/profile/editDetails`,
                    exact: true,
                    strict: false,
                  }) && <EditDetails open={true} close={this.handleDialog} />}
                </Route>
                <Route
                  path={`${this.props.match.url}/:from/delivery/:auctionId`}
                >
                  {matchPath(this.props.history.location.pathname, {
                    path: `${this.props.match.url}/(bidAuction|myAuction)/delivery/:auctionId`,
                    exact: true,
                    strict: false,
                  }) && <AuctionDelivery />}
                </Route>
              </Switch>
            </Grid>
          </Grid>
        </Container>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  userMenuIndex: state.UI.userMenuIndex,
  UI: state.UI,
});
export default withRouter(
  connect(mapStateToProps, {})(withStyles(styles)(UserProfile))
);
