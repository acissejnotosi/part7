const initialState = null;

const errorReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case "SHOW": {
      return  action.data.message
    }
    default: {
      return state;
    }
  }
};

export const showError = (error) => {
  return {
    type: "SHOW",
    data: {
      message : error,
    },
  };
};

export default errorReducer;
