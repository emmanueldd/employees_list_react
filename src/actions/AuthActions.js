import User from '../models/User.js'
import Api from '../api'
import { Actions } from 'react-native-router-flux';
import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER
 } from './types';

export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  }
}

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  }
}

export const loginUser = ({ email, password }) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER })
    // mon return dans usersignup, fait que dispatch ne se lance pas
    Api.userSignUp(email, password)
      .then((user) => loginUserSuccess(dispatch, user))
      .catch((error) => {
        console.log(error);
        loginUserFail(dispatch)
      });
  }
};

const loginUserFail = (dispatch) => {
  dispatch({
    type: LOGIN_USER_FAIL
  });
};

const loginUserSuccess = (dispatch, user) => {
  // console.log('access token =>', User.getAccessToken())
  // Api.createEmployee(null);
  dispatch({
    type: LOGIN_USER_SUCCESS, payload: user
  });

  Actions.employeeList();
};
