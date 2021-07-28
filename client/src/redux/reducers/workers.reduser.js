import { WORKER_ADD, ALL_WORKERS, CHANGE_ADMIN } from "../types";

const workersReducer = (state = [], action) => {
  const { type, payload } = action;
  switch (type) {
    case WORKER_ADD: {
      const { workers } = payload;
      return [...state, workers]
    }
    case ALL_WORKERS:{
      return payload;
    }
    case CHANGE_ADMIN:{
      let change = state.map((el) => el._id === payload._id ? {...el, isAdmin: !el.isAdmin}  : el)
      
      return change
    }

    default: {
      return state;
    }
  }
};

export default workersReducer;
