import { COMMENT_ADD } from "../types";

const commentsReducer = (state = [], action) => {
  const { type, payload } = action;
  switch (type) {
    case COMMENT_ADD: {
      return [...state, payload];
    }
    default: {
      return state;
    }
  }
};

export default commentsReducer;
