import {
  FETCH_STARTED,
  ADD_TODO_SUCCESS,
  ADD_TODO_FAILURE,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  EDIT_USER_SUCCESS} from '../constants/action-types'

const initialState = {
  loading: false,
  users: [],
  error: null
};

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_STARTED:
      return {
        ...state,
        loading: true
      };
    case ADD_TODO_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        users: [...state.users, action.payload]
      };
    case ADD_TODO_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    case DELETE_USER_SUCCESS:
      const filteredUsers = state.users.filter((user) => user.id !== action.payload)
      return {
        ...state,
        loading: false,
        users: filteredUsers
      }
    case DELETE_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        users: action.payload
      };
    case FETCH_USERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };

    case EDIT_USER_SUCCESS:
      const updatedUsers = state.users.map((user) => {
        if(user.id !== action.user.id){
          return user;
        }
        return { ...user, ...action.user }
      })
      return {
        ...state,
        users: updatedUsers,
        loading: false,
        error: null
      }

    default:
      return state;
  }
}
