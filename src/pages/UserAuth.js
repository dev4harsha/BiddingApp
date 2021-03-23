import React, { Component } from 'react';

import { Tab, Container, Grid, Tabs, withStyles } from '@material-ui/core';

//Redux

import Login from '../components/userAuth/Login';
import Register from '../components/userAuth/Register';

const styles = (theme) => ({
  container: {
    paddingTop: theme.spacing(3),
  },
});

class UserAuth extends Component {
  constructor() {
    super();
    this.state = {
      tabValue: 0,
    };
  }
  //const [value, setValue] = useState(0);
  handleChangeTab = (event, newValue) => {
    this.setState({ tabValue: newValue });
  };

  render() {
    const { classes } = this.props;

    return (
      <Container maxWidth="sm" className={classes.container}>
        <Grid item>
          <Tabs
            value={this.state.tabValue}
            onChange={this.handleChangeTab}
            variant="fullWidth"
            indicatorColor="secondary"
            textColor="secondary"
            aria-label="icon label tabs example"
          >
            <Tab label="Register" />
            <Tab label="Log In" />
            {/* <Tab icon={<FavoriteIcon />} label="Log In" /> */}
          </Tabs>
        </Grid>
        <Grid item className={classes.root}>
          {this.state.tabValue === 0 ? <Register /> : <Login />}
        </Grid>
      </Container>
    );
  }
}

export default withStyles(styles)(UserAuth);
