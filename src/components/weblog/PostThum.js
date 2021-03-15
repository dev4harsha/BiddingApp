import React, { useState } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Button } from '@material-ui/core/';

import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@material-ui/core';
import ShareIcon from '@material-ui/icons/Share';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@material-ui/icons/ThumbDownOutlined';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import { withRouter } from 'react-router';
import { Component } from 'react';
import { FaLessThanEqual } from 'react-icons/fa';
import { likeUnlikePost } from '../../redux/actions/weblogActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const styles = (theme) => ({
  root: {},
  media: {
    height: 350,
    objectFit: 'cover',
  },
  Card: {
    maxWidth: '100%',
    padding: theme.spacing(0.5),
  },
});

class PostThum extends Component {
  constructor() {
    super();
    this.state = { value: false };
  }

  setViewPost = (value) => {
    this.props.history.push('/BlogPost');
  };

  likedOrUnlikedPost = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find(
        (like) => like.postId === this.props.post.postId
      )
    )
      return true;
    else return false;
  };
  itIsLikeOrUnlike = () => {
    let index = this.props.user.likes.findIndex(
      (like) => like.postId === this.props.post.postId
    );

    return this.props.user.likes[index].like;
  };

  authLikeOrUnlikePostHandle(like) {
    this.props.likeUnlikePost(this.props.post.postId, like);
  }
  unAuthLikeOrUnlikePostHandle = () => {
    this.props.history.push('/UserAuth');
  };

  render() {
    const {
      classes,
      post: { imageURL, title, post, likes, unlikes, createdAt, postId },
      user: { authenticated },
    } = this.props;

    const likeUnlikeButtons = !authenticated ? (
      <>
        <Typography gutterBottom variant="body2">
          {likes}
          <Button
            size="small"
            color="primary"
            onClick={this.unAuthLikeOrUnlikePostHandle}
          >
            <ThumbUpOutlinedIcon size="small" color="primary" />
          </Button>
        </Typography>
        <Typography gutterBottom variant="body2">
          {unlikes}
          <Button
            size="small"
            color="primary"
            onClick={this.unAuthLikeOrUnlikePostHandle}
          >
            <ThumbDownOutlinedIcon />
          </Button>
        </Typography>
      </>
    ) : this.likedOrUnlikedPost() ? (
      this.itIsLikeOrUnlike() ? (
        <>
          <Typography gutterBottom variant="body2">
            {likes}
            <Button
              size="small"
              color="primary"
              onClick={() => this.authLikeOrUnlikePostHandle(true)}
            >
              <ThumbUpIcon size="small" color="primary" />
            </Button>
          </Typography>
          <Typography gutterBottom variant="body2">
            {unlikes}
            <Button
              size="small"
              color="primary"
              onClick={() => this.authLikeOrUnlikePostHandle(false)}
            >
              <ThumbDownOutlinedIcon size="small" color="primary" />
            </Button>
          </Typography>
        </>
      ) : (
        <>
          <Typography gutterBottom variant="body2">
            {likes}
            <Button
              size="small"
              color="primary"
              onClick={() => this.authLikeOrUnlikePostHandle(true)}
            >
              <ThumbUpOutlinedIcon size="small" color="primary" />
            </Button>
          </Typography>{' '}
          <Typography gutterBottom variant="body2">
            {unlikes}
            <Button
              size="small"
              color="primary"
              onClick={() => this.authLikeOrUnlikePostHandle(false)}
            >
              <ThumbDownAltIcon size="small" color="primary" />
            </Button>
          </Typography>
        </>
      )
    ) : (
      <>
        <Typography gutterBottom variant="body2">
          {likes}
          <Button
            size="small"
            color="primary"
            onClick={() => this.authLikeOrUnlikePostHandle(true)}
          >
            <ThumbUpOutlinedIcon size="small" color="primary" />
          </Button>
        </Typography>
        <Typography gutterBottom variant="body2">
          {unlikes}
          <Button
            size="small"
            color="primary"
            onClick={() => this.authLikeOrUnlikePostHandle(false)}
          >
            <ThumbDownOutlinedIcon size="small" color="primary" />
          </Button>
        </Typography>
      </>
    );
    return (
      <>
        <Card className={classes.Card}>
          <CardActionArea onClick={() => this.setViewPost(this.state.value)}>
            <CardMedia
              className={classes.media}
              image={imageURL}
              title="not define"
            />
            <CardContent>
              <Typography gutterBottom variant="body2">
                {createdAt}
              </Typography>
              <Typography gutterBottom variant="h5" component="h2">
                {`${title.substring(0, 60)}...`}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {`${post.substring(0, 100)}...`}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary">
              <ShareIcon size="small" color="primary" />
            </Button>
            {likeUnlikeButtons}
          </CardActions>
        </Card>
      </>
    );
  }
}
PostThum.propTypes = {
  user: PropTypes.object.isRequired,
  likeUnlikePost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  user: state.user,
});
export default connect(mapStateToProps, { likeUnlikePost })(
  withRouter(withStyles(styles)(PostThum))
);
