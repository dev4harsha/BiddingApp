import { getCurrentUserToken } from '../actions/userActions';
import store from '../store';
import {
  SET_USER,
  LOADING_USER,
  LIKE_UNLIKE_POST,
  GET_USER_TOKEN,
  SET_USER_TOKEN,
} from '../types';

const initialstate = {
  loading: false,

  likes: [],
  notifications: [],
  isTokenSet: false,
};

export default function (state = initialstate, action) {
  switch (action.type) {
    case GET_USER_TOKEN:
      store.dispatch(getCurrentUserToken());
      return state;
    case SET_USER_TOKEN:
      return {
        ...state,
        isTokenSet: true,
      };
    case SET_USER:
      return {
        ...state,
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
            { userId: action.payload.userId, postId: action.payload.postId },
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
