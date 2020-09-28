import React from "react";
import { useRouteMatch } from "react-router-dom";

const Blog = ({
  blogs,
  handleLikeButton,
  handleDeleteButton,
  showDeleteButton,
}) => {
  const match = useRouteMatch("/blogs/:id");
  if (blogs === null) return null;
  const blog = match ? blogs.find((blog) => blog.id === match.params.id) : null;
  if (blog === null) return null;

  return (
    <div>
      {" "}
      <h2>{blog.title} {blog.author}</h2>
      <div>
        <div>{blog.url} </div>
        <div>
          <div id={"like-label"}>{blog.likes} likes<button id={"like-button"} onClick={() => handleLikeButton(blog)}>Like</button></div>
          
        </div>
        <div>Added by {blog.user.name} </div>
        <button
          style={showDeleteButton}
          onClick={() => handleDeleteButton(blog)}
        >
          delete
        </button>
      </div>
    </div>
  );
};

export default Blog;
