import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import SuccessNotification from "./components/Notification";
import ErrorNotification from "./components/errorNotification";
import LoginForm from "./components/login";
import CreateBlog from "./components/createBlog";
import Togglable from "./components/togglable";
import {
  newBlog,
  showBlog,
  deleteBlog,
  likeBlog,
} from "./reducers/blogReducer";
import { connectUser } from "./reducers/userReducer";
import { showNotification } from "./reducers/notificationReducer";

const App = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const blogs = useSelector(({ blogs }) => blogs);
  const notification = useSelector(({ notification }) => notification);
  const user = useSelector(({ currentUser }) => currentUser);

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      dispatch(showBlog(blogs));
    });
  }, [dispatch]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(connectUser(user));
      blogService.setToken(user.token);
    }
  }, [dispatch]);

  const handleUsernameChange = ({ target }) => setUsername(target.value);

  const handlePasswordChange = ({ target }) => setPassword(target.value);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch(connectUser(user));
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("Wrong username or password");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleCreateBlog = async (event) => {
    event.preventDefault();
    try {
      const createdblog = await blogService.create({
        title,
        author,
        url,
      });
      dispatch(newBlog(createdblog));
      dispatch(showNotification(`a new blog ${title} by ${author} added`));
      setTimeout(() => {
        dispatch(showNotification(``));
      }, 5000);
    } catch (exception) {
      setErrorMessage("Error, blog not created");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleDeleteButton = async (blog) => {
    if (window.confirm(`Delete ${blog.title}?`)) {
      try {
        await blogService.del(blog.id);
        dispatch(deleteBlog(blog.id));
        dispatch(showNotification(`Blog ${blog.title} removed with success!`));
        setTimeout(() => {
          dispatch(showNotification(``));
        }, 5000);
      } catch (error) {
        setErrorMessage(error);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      }
    }
  };

  const updateWithLikes = async (blog) => {
    blog.likes += 1;
    const updatedBlog = { ...blog, likes: blog.likes };
    try {
      await blogService.update(blog.id, updatedBlog);
      dispatch(likeBlog(blog.id));
      dispatch(
        showNotification(`Blog ${blog.title} was successfully updated!`)
      );
      setTimeout(() => {
        dispatch(showNotification(``));
      }, 5000);
    } catch (error) {
      setErrorMessage(error);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const showBlogs = () => {
    if (blogs === null) {
      return null;
    }
    return (
      <div>
        {blogs
          .sort((item1, item2) => item1.likes < item2.likes)
          .map((blog) => {
            return (
              <Blog
                key={blog.id}
                blog={blog}
                handleLikeButton={updateWithLikes}
                handleDeleteButton={handleDeleteButton}
                showDeleteButton={
                  blog.user.id === user.id
                    ? { visibility: "visible" }
                    : { visibility: "hidden" }
                }
              />
            );
          })}
      </div>
    );
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    window.location.reload();
  };

  return (
    <div>
      {/*  <SuccessNotification notification = {store.useState}/> */}
      <ErrorNotification message={errorMessage} />
      <h2>blogs</h2>
      {user === null ? (
        <LoginForm
          username={username}
          password={password}
          handleLogin={handleLogin}
          handlePasswordChange={handlePasswordChange}
          handleUsernameChange={handleUsernameChange}
        />
      ) : (
        <div>
          {" "}
          <p>
            {user.name} logged in{" "}
            <button id="logout" type="button" onClick={handleLogout}>
              logout
            </button>
          </p>
          <Togglable buttonLabel="Create">
            <CreateBlog
              title={title}
              author={author}
              url={url}
              handleTitleChange={({ target }) => setTitle(target.value)}
              handleAuthorChange={({ target }) => setAuthor(target.value)}
              handleUrlChange={({ target }) => setUrl(target.value)}
              handleCreateBlog={handleCreateBlog}
            />
          </Togglable>
          {showBlogs()}
        </div>
      )}
    </div>
  );
};

export default App;
