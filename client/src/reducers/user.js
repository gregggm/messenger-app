const user = (state = { username: '' }, action) => {
  switch (action.type) {
    case 'CONNECTED':
      return { ...state, username: action.payload };
    default:
      return state;
  }
};

export default user;
