const user = (state = { username: '' }, action) => {
  switch (action.type) {
    case 'CONNECTED':
      return { ...state, username: action.payload.username };
    default:
      return state;
  }
};

export const getUsername = state => state.user.username;

export default user;
