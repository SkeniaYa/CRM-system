import {
  LIST_OF_DELETED_ITEMS,
  DELETE_ITEM,
  CHANGE_STATUS
} from "../types";

export const allDeletedItems = (items) =>({
  type: LIST_OF_DELETED_ITEMS,
  payload : {items}
})

export const deleteItem = (id) =>({
  type: DELETE_ITEM,
  payload: {id}
})

export const changeDeleteStatus = (items)=>({
  type: CHANGE_STATUS,
  payload: {items}
})


export const allDeletedClients = () => (dispatch) => {
  fetch(`http://localhost:3001/admin/clients`,{
    credentials: 'include'
  })
  .then((response) => response.json())
  .then((data)=> dispatch(allDeletedItems(data)))
};

export const allDeletedOrders = () => (dispatch) => {
  fetch(`http://localhost:3001/admin/orders`,{
    credentials: 'include'
  })
  .then((response) => response.json())
  .then((data)=> dispatch(allDeletedItems(data)))
};


export const editThisItem = (url,id) => (dispatch)=>{
  fetch(`${url}/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    
    body: JSON.stringify({
      id,
    }),
    credentials: "include",
  })
  .then((response) => response.json())
  .then((data)=> dispatch(changeDeleteStatus(data)))
  .catch((error) => console.log(error));
}

export const deleteThisItem = (url,id) =>(dispatch)=>{
  fetch(`${url}/${id}`,{
    method:"DELETE",
    credentials: 'include'
  })
  .then((response) => {
    if (response.ok) {
      dispatch(deleteItem(id))
    }
  })
  .catch((error) => console.log(error));
}
