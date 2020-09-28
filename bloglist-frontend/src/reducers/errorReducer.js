const initialState = null;

const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SHOWERROR": {
      return  action.data.message
    }
    default: {
      return state;
    }
  }
};

export const showError = (error) => {
  return {
    type: "SHOWERROR",
    data: {
      message : error,
    },
  };
};

export default errorReducer;
