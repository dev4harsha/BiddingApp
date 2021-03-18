import React, { useEffect, useState } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Container, Grid, Typography } from '@material-ui/core';

import { ScaleLoader } from 'react-spinners';
import axios from 'axios';
import PostThum from '../components/weblog/PostThum';
import { render } from '@testing-library/react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

import PropTypes from 'prop-types';
import { getPosts } from '../redux/actions/weblogActions';

const styles = (theme) => ({
  root: {},
  container: {
    paddingTop: theme.spacing(3),
  },
});
const override = `
        display: flex;
        align-items: center;
        justify-content: center;    
        border-color: red;
        `;
class Weblog extends Component {
  constructor() {
    super();
    this.state = {
      listPosts: { start: 0, end: 10 },
    };
  }

  componentDidMount() {
    // this.props.getPosts();
  }

  render() {
    const { classes } = this.props;
    const { posts, loading } = this.props.weblog;
    let recentPosts = loading ? (
      <ScaleLoader
        css={override}
        size={150}
        color={'#eb4034'}
        loading={loading}
      />
    ) : (
      <Grid container spacing={3}>
        {posts
          .slice(
            this.state.listPosts.start,
            this.props.noOfPosts || this.state.listPosts.end
          )
          .map((post) => (
            <Grid item xs={12} sm={6} md={4} key={post.postId}>
              <PostThum post={post} />
            </Grid>
          ))}
      </Grid>
    );
    return (
      <>
        <Container maxWidth="lg" className={classes.container}>
          <Typography variant="h4" gutterBottom align="center">
            Blog post
          </Typography>

          {recentPosts}
        </Container>
      </>
    );
  }
}

Weblog.propType = {
  classes: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired,
  weblog: PropTypes.object.isRequired,
};
const mapStateProps = (state) => ({
  weblog: state.weblog,
});

export default connect(mapStateProps, { getPosts })(withStyles(styles)(Weblog));
