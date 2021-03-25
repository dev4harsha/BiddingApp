import {
  SET_AUCTIONS,
  SET_AUCTION,
  LOADING_AUCTIONS,
  SET_BID,
  CLEAR_AUCTION,
  SET_USER_AUCTIONS,
} from '../types';

const initialState = {
  auctions: [],
  auction: {},
  loading: false,
  userAuctions: [],
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
    case SET_USER_AUCTIONS:
      return {
        ...state,
        userAuctions: action.payload,
        loading: false,
      };

    default:
      return state;
  }
}
