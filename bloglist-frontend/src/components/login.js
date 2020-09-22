import React from "react";
//import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import blogService from "../services/blogs";
import loginService from "../services/login";
import { connectUser } from "../reducers/userReducer";
import { showNotification } from "../reducers/notificationReducer";


const LoginForm = (props) => {
  const dispatch = useDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const username = event.target.username.value;
      const password = event.target.password.value;
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch(connectUser(user));
    } catch (exception) {
      dispatch(showNotification("Wrong username or password"));
      setTimeout(() => {
        dispatch(showNotification(null));
      }, 5000);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          name="Username"
          id="username"
        />
      </div>
      <div>
        password
        <input
          type="password"
          name="Password"
          id="password"
        />
      </div>
      <button id="login-button" type="submit">
        login
      </button>
    </form>
  );
};

export default LoginForm;
