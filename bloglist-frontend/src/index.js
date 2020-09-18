import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import notificationReducer from "./reducers/notificationReducer";
import blogReducer from "./reducers/blogReducer.js";
import userReducer from "./reducers/userReducer.js";

const reducer = combineReducers({
  notification: notificationReducer,
  blogs: blogReducer,
  currentUser: userReducer,
});

const store = createStore(reducer, composeWithDevTools());

ReactDOM.render(
  <Provider store={store}>
    {" "}
    <App />{" "}
  </Provider>,
  document.getElementById("root")
);
