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

export const getSortedMessages = createSelector(
  [getMessages],
  messages => messages.sort((a, b) => a.timestamp - b.timestamp)
);

export const getGroupedSortedMessages = createSelector(
  [getSortedMessages],
  messages =>
    messages.reduce(
      (accumulator, message, index, messages) => {
        if (
          messages[index - 1] &&
          message.sender === messages[index - 1].sender
        ) {
          accumulator[0].push(message);
        } else {
          accumulator.push([message]);
        }
        return accumulator;
      },
      []
    )
);

export default messages;
