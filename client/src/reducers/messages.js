import { createSelector } from 'reselect';

const messages = (state = [], action) => {
  switch (action.type) {
    case 'SEND_MESSAGE':
      return state;
      return [...state, action.payload];
    case 'RECIEVE_MESSAGE':
      return [...state, action.payload];
    case 'RECIEVE_PREVIOUS_MESSAGES':
      return [...state, ...action.payload];
    default:
      return state;
  }
};

const getMessages = state => state.messages;

export const getTimeSortedMessages = createSelector(
  [getMessages],
  messages => messages.sort((a, b) => a.timestamp - b.timestamp)
);

export default messages;
