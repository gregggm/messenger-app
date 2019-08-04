const user = (state = { username: '' }, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, username: action.payload };
    default:
      return state;
  }
};

export default user;
