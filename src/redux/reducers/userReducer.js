import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
} from '../types';

const initialstate = {
  authenticated: false,
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
        ...action.payload,
      };
    default:
      return state;
  }
}
