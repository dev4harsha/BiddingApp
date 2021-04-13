import { getCurrentUserToken } from '../actions/userActions';
import store from '../store';
import { GET_USER_TOKEN } from '../types';

const initialstate = {};
export default function (state = initialstate, action) {
  switch (action.type) {
    case GET_USER_TOKEN:
      store.dispatch(getCurrentUserToken());
      return null;

    default:
      return state;
  }
}
