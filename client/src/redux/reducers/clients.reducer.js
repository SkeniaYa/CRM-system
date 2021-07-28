import {
  CLIENT_EDIT,
  CLIENT_ADD_ALL,
  CLIENTS_GET_START,
  CLIENTS_GET_SUCCESS,
  CLIENTS_GET_ERROR,
  CLIENT_DELETE,
  COMMENTS_ADD,
  CHANGESTARPLUS,
  CHANGESTARMINUS,
} from "../types";

const clientReducer = (state = null, action) => {
  const { type, payload } = action;
  console.log("ClientsReducer");
  switch (type) {
    case CLIENT_ADD_ALL: {
      return { ...state, clients: payload };
    }

    case CLIENTS_GET_START: {
      return { ...state, loading: true };
    }

    case CLIENTS_GET_SUCCESS: {
      const newValue = payload.sort(function (a, b) {
        var nameA = a.surname?.toLowerCase(),
          nameB = b.surname?.toLowerCase();
        if (nameA < nameB) return -1;
        // if (nameA > nameB) return 1;
        // return 0;
      });
      return { ...state, values: newValue, loading: false, error: null };
      // return { values: payload, loading: false, error: null };
    }

    case CLIENTS_GET_ERROR: {
      return { ...state, error: payload, loading: false };
    }
    case CLIENT_EDIT: {
      // console.log("aaaaaaaaa", state);
      return { ...state, clients: payload };
    }
    case CLIENT_DELETE: {
      return { ...state, clients: payload };
    }
    case COMMENTS_ADD: {
      // console.log(111, state);
      // console.log(222, payload);
      return { ...state, comments: payload.comments };
    }

    case CHANGESTARMINUS: {
      // console.log("GGGGGG", payload);
      let change = state.values.map((el) =>
        el._id === payload._id ? payload : el
      );
      // console.log("XXXXX", change);
      return { values: change, loading: false, error: null };
    }

    case CHANGESTARPLUS: {
      // console.log("GGGGGG", payload);
      let change = state.values.map((el) =>
        el._id === payload._id ? payload : el
      );
      // console.log("XXXXX", change);
      return { values: change, loading: false, error: null };
    }

    default: {
      return state;
    }
  }
};

export default clientReducer;
