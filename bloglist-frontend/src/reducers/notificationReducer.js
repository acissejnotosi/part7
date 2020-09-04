const initialState = "";

const notificationReducer = (state = initialState, action) => {
  console.log(action.data)
  switch (action.type) {
    case "SHOW": {
      return action.data;
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
