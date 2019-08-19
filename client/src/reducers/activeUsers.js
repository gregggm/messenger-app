const activeUsers = (state = { users: [], display: true}, action) => {
  switch (action.type) {
    case 'UPDATE_ACTIVE_USERS':
      return { ...state, users: action.payload};
    case 'TOGGLE_ACTIVE_USERS':
      return { ...state, display: action.payload};
    default:
      return state;
  }
};

export default activeUsers;
