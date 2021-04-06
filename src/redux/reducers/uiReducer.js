import {
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_MESSAGES,
  CLEAR_MESSAGES,
  SET_USER_MENU_INDEX,
} from '../types';

const initialState = {
  loading: false,
  errors: null,
  messages: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_ERRORS:
      return {
        ...state,
        loading: false,
        errors: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        errors: null,
      };
    case LOADING_UI:
      return {
        ...state,
        loading: true,
      };
    case SET_MESSAGES:
      return {
        ...state,
        loading: false,
        messages: action.payload,
      };
    case CLEAR_MESSAGES:
      return {
        ...state,
        loading: false,
        messages: null,
      };

    default:
      return state;
  }
}
