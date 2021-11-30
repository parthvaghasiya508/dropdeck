import { ACTION_SET_USER } from "../actions/user";

export const userReducer = (state = {}, action) => {
  switch (action.type) {
    case ACTION_SET_USER:
      return action.user;
    default:
      return state;
  }
};
