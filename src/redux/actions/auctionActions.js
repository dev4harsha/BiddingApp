import { SET_AUCTIONS, LOADING_AUCTIONS } from '../types';
import axios from 'axios';

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
