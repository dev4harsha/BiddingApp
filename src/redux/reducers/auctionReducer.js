import {
  SET_AUCTIONS,
  SET_AUCTION,
  LOADING_AUCTIONS,
  CLEAR_AUCTION,
  DELETE_USER_AUCTION,
  UPDATE_USER_AUCTION,
  USER_AUCTION_RESERVED,
  BUYER_PAYMENT_AUCTION,
  SET_USER_DELIVERY,
} from '../types';

const initialState = {
  auctions: [],
  auction: {},
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    // case '@@reduxFirestore/DOCUMENT_MODIFIED':
    //   console.log(action);
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

    case DELETE_USER_AUCTION:
      state.auctions.splice(action.payload, 1);
      return {
        ...state,
      };
    case UPDATE_USER_AUCTION:
      state.auctions[action.payload.index] = action.payload.data;
      return {
        ...state,
      };
    case USER_AUCTION_RESERVED:
      state.auctions[action.payload].payment = 1;
      state.auctions[action.payload].sold = 1;

      return {
        ...state,
      };
    case BUYER_PAYMENT_AUCTION:
      state.auctions[action.payload].payment = 2;

      return {
        ...state,
      };

    case SET_USER_DELIVERY:
      state.auction.delivery = action.payload;
      return {
        ...state,
      };

    default:
      return state;
  }
}
