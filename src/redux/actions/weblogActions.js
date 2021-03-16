import { SET_POSTS, LOADING_POSTS, LIKE_UNLIKE_POST, SET_POST } from '../types';
import axios from 'axios';

export const getPosts = () => (disatch) => {
  disatch({ type: LOADING_POSTS });
  axios
    .get('/blogPosts')
    .then((res) => {
      disatch({ type: SET_POSTS, payload: res.data });
    })
    .catch((err) => {
      console.log(err);
      disatch({ type: SET_POSTS, payload: [] });
    });
};

export const likeUnlikePost = (postId) => (disatch) => {
  axios
    .get(`/post/${postId}/like`)
    .then((res) => {
      disatch({ type: LIKE_UNLIKE_POST, payload: res.data });
    })
    .catch((err) => {
      console.log(err);
    });
};
