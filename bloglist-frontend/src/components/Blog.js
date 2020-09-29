import React from "react";
import { useRouteMatch } from "react-router-dom";
import blogService from "../services/blogs";
import { showNotification } from "../reducers/notificationReducer";
import { showError } from "../reducers/errorReducer";
import { newFeedback } from "../reducers/blogReducer";
import { useDispatch } from "react-redux";
const shortid = require('shortid');
 
const Blog = ({
  blogs,
  handleLikeButton,
  handleDeleteButton,
  showDeleteButton,
}) => {
  const dispatch = useDispatch();
  const match = useRouteMatch("/blogs/:id");
  if (blogs === null) return null;
  const blog = match ? blogs.find((blog) => blog.id === match.params.id) : null;
  if (blog === null) return null;

  const handleNewComment = async (event) => {
    event.preventDefault();
    const comment = event.target.comment.value;
    console.log(comment)
    try {
      const newBlog = { ...blog, comments: [...blog.comments, comment] };
      console.log(newBlog)
      const updatedBlog = await blogService.updateWithComment(newBlog);
      console.log(updatedBlog)
      dispatch(newFeedback(updatedBlog));
      dispatch(showNotification(`a new comment added`));
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

  return (
    <div>
      {" "}
      <h2>
        {blog.title} {blog.author}
      </h2>
      <div>
        <div>{blog.url} </div>
        <div>
          <div id={"like-label"}>
            {blog.likes} likes
            <button id={"like-button"} onClick={() => handleLikeButton(blog)}>
              Like
            </button>
          </div>
        </div>
        <div>Added by {blog.user.name} </div>
        <button
          style={showDeleteButton}
          onClick={() => handleDeleteButton(blog)}
        >
          delete
        </button>
        <form onSubmit={handleNewComment}>
          <input type="comment" name="comment" id="comment" />
          <button id="login-button" type="submit">
            add comment
          </button>
        </form>
        <h3>comments</h3>
        {blog.comments.map(comment => <div key={shortid.generate()}> {comment}</div>)}
      </div>
    </div>
  );
};

export default Blog;
