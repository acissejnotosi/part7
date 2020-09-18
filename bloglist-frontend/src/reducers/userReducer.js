const initialState = null;

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CONNECT": {
      return action.data.user;
    }
    default: {
      return state;
    }
  }
};

export const connectUser = (user) => {
  return {
    type: "CONNECT",
    data: {
      user: user,
    },
  };
};

export default userReducer;
