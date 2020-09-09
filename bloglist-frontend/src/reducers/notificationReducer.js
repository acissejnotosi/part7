const initialState = "";

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SHOW": {
      return action.data.message;
    }
    default: {
      return state;
    }
  }
};

/* export const show = (message) => {
  return {
    type: "SHOW",
    data: {
      message,
    },
  };
};
 */
export default notificationReducer;
