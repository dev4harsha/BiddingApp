import { SET_POSTS, LOADING_POSTS, LIKE_UNLIKE_POST, SET_POST } from '../types';
import axios from 'axios';

export const getPosts = (limitPosts) => (dispatch) => {
  dispatch({ type: LOADING_POSTS });
  axios
    .get(`/blogPosts/${limitPosts}`)
    .then((res) => {
      dispatch({ type: SET_POSTS, payload: res.data });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: SET_POSTS, payload: [] });
    });
};

export const likeUnlikePost = (postId) => (dispatch) => {
  axios
    .get(`/post/${postId}/like`)
    .then((res) => {
      dispatch({ type: LIKE_UNLIKE_POST, payload: res.data });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getPost = (postId) => (dispatch) => {
  dispatch({ type: LOADING_POSTS });
  axios
    .get(`/blogPost/${postId}`)
    .then((res) => {
      dispatch({ type: SET_POST, payload: res.data });
    })
    .catch((err) => {
      console.log(err);
    });
};

// export const createBlogPost = (post) => {
//   return (disatch, getstate, { getFirebase, getFirestore }) => {
//     dispatch({type:'CREATE_POST',post})
//   }
// }
