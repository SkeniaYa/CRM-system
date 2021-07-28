import {
  CLIENT_CARD,
  COMMENTS_ADD,
  COMMENTS_DELETE,
  CLIENT_EDIT,
} from "../types";

const currentClientReducer = (state = null, action) => {
  const { type, payload } = action;
  switch (type) {
    case CLIENT_CARD: {
      return payload;
    }
    case COMMENTS_ADD: {
      return payload;
    }
    case CLIENT_EDIT: {
      console.log("PAYLOAD", payload);
      console.log("state", state);

      return payload
    }

    case COMMENTS_DELETE: {
      return {
        ...state,
        comments: state.comments.filter((comment) => comment._id !== payload),
      };
    }
    default: {
      return state;
    }
  }
};

export default currentClientReducer;
