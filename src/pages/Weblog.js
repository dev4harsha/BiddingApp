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
import { withRouter } from 'react-router';

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
  componentWillReceiveProps(next) {
    console.log(next.firestore.ordered.blogPosts);
    const loading = next.firestore.status.requesting.blogPosts;
    console.log(loading);
  }
  render() {
    const { classes } = this.props;

    // console.log(this.props.firestore);
    // const loading = this.props.firestore.status.requesting.blogPsts;
    // const { posts } = this.props.firestore.ordered.blogPost;

    // let recentPosts = loading ? (
    //   <ScaleLoader
    //     css={override}
    //     size={150}
    //     color={'#eb4034'}
    //     loading={loading}
    //   />
    // ) : (
    //   <Grid container spacing={3}>
    //     {posts
    //       .slice(
    //         this.state.listPosts.start,
    //         this.props.noOfPosts || this.state.listPosts.end
    //       )
    //       .map((post) => (
    //         <Grid item xs={12} sm={6} md={4} key={post.postId}>
    //           <PostThum post={post} />
    //         </Grid>
    //       ))}
    //   </Grid>
    // );

    return (
      <>
        <Container maxWidth="lg" className={classes.container}>
          <Typography variant="h4" gutterBottom align="center">
            Blog post
          </Typography>

          {/* {recentPosts} */}
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
  firestore: state.firestore,
});

export default withRouter(
  compose(
    firestoreConnect([{ collection: 'blogPosts' }]),
    connect(mapStateProps, { getPosts })
  )(withStyles(styles)(Weblog))
);
