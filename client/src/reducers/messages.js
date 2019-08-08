const messages = (state = [], action) => {

  switch (action.type) {
    case 'SEND_MESSAGE':
			return state;
      return [...state, action.payload];
    case 'RECIEVE_MESSAGE':
      return [...state, action.payload];
    case 'RECIEVED_PREVIOUS_MESSAGES':
      return [...state, ...action.payload]
    default:
      return state;
  }
};

export default messages;
