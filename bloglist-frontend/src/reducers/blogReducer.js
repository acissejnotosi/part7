const initialState = null;

const blogReducer = (state = initialState, action) => {
  console.log(action.data);
  switch (action.type) {
    case "NEW": {
      return [...state, action.data.blogs];
    }
    case "SHOWBLOGS": {
      return action.data.blogs;
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

export default blogReducer;
