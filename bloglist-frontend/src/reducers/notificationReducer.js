const initialState = null;

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SHOW": {
      return  action.data.message
    }
    default: {
      return state;
    }
  }
};

export const showNotification = (message) => {
  return {
    type: "SHOW",
    data: {
      message : message,
    },
  };
};

export default notificationReducer;
