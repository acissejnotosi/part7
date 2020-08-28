import React, { useState } from "react";

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: "solid",
  borderWidth: 1,
  marginBottom: 5,
};

const Blog = ({
  blog,
  handleLikeButton,
  handleDeleteButton,
  showDeleteButton,
}) => {
  const [blogVisible, setBlogVisible] = useState(false);
  const hideWhenVisible = { display: blogVisible ? "none" : "" };
  const showWhenVisible = { display: blogVisible ? "" : "none" };

  const label = "view";
  return (
    <div style={blogStyle}>
      {" "}
      {blog.title} {blog.author}
      <button
        style={hideWhenVisible}
        id={"view"}
        className="visibleContent"
        onClick={() => setBlogVisible(true)}
      >
        {label}
      </button>
      <button style={showWhenVisible} onClick={() => setBlogVisible(false)}>
        hide
      </button>
      <div style={showWhenVisible} className="hiddenContent">
        <div>{blog.url} </div>
        <div>
          <div id={"like-label"}>{blog.likes}</div>
          <button id={"like-button"} onClick={() => handleLikeButton(blog)}>
            like
          </button>
        </div>
        <div>{blog.user.name} </div>
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
