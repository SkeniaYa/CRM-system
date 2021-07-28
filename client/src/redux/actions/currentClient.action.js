import {
  COMMENTS_ADD,
  CLIENT_CARD,
  CLIENT_EDIT,
  COMMENTS_DELETE,
} from "../types";

const setCurrentClient = (currentClient) => ({
  type: CLIENT_CARD,
  payload: currentClient,
});

const editCard = (currentClient) => ({
  type: CLIENT_EDIT,
  payload: currentClient,
});

export const getCardCurrentClient = (id) => async (dispatch) => {
  const response = await fetch(`http://localhost:3001/clients/client/${id}`);
  const data = await response.json();
  dispatch(setCurrentClient(data));
};

export const setComments = (comments) => ({
  type: COMMENTS_ADD,
  payload: comments,
});

export const commentDelete = (comment) => ({
  type: COMMENTS_DELETE,
  payload: comment,
});

export const getComments = (data, id, userId, userName) => async (dispatch) => {
  const response = await fetch(`http://localhost:3001/clients/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ body: data.comments, userId, userName }),
  });
  const res = await response.json();
  dispatch(setComments(res));
};

export const getEditClient = (data, id) => async (dispatch) => {
  // console.log("IDIDID", id, data);
  const response = await fetch(`http://localhost:3001/clients/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: data.name,
      surname: data.surname,
      patronymic: data.patronymic,
      email: data.email,
      phone: data.phone,
      address: data.address,
    }),
  });
  const res = await response.json();
  console.log("res", res);
  dispatch(editCard(res));
};

export const getDeleteClient = (id, history) => async (dispatch) => {
  const response = await fetch(`http://localhost:3001/clients/delete/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });
  const res = await response.json();
  if (response.status === 200) {
    dispatch(setCurrentClient(res));
    history.push("/clients");
  } else {
    history.push(`/clients/client/${id}`);
  }
};

export const getDeleteComment = (id) => async (dispatch) => {
  const response = await fetch(`http://localhost:3001/comments/delete/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });
  const res = await response.json();
  dispatch(commentDelete(res));
};
