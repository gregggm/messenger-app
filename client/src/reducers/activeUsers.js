const activeUsers = (state = [], action) => {
  switch (action.type) {
    case 'UPDATE_ACTIVE_USERS':
      return action.payload;
    default:
      return state;
  }
};

export default activeUsers;
