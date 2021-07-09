import axios from '../../axios-common'
import {
  FETCH_STARTED,
  ADD_TODO_SUCCESS,
  ADD_TODO_FAILURE,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE
} from '../constants/action-types';

export const fetchUsers = () => {
  return dispatch => {
    dispatch({
      type: FETCH_STARTED
    });
    axios
      .get(`/users`)
      .then(res => {
        dispatch({
          type: FETCH_USERS_SUCCESS,
          payload: res.data })
      })
      .catch(err => {
        dispatch({
          type: FETCH_USERS_FAILURE,
          payload: err.message
        });
      });
  };
};

export const addUser = (user) => {
  return dispatch => {
    dispatch({
      type: FETCH_STARTED
    });
    axios
      .post(`/users`, user)
      .then(res => {
        dispatch({
          type: ADD_TODO_SUCCESS,
          payload: res.data })
      })
      .catch(err => {
        dispatch({
          type: ADD_TODO_FAILURE,
          payload: err.message
        });
      });
  };
};

export const deleteUser = (id) => {
  return dispatch => {
    dispatch({
      type: FETCH_STARTED
    });
    axios
      .delete(`/users/${id}`)
      .then(() => {
        dispatch({
          type: DELETE_USER_SUCCESS,
          payload: id})
      })
      .catch(err => {
        dispatch({
          type: DELETE_USER_FAILURE,
          payload: err.message
        });
      });
  };
};

