import {
  ORDER_ONE,
  ORDER_DELETE,
  ORDER_COMMENT,
  COMMENT_DELETE,
  ORDER_EDIT,
} from "../types";

const currentOrderReducer = (state = null, action) => {
  // console.log(1234124123);
  const { type, payload } = action;
  // console.log("PAYLOAD===>", action);
  switch (type) {
    case ORDER_ONE: {
      return payload;
    }
    case ORDER_DELETE: {
      return null;
    }
    case ORDER_COMMENT: {
      return payload;
    }
    case COMMENT_DELETE: {
      return payload;
    }
    case ORDER_EDIT: {
      const qwe = {
        ...payload,
        comments: state.comments,
      };
      return qwe;
    }
    default: {
      return state;
    }
  }
};

export default currentOrderReducer;
