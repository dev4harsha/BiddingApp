import {
  SET_AUCTIONS,
  LOADING_AUCTIONS,
  SET_AUCTION,
  SET_BID,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_MESSAGES,
  USER_END_AUCTION,
  DELETE_USER_AUCTION,
  UPDATE_USER_AUCTION,
  USER_AUCTION_RESERVED,
  BUYER_PAYMENT_AUCTION,
  SET_USER_DELIVERY,
} from '../types';
import axios from 'axios';

export const addNewAuction = (newAuctionDetails) => (dispatch) => {
  dispatch({ type: LOADING_UI });

  axios
    .post(`/auction`, newAuctionDetails)
    .then((res) => {
      dispatch({ type: SET_MESSAGES, payload: res.data });
      dispatch({ type: CLEAR_ERRORS });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: SET_ERRORS, payload: err.response.data });
    });
};

export const auctionDeliveryRequest = (auctionId, status) => (dispatch) => {
  dispatch({ type: LOADING_UI });

  axios
    .get(`/auction/${auctionId}/delivery/${status}`)
    .then((res) => {
      dispatch({ type: SET_MESSAGES, payload: res.data });
      dispatch({ type: CLEAR_ERRORS });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: SET_ERRORS, payload: err.response.data });
    });
};

export const endAuction = (auctionId, index) => (dispatch) => {
  axios
    .get(`/auction/${auctionId}/endAuction`)
    .then((res) => {
      dispatch({ type: SET_MESSAGES, payload: res.data });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: SET_ERRORS, payload: err.response.data });
    });
};
export const updateAuctionDetails = (updateAuctionDetails) => (dispatch) => {
  axios
    .post(`/auction/update`, updateAuctionDetails)
    .then((res) => {
      dispatch({ type: SET_MESSAGES, payload: res.data.message });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: SET_ERRORS, payload: err.response.data });
    });
};
export const deleteUserAuction = (auctionId, index) => (dispatch) => {
  axios
    .get(`/auction/${auctionId}/delete`)
    .then((res) => {
      dispatch({ type: SET_MESSAGES, payload: res.data });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: SET_ERRORS, payload: err.response.data });
    });
};

export const makePayment = (auctionId, index) => (dispatch) => {
  axios
    .get(`/auction/${auctionId}/makePayment`)
    .then((res) => {
      dispatch({ type: SET_MESSAGES, payload: res.data });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: SET_ERRORS, payload: err.response.data });
    });
};
export const postBid = (bidAmount, auctionId) => (dispatch) => {
  dispatch({ type: LOADING_UI });

  axios
    .post(`/auction/${auctionId}/bid`, bidAmount)
    .then((res) => {
      dispatch({ type: SET_MESSAGES, payload: res.data });
      dispatch({ type: CLEAR_ERRORS });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: SET_ERRORS, payload: err.response.data });
    });
};
