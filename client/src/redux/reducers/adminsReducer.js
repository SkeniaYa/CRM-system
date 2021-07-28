import {
  LIST_OF_DELETED_ITEMS,
  DELETE_ITEM,
  CHANGE_STATUS
} from "../types";

const adminsItemsReducer = (state=[], action)=>{
  const { type, payload } = action;
  switch (type) {
    case LIST_OF_DELETED_ITEMS: {
      const items = payload.items
      return items
    }
    case DELETE_ITEM:{
      const { id } = payload;
      return state.filter((el) => el._id !== id)
    }
    case CHANGE_STATUS:{
      const { items } = payload;
      console.log(items);
      return state.filter((el) => el._id !== items._id)
    }
    default: {
      return state;
    }
  }
}
 export default adminsItemsReducer
