import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import { Redirect } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {},
  media: {
    height: 350,
    objectFit: 'cover',
  },
  Card: {
    maxWidth: '100%',
    padding: theme.spacing(0.5),
  },
}));

function PostThum(props) {
  const classes = useStyles();
  const [viwePost, setViewPost] = useState(true);

  if (!viwePost) {
    return <Redirect to="/BlogPost" />;
  }
  return (
    <>
      <Card className={classes.Card} onClick={() => setViewPost(false)}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={props.imageURL}
            title="not define"
          />
          <CardContent>
            <Typography gutterBottom variant="body2">
              {props.createdAt}
            </Typography>
            <Typography gutterBottom variant="h5" component="h2">
              {`${props.postTitle.substring(0, 60)}...`}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {`${props.postBody.substring(0, 100)}...`}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            <ShareIcon size="small" color="primary" />
          </Button>
          <Typography gutterBottom variant="body2">
            {props.likes}
            <Button size="small" color="primary">
              <ThumbDownAltIcon size="small" color="primary" />
            </Button>
          </Typography>
          <Typography gutterBottom variant="body2">
            {props.unlikes}
            <Button size="small" color="primary">
              <ThumbUpIcon />
            </Button>
          </Typography>
        </CardActions>
      </Card>
    </>
  );
}

export default PostThum;
