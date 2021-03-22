import React, { Component } from 'react';
import { likeUnlikePost } from '../../redux/actions/weblogActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Button, Grid, Typography } from '@material-ui/core';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import { withRouter } from 'react-router';
import ShareIcon from '@material-ui/icons/Share';
const styles = (theme) => ({});
class PostActions extends Component {
  constructor() {
    super();
    this.state = {};
  }

  likedOrUnlikedPost = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find((like) => like.postId === this.props.postId)
    )
      return true;
    else return false;
  };

  authLikeOrUnlikePostHandle = () => {
    this.props.likeUnlikePost(this.props.postId);
  };
  unAuthLikeOrUnlikePostHandle = () => {
    this.props.history.push('/UserAuth');
  };

  render() {
    const { classes, likes, postId } = this.props;
    const { authenticated } = this.props.user;

    const likeUnlikeButtons = !authenticated ? (
      <>
        <Button
          size="small"
          color="primary"
          onClick={this.unAuthLikeOrUnlikePostHandle}
        >
          <ThumbUpOutlinedIcon size="small" color="primary" />
        </Button>
      </>
    ) : this.likedOrUnlikedPost() ? (
      <>
        <Button
          size="small"
          color="primary"
          onClick={this.authLikeOrUnlikePostHandle}
        >
          <ThumbUpIcon size="small" color="primary" />
        </Button>
      </>
    ) : (
      <>
        <Button
          size="small"
          color="primary"
          onClick={this.authLikeOrUnlikePostHandle}
        >
          <ThumbUpOutlinedIcon size="small" color="primary" />
        </Button>
      </>
    );
    return (
      <>
        <Grid container>
          <Grid item xs={3}>
            <Button size="small" color="primary">
              <ShareIcon size="small" color="primary" />
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="body2">
              {likes}
              {likeUnlikeButtons}
            </Typography>
          </Grid>
        </Grid>
      </>
    );
  }
}

PostActions.propTypes = {
  user: PropTypes.object.isRequired,
  likeUnlikePost: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
  posts: PropTypes.array.isRequired,
};
const mapStateToProps = (state) => ({
  user: state.user,
  posts: state.weblog.posts,
});
export default connect(mapStateToProps, { likeUnlikePost })(
  withRouter(withStyles(styles)(PostActions))
);
