const initialState = null;

const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    case "NEW": {
      return [...state, action.data.blogs];
    }
    case "SHOWBLOGS": {
      return action.data.blogs;
    }
    case "DELETE": {
      const id = action.data.id;
      const newState = state.filter((blog) => blog.id !== id);
      console.log(newState);
      return newState;
    }
    case "LIKE": {
      const id = action.data.id;
      const blogToChange = state.find((n) => n.id === id);
      const changedBlog = {
        ...blogToChange,
        likes: blogToChange.likes,
      };
      return state.map((blog) => (blog.id !== id ? blog : changedBlog));
    }
    case "FEEDBACK": {
      console.log(action.data.blog)
      return state.map((blog) => (blog.id !== action.data.blog.id ? blog : action.data.blog));
    }
    default: {
      return state;
    }
  }
};

export const showBlog = (blogs) => {
  return {
    type: "SHOWBLOGS",
    data: {
      blogs: blogs,
    },
  };
};

export const newBlog = (blogs) => {
  return {
    type: "NEW",
    data: {
      blogs: blogs,
    },
  };
};

export const deleteBlog = (id) => {
  return {
    type: "DELETE",
    data: {
      id: id,
    },
  };
};

export const likeBlog = (id) => {
  return {
    type: "LIKE",
    data: {
      id: id,
    },
  };
};

export const newFeedback = (blog) => {
  return {
    type: "FEEDBACK",
    data: {
      blog : blog
    },
  };
};


export default blogReducer;
