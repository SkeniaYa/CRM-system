import { DELETE_USER, SET_USER } from "../types/userTypes";

export const getUserFromServer = (history) => async (dispatch) => {
  const response = await fetch(`http://localhost:3001/auth/user`, {
    credentials: "include",
    headers: { "Access-Control-Allow-Origin": "*" },
  });
  if (response.status === 200) {
    try {
      const currentUser = await response.json();
      dispatch(setUser(currentUser));
    } catch (e) {
      // console.log("else.->>>>>>>>>>>>>>", e);
      await window.open(`http://localhost:3001/auth/signinwithgoogle`);
    }
  }
};

export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

export const signOut = () => async (dispatch) => {
  const response = await fetch("http://localhost:3001/auth/signout", {
    credentials: "include",
    headers: { "Access-Control-Allow-Origin": "*" },
  });
  // console.log(response);
  if (response.status === 200) {
    dispatch(deleteUser());
  }
};

export const deleteUser = () => ({
  type: DELETE_USER,
});

export const checkAuth = () => async (dispatch) => {
  const response = await fetch("http://localhost:3001/auth/check", {
    credentials: "include",
    headers: { "Access-Control-Allow-Origin": "*" },
  });
  if (response.status === 200) {
    const user = await response.json();
    dispatch(setUser(user));
  }
};
