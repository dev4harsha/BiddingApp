import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  SET_MESSAGES,
  GET_USER_TOKEN,
} from '../types';
import axios from 'axios';
import { firebaseConfig } from '../../config/fbConfig';
export const loginUser = (userData) => (
  dispatch,
  getState,
  { getFirebase }
) => {
  dispatch({ type: LOADING_UI });
  const firebase = getFirebase();
  const { valid, errors } = validateData(userData, false);
  if (!valid) {
    return dispatch({ type: SET_ERRORS, payload: errors });
  } else {
    firebase
      .auth()
      .signInWithEmailAndPassword(userData.email, userData.password)
      .then((data) => {
        data.user.getIdToken().then((token) => {
          setAuthorizationHeader(token);
          dispatch(getUserData());
        });
      })
      .catch((err) => {
        dispatch({ type: SET_ERRORS, payload: { error: err.message } });
      });
  }
};

export const signupUser = (newUserData) => (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  dispatch({ type: LOADING_UI });
  const firebase = getFirebase();
  const firestore = getFirestore();
  const noImg = 'no-img.png';

  const { valid, errors } = validateData(newUserData, true);
  if (!valid) {
    return dispatch({ type: SET_ERRORS, payload: errors });
  } else {
    let userId = null;
    firebase
      .auth()
      .createUserWithEmailAndPassword(newUserData.email, newUserData.password)
      .then((data) => {
        data.user
          .getIdToken()
          .then((token) => {
            setAuthorizationHeader(token);
            userId = data.user.uid;
          })
          .then(() => {
            const userCredentials = {
              email: newUserData.email,
              createdAt: new Date().toISOString(),
              imageUrl: `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/${noImg}?alt=media`,
              userId,
            };
            return firestore
              .collection('users')
              .doc(data.user.uid)
              .set(userCredentials);
          });
      })

      .catch((err) => {
        dispatch({ type: SET_ERRORS, payload: { error: err.message } });
      });
  }
};

export const logoutUser = () => (dispatch, getState, { getFirebase }) => {
  const firebase = getFirebase();
  firebase.auth().signOut();
  localStorage.removeItem('FBIdToken');
  delete axios.defaults.headers.common['Authorization'];
  // dispatch({ type: SET_UNAUTHENTICATED });
};

export const getUserData = () => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .get('/user')
    .then((res) => {
      dispatch({
        type: SET_USER,
        payload: res.data,
      });
      dispatch({ type: CLEAR_ERRORS });
    })
    .catch((err) => console.log(err));
};

export const uploadImage = (formData) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .post('/user/image', formData)
    .then((res) => {
      dispatch(getUserData());
      dispatch({ type: SET_MESSAGES, payload: res.data });
    })
    .catch((err) => console.log(err));
};

export const editUserDetails = (userDetails) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .post('/user', userDetails)
    .then((res) => {
      dispatch(getUserData());
      dispatch({ type: SET_MESSAGES, payload: res.data });
    })
    .catch((err) => console.log(err));
};
export const setAuthorizationHeader = (idToken) => {
  const FBIdToken = `Bearer ${idToken}`;
  localStorage.setItem('FBIdToken', FBIdToken);
  axios.defaults.headers.common['Authorization'] = FBIdToken;
};

export const getCurrentUserToken = () => (
  dispatch,
  getState,
  { getFirebase }
) => {
  const firebase = getFirebase();

  firebase
    .auth()
    .currentUser.getIdToken()
    .then(function (idToken) {
      setAuthorizationHeader(idToken);
      getUserData();
      dispatch({ type: 'SET_USER_TOKEN' });
    })
    .catch(function (error) {
      console.log(error);
    });
};

const validateData = (newUser, userExist) => {
  let errors = {};
  if (isEmpty(newUser.email)) {
    errors.email = 'Must not be empty';
  } else if (!isEmail(newUser.email)) {
    errors.email = 'Must be a valid email address';
  }

  if (isEmpty(newUser.password)) errors.password = 'Must not be empty';
  if (userExist) {
    if (newUser.password !== newUser.confirmPassword)
      errors.confirmPassword = 'Passwords must match';
  }

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};
const isEmpty = (string) => {
  if (string.trim() === '') return true;
  else return false;
};

const isEmail = (email) => {
  const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.match(regEx)) return true;
  else return false;
};
