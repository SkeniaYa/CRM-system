import {
  ORDER_ADD,
  ORDERS_GET_START,
  ORDERS_GET_SUCCESS,
  ORDERS_GET_ERROR,
} from "../types";

const orderReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case ORDER_ADD: {
      return {
        loading: false,
        error: null,
        values: [...state.values, payload],
      };
    }
    case ORDERS_GET_START: {
      return { ...state, loading: true };
    }

    case ORDERS_GET_SUCCESS: {
      const newValues = payload.filter((el) => el.isDelete === false);

      return { ...state, values: newValues, loading: false, error: null };
    }

    case ORDERS_GET_ERROR: {
      return { ...state, error: payload, loading: false };
    }
    default: {
      return state;
    }
  }
};

export default orderReducer;
