import { WORKER_ADD, ALL_WORKERS, CHANGE_ADMIN } from "../types";

export const addWorker = (workers) => ({
  type: WORKER_ADD,
  payload: { workers },
});

export const allworkers = (workers) => ({
  type: ALL_WORKERS,
  payload:  workers,
});
export const changeAdmin = (workers) => ({
  type: CHANGE_ADMIN,
  payload: workers,
});

export const addWorkerEmail = (data, history) => async (dispatch) => {
  const response = await fetch(`http://localhost:3001/admin/workers/added/new`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      email: data.email,
    }),
  });
  if (response.status === 200) {
    const res = await response.json()
    dispatch(addWorker(res));
  }
  // history.replaceState("/clients");
  // } else {
  // history.replaceState("/clients/new");
  // }
};
