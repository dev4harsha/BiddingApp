import { SET_AUCTIONS, LOADING_AUCTIONS } from '../types';

const initialState = {
  auctions: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_AUCTIONS:
      return {
        ...state,
        loading: true,
      };
    case SET_AUCTIONS:
      return {
        ...state,
        auctions: action.payload,
        loading: false,
      };

    default:
      return state;
  }
}
