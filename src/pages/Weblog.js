import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, Typography } from '@material-ui/core';

import { ScaleLoader } from 'react-spinners';
import axios from 'axios';
import PostThum from '../components/weblog/PostThum';

const useStyles = makeStyles((theme) => ({
  root: {},
  container: {
    paddingTop: theme.spacing(3),
  },
}));

function Weblog(props) {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [blogPosts, setBlogPosts] = useState([]);
  const [listPosts, setListPosts] = useState({ start: 0, end: 10 });
  const override = `
        display: flex;
        align-items: center;
        justify-content: center;    
        border-color: red;
        `;
  const getPostsList = () => {
    setLoading(true);
    axios
      .get('/blogPosts')
      .then((res) => {
        console.log(res.data);
        setLoading(false);
        setBlogPosts(res.data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  useEffect(() => {
    getPostsList();
  }, []);
  return (
    <>
      <Container maxWidth="lg" className={classes.container}>
        <Typography variant="h4" gutterBottom align="center">
          Blog post
        </Typography>

        {blogPosts.length === 0 ? (
          <ScaleLoader
            css={override}
            size={150}
            color={'#eb4034'}
            loading={loading}
          />
        ) : (
          <>
            <Grid container spacing={3}>
              {blogPosts
                .slice(listPosts.start, props.noOfPosts || listPosts.end)
                .map((posts) => (
                  <Grid item xs={12} sm={6} md={4} key={posts.postId}>
                    <PostThum
                      imageURL={posts.imageURL}
                      postTitle={posts.postTitle}
                      postBody={posts.postBody}
                      likes={posts.likes}
                      unlikes={posts.unlikes}
                      createdAt={posts.createdAt}
                      postId={posts.postId}
                      recentPosts={blogPosts}
                    />
                  </Grid>
                ))}
            </Grid>
          </>
        )}
      </Container>
    </>
  );
}

export default Weblog;
