const initialState = null;

const feedbackReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SHOWCOMMENTS": {
      return  action.data.comments
    }
    default: {
      return state;
    }
  }
};

export const showFeedback = (comments) => {
  return {
    type: "SHOWCOMMENTS",
    data: {
      comments : comments,
    },
  };
};

export default feedbackReducer;
