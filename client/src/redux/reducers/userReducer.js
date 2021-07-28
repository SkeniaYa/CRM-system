import { SET_USER, DELETE_USER } from "../types/userTypes";

const userReducer = (state = null, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_USER:
      return payload;

    case DELETE_USER:
      return null;

    default:
      return state;
  }
};

export default userReducer;
