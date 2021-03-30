import {
  SET_AUCTIONS,
  LOADING_AUCTIONS,
  SET_AUCTION,
  SET_BID,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_MESSAGE,
  SET_USER_AUCTIONS,
  CHANGE_AUCTION_STATE,
  DELETE_USER_AUCTION,
} from '../types';
import axios from 'axios';

export const addNewAuction = (newAuctionDetails) => (dispatch) => {
  dispatch({ type: LOADING_UI });

  axios
    .post(`/auction`, newAuctionDetails)
    .then((res) => {
      dispatch(getUserAuctions());
      dispatch({ type: SET_MESSAGE, payload: res.data });
      dispatch({ type: CLEAR_ERRORS });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: SET_ERRORS, payload: err.response.data });
    });
};
export const auctionStatusChange = (auctionId, index) => (dispatch) => {
  axios
    .get(`/auction/${auctionId}/activeDeactive`)
    .then((res) => {
      dispatch({ type: CHANGE_AUCTION_STATE, payload: index });
      dispatch({ type: SET_MESSAGE, payload: res.data });
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
      dispatch({ type: DELETE_USER_AUCTION, payload: index });
      dispatch({ type: SET_MESSAGE, payload: res.data });
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
      dispatch(getAuction(auctionId));
      dispatch({ type: SET_MESSAGE, payload: res.data });
      dispatch({ type: CLEAR_ERRORS });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: SET_ERRORS, payload: err.response.data });
    });
};
export const getUserAuctions = () => (dispatch) => {
  dispatch({ type: LOADING_AUCTIONS });
  axios
    .get('/userAuctions')
    .then((res) => {
      dispatch({ type: SET_USER_AUCTIONS, payload: res.data });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getAuctions = (limitAuctions) => (dispatch) => {
  dispatch({ type: LOADING_AUCTIONS });
  axios
    .get(`/auctions/${limitAuctions}`)
    .then((res) => {
      dispatch({ type: SET_AUCTIONS, payload: res.data });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: SET_AUCTIONS, payload: [] });
    });
};

export const getAuction = (auctionId) => (dispatch) => {
  dispatch({ type: LOADING_AUCTIONS });
  axios
    .get(`/auction/${auctionId}`)
    .then((res) => {
      dispatch({ type: SET_AUCTION, payload: res.data });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: SET_AUCTION, payload: [] });
    });
};
