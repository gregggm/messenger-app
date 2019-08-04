const initialMessages = [
  {
    id: '123',
    timestamp: new Date(123),
    text: 'Hey there',
    username: 'Fred'
  },
  {
    id: '456',
    timestamp: new Date(1234),
    text: 'Hi man',
    username: 'Dan'
  },
  {
    id: '789',
    timestamp: new Date(12345),
    text: 'Wassup',
    username: 'James'
  }
];

const messages = (state = initialMessages, action) => {
  switch (action.type) {
    case 'SEND_MESSAGE':
      return [...state, action.payload];
    case 'RECIEVE_MESSAGE':
      return [...state, action.payload];
    default:
      return state;
  }
};

export default messages;
