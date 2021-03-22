import {
  SET_AUCTIONS,
  SET_AUCTION,
  LOADING_AUCTIONS,
  SET_BID,
  CLEAR_AUCTION,
} from '../types';

const initialState = {
  auctions: [],
  auction: {},
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
    case SET_AUCTION:
      return {
        ...state,
        auction: action.payload,
        loading: false,
      };
    case CLEAR_AUCTION:
      return {
        ...state,
        auction: [],
        loading: false,
      };
    default:
      return state;
  }
}
