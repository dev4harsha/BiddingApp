import { SET_USER, LOADING_USER, LIKE_UNLIKE_POST } from '../types';

const initialstate = {
  loading: false,
  credentials: {},
  likes: [],
  notifications: [],
};

export default function (state = initialstate, action) {
  switch (action.type) {
    case SET_USER:
      return {
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
