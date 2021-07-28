import { createStore, applyMiddleware } from "redux";
import reducer from "./reducers/root";
import initialState from "./initialState";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);

// const store = createStore(
//   reducer,
//   getInitState(),
//   composeWithDevTools(applyMiddleware(thunk))
// );

// store.subscribe(() => {
//   window.localStorage.setItem('redux', JSON.stringify(store.getState()))
// })

export default store;
