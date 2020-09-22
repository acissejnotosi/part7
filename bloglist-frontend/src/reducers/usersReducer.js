const initialState = null;

const usersReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case "SET": {
      return action.data.users;
    }
    default: {
      return state;
    }
  }
};

export const setUsers = (users) => {
  return {
    type: "SET",
    data: {
      users: users,
    },
  };
};

export default usersReducer;
