import { CLIENT_DELETE, CLIENT_ADD_ALL, CLIENTS_GET_START, CLIENTS_GET_SUCCESS, CLIENTS_GET_ERROR, COMMENTS_ADD, CHANGESTARMINUS, CHANGESTARPLUS } from "../types";


export const setAllClient = (clients) => ({
  type: CLIENT_ADD_ALL,
  payload: clients,
});

export const getClient = (data, history, value) => async (dispatch) => {
  const response = await fetch(`http://localhost:3001/clients/new`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      name: data?.name,
      surname: data?.surname,
      patronymic: data?.patronymic,
      email: data?.email,
      phone: data?.phone,
      address: value?.value,
    }),
  });
  if (response.status === 200) {
    await response.json();
    history.push("/clients");
  } else {
    history.push("/clients/new");
  }
};

const getAllClientsStart = () => ({ type: CLIENTS_GET_START });

const getAllClientsSuccess = (payload) => ({
  type: CLIENTS_GET_SUCCESS,
  payload,
});
const getAllClientsError = (payload) => ({ type: CLIENTS_GET_ERROR, payload });

export const getClients = () => async (dispatch) => {
  dispatch(getAllClientsStart());
  const response = await fetch("http://localhost:3001/clients/all");
  if (response.ok) {
    const parsedClients = await response.json();
    return dispatch(getAllClientsSuccess(parsedClients));
  }
  const err = await response.json();
  dispatch(getAllClientsError(err));
};

export const getEditClient = (data, id) => async (dispatch) => {
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
  dispatch(setAllClient(res));
};


export const deleteClient = (clients) => ({
  type: CLIENT_DELETE,
  payload: clients,
})

export const getDeleteClient = (id) => async (dispatch) => {
  const response = await fetch(`http://localhost:3001/clients/delete/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({id})
  })
  dispatch(deleteClient(response))
}


export const setComments = (comments) => ({
  type: COMMENTS_ADD,
  payload: comments,
})

export const getComments = (data, id, userId, userName) => async (dispatch) => {
  const response = await fetch(`http://localhost:3001/clients/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({body: data.comments, userId, userName})
})
  const res = await response.json()
  dispatch(setComments(res))
}

export const delStar = (client) => ({
  type: CHANGESTARMINUS,
  payload: client,
})

export const setDelStar = (client, currUser) => async (dispatch) => {
const response = await fetch('http://localhost:3001/clients/stardell', {
        method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ client, currUser }),
})
const res = await response.json()
dispatch(delStar(res))
}


export const addStar = (client) => ({
  type: CHANGESTARPLUS,
  payload: client,
})

export const setAddStar = (client, currUser) => async (dispatch) => {
const response = await fetch('http://localhost:3001/clients/staradd', {
        method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ client, currUser }),
})
const res = await response.json()
dispatch(addStar(res))
}
