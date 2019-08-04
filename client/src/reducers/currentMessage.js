const currentMessage = (state = '', action) => {
  switch (action.type) {
    case 'EDIT_MESSAGE':
      return action.payload;
    case 'SEND_MESSAGE':
      return '';
    default:
      return state;
  }
};

export default currentMessage;
