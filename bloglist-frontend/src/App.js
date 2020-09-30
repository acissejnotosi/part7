import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Blog from "./components/blog";
import blogService from "./services/blogs";
import userService from "./services/users";
import SuccessNotification from "./components/successNotification";
import ErrorNotification from "./components/errorNotification";
import LoginForm from "./components/login";
import CreateBlog from "./components/createBlog";
import Togglable from "./components/togglable";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {
  newBlog,
  showBlog,
  deleteBlog,
  likeBlog,
} from "./reducers/blogReducer";
import { connectUser } from "./reducers/userReducer";
import { showNotification } from "./reducers/notificationReducer";
import { showError } from "./reducers/errorReducer";
import Users from "./components/users";
import { setUsers } from "./reducers/usersReducer";
import User from "./components/user";

const App = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const blogs = useSelector(({ blogs }) => blogs);
  const notification = useSelector(({ notification }) => notification);
  const user = useSelector(({ currentUser }) => currentUser);
  const error = useSelector(({ error }) => error);
  const users = useSelector(({ users }) => users);

  const padding = {
    padding: 5,
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const navStyle = {
    padding: 3,
    backgroundColor: "#D3D3D3",
    borderWidth: 1,
    margin: 5,
  };

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      dispatch(showBlog(blogs));
    });
  }, [dispatch]);

/*   useEffect(() => {
    feedbackService.getAll().then((comments) => {
      dispatch(showFeedback(comments));
    });
  }, [dispatch]); */

  useEffect(() => {
    userService.getAll().then((usersGroup) => {
      dispatch(setUsers(usersGroup));
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
    } catch (error) {
      dispatch(showError(error));
      setTimeout(() => {
        dispatch(showError(null));
      }, 5000);
    }
  };

  const handleDeleteButton = async (blog) => {
    if (window.confirm(`Delete ${blog.title}?`)) {
      try {
        this.context.router.push("/blogs");
        await blogService.del(blog.id);
        dispatch(deleteBlog(blog.id));
        dispatch(showNotification(`Blog ${blog.title} removed with success!`));
        setTimeout(() => {
          dispatch(showNotification(``));
        }, 5000);
      } catch (error) {
        dispatch(showError(error));
        setTimeout(() => {
          dispatch(showError(null));
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
      dispatch(showError(error));
      setTimeout(() => {
        dispatch(showError(null));
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
              <div key={blog.id} style={blogStyle}>
                <Link to={`/blogs/${blog.id}`}>
                  {blog.title} {blog.author}
                </Link>
              </div>
            );
          })}
      </div>
    );
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    window.location.reload();
  };

  const LoginLogout = () => {
    return (
      <>
        {user.name} logged in{" "}
        <button id="logout" type="button" onClick={handleLogout}>
          logout
        </button>
      </>
    );
  };

  return (
    <div>
      {user === null ? (
        <LoginForm />
      ) : (
        <Router>
          <div style={navStyle}>
            <Link style={padding} to="/blogs">
              blogs
            </Link>
            <Link style={padding} to="/users">
              users
            </Link>
            <LoginLogout />
          </div>
          <SuccessNotification message={notification} />
          <ErrorNotification message={error} />
          <Switch>
            <Route path="/users/:id">
              <User users={users} />
            </Route>
            <Route path="/blogs/:id">
              <Blog
                blogs={blogs}
                handleDeleteButton={handleDeleteButton}
                handleLikeButton={updateWithLikes}
                dispatch = {dispatch}
              />
            </Route>
            <Route path="/users">
              <Users users={users} />
            </Route>
            <Route path="/blogs">
              {" "}
              <h2>blogs</h2>
              <div>
                {" "}
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
            </Route>
          </Switch>
        </Router>
      )}
    </div>
  );
};

export default App;
