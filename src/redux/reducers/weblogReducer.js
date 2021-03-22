import { SET_POSTS, LOADING_POSTS, LIKE_UNLIKE_POST, SET_POST } from '../types';

const initialState = {
  posts: [],
  post: {},
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_POSTS:
      return {
        ...state,
        loading: true,
      };
    case SET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false,
      };
    case SET_POST:
      return {
        ...state,
        post: action.payload,
        loading: false,
      };
    case LIKE_UNLIKE_POST:
      let index = state.posts.findIndex(
        (post) => post.postId === action.payload.postId
      );

      state.posts[index] = action.payload;
      state.post = action.payload;
      return {
        ...state,
      };
    default:
      return state;
  }
}
