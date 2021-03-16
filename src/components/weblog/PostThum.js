import React, { useState } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Button } from '@material-ui/core/';
import moment from 'moment';
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@material-ui/core';

import { withRouter } from 'react-router';
import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PostActions from './PostActions';

const styles = (theme) => ({
  root: {},
  media: {
    height: 200,
    objectFit: 'cover',
  },
  Card: {
    maxWidth: '100%',
    padding: theme.spacing(0.5),
  },
});

class PostThum extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  viewPost = (postId) => {
    this.props.history.push(`/BlogPost/${postId}`, { postId: postId });
  };
  render() {
    const {
      classes,
      post: { imageURL, title, post, likes, createdAt, postId },
    } = this.props;

    return (
      <>
        <Card className={classes.Card}>
          <CardActionArea onClick={() => this.viewPost(postId)}>
            <CardMedia
              className={classes.media}
              image={imageURL}
              title="not define"
            />
            <CardContent>
              <Typography gutterBottom variant="body2">
                {moment(createdAt).utc().format('YYYY-MM-DD')} <span />
                {moment(createdAt).utc().format('HH:mm A')}
              </Typography>
              <Typography
                gutterBottom
                variant="h5"
                component="h2"
                noWrap={true}
              >
                {`${title}...`}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                noWrap={true}
              >
                {`${post}...`}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <PostActions postId={postId} />
          </CardActions>
        </Card>
      </>
    );
  }
}
PostThum.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  user: state.user,
});
export default connect(mapStateToProps)(
  withRouter(withStyles(styles)(PostThum))
);
