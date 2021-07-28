import {
  ORDER_ADD,
  ORDER_ADD_ALL,
  ORDERS_GET_START,
  ORDERS_GET_SUCCESS,
  ORDERS_GET_ERROR,
} from "../types";

export const setAllOrder = (orders) => ({
  type: ORDER_ADD_ALL,
  payload: orders,
});

export const setOrder = (orders) => ({
  type: ORDER_ADD,
  payload: orders,
});

export const getAllOrder = () => (dispatch) => {
  fetch(`http://localhost:3001/orders/new`).then((data) =>
    dispatch(setAllOrder(data))
  );
};

export const getOrder = (data, id, history) => async (dispatch) => {
  const response = await fetch(`http://localhost:3001/orders/new/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      number: data.number,
      typeFurn: data.typeFurn,
      priceFurn: data.priceFurn,
      priceDeliv: data.priceDeliv,
      dateDeliv: data.dateDeliv,
      priceConstr: data.priceConstr,
      dateConstr: data.dateConstr,
      teamDeliv: data.teamDeliv,
      teamConstr: data.teamConstr,
      status: data.status,
      commentsWhenCreate: data.commentsWhenCreate,
      client: id
    }),
  });
  if (response.status === 200) {
    const res = await response.json();
    console.log("1234567899===>", res);
    // console.log(res);
    dispatch(setOrder(res));
    history.push("/orders");
  } else {
    history.push("/orders/new");
  }
};

// ============== /oreders

const getAllOrdersStart = () => ({ type: ORDERS_GET_START });
const getAllOrdersSuccess = (payload) => ({
  type: ORDERS_GET_SUCCESS,
  payload,
});
const getAllOrdersError = (payload) => ({ type: ORDERS_GET_ERROR, payload });

export const getOrders = () => async (dispatch) => {
  dispatch(getAllOrdersStart());
  const response = await fetch("http://localhost:3001/orders/all");
  if (response.ok) {
    const parsedOrders = await response.json();
    console.log(parsedOrders);
    return dispatch(getAllOrdersSuccess(parsedOrders));
  }
  const err = await response.json();
  dispatch(getAllOrdersError(err));
};
