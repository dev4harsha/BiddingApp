import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getPosts } from '../../redux/actions/weblogActions';
import moment from 'moment';
import {
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
  Paper,
} from '@material-ui/core';

import PostThum from './PostThum';
import { Component } from 'react';
import { ScaleLoader } from 'react-spinners';
import PostActions from './PostActions';

const styles = (theme) => ({
  root: {
    maxWidth: '100%',
  },
  container: {
    paddingTop: theme.spacing(3),
  },
  media: {
    height: 240,
  },
});

const override = `
        display: flex;
        align-items: center;
        justify-content: center;    
        border-color: red;
        `;
class BlogPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listPosts: { start: 0, end: 3 },
      post: {},
      postId: this.props.match.params.postId,
    };
  }
  componentDidMount() {
    // if (this.props.weblog.posts.length === 0) {
    //   this.props.getPosts();
    // } else {
    //   this.setPostToState(this.props);
    // }
    //this.setPostToState();
  }
  componentWillReceiveProps(nextProps) {
    //   if (nextProps.weblog.posts.length > 0) {
    //     this.setPostToState(nextProps);
    //   }
    //   //this.setPostToState(nextProps);
  }

  render() {
    const {
      classes,
      weblog: { loading },
    } = this.props;
    const { posts } = this.props.weblog;
    const post = this.props.weblog.posts.find(
      (post) => post.postId === this.props.match.params.postId
    );

    let showPost = loading ? (
      <ScaleLoader
        css={override}
        size={150}
        color={'#eb4034'}
        loading={loading}
      />
    ) : (
      <>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={12} lg={8}>
            <Paper>
              {post.imageURL && (
                <CardMedia
                  className={classes.media}
                  image={post.imageURL}
                  title="Contemplative Reptile"
                />
              )}

              <CardContent>
                {this.props.weblog.posts.length !== 0 && (
                  <PostActions postId={this.props.match.params.postId} />
                )}
                {post.createdAt && (
                  <Typography variant="body1">
                    {moment(post.createdAt).utc().format('YYYY-MM-DD')} <span />
                    {moment(post.createdAt).utc().format('HH:mm A')}
                  </Typography>
                )}
                {post.title && (
                  <Typography variant="h5" component="h2">
                    {post.title}
                  </Typography>
                )}
                {post.post && (
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {post.post}
                  </Typography>
                )}
              </CardContent>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={4}>
            <Grid container spacing={3}>
              {posts
                .slice(this.state.listPosts.start, this.state.listPosts.end)
                .map((post) => (
                  <Grid item xs={12} sm={6} md={4} lg={12} key={post.postId}>
                    <PostThum post={post} />
                  </Grid>
                ))}
              {/* <Grid item xs={12} sm={6} md={3} lg={12}>
                                  <PostThum />
                              </Grid>
                              <Grid item xs={12} sm={6} md={3} lg={12}>
                                  <PostThum />
                              </Grid> */}
            </Grid>
          </Grid>
        </Grid>
      </>
    );
    return (
      <>
        <Container maxWidth="lg" className={classes.container}>
          <Typography variant="h4" gutterBottom align="center">
            Weblogs
          </Typography>
          {showPost}
        </Container>
      </>
    );
  }
}
BlogPost.propTypes = {
  match: PropTypes.object.isRequired,
  weblog: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  weblog: state.weblog,
});
export default connect(mapStateToProps, { getPosts })(
  withStyles(styles)(BlogPost)
);
