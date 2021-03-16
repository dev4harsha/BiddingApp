import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  LIKE_UNLIKE_POST,
} from '../types';

const initialstate = {
  authenticated: false,
  loading: false,
  credentials: {},
  likes: [],
  notifications: [],
};

export default function (state = initialstate, action) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
      };
    case SET_UNAUTHENTICATED:
      return initialstate;
    case SET_USER:
      return {
        authenticated: true,
        loading: false,
        ...action.payload,
      };
    case LOADING_USER:
      return {
        ...state,
        loading: true,
      };
    case LIKE_UNLIKE_POST:
      let index = state.likes.findIndex(
        (like) => like.postId === action.payload.postId
      );
      console.log(index);
      if (index < 0) {
        return {
          ...state,
          likes: [
            ...state.likes,
            { userId: state.credentials.userId, postId: action.payload.postId },
          ],
        };
      } else {
        return {
          ...state,
          likes: state.likes.filter(
            (like) => like.postId !== action.payload.postId
          ),
        };
      }

    default:
      return state;
  }
}
