import React from "react";
import { useRouteMatch } from "react-router-dom";

const User = ({ users }) => {
  const match = useRouteMatch("/users/:id");
  if (users === null) return null;
  const user = match ? users.find((user) => user.id === match.params.id) : null;
  if (user === null) return null;

  return (
    <>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
      {user.blogs.map((blog) => (
        <li key={blog.id}>
          {blog.title}
        </li>
      ))}
      </ul>
    </>
  );
};

export default User;
