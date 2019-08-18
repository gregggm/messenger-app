import { createSelector } from 'reselect';
import { getUsername } from './user';

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
  [getSortedMessages, getUsername],
  (messages, username) =>
    messages.reduce((accumulator, message, index, messages) => {
      const latestGroup = accumulator[accumulator.length - 1];

      if (
        messages[index - 1] &&
        (message.sender === messages[index - 1].sender &&
          (message.timestamp - messages[index - 1].timestamp) / 1000 < 60)
      ) {
        if (latestGroup.messages.length === 1) {
          latestGroup.messages[0].position = 'TOP';
        } else {
          latestGroup.messages[latestGroup.messages.length - 1].position =
            'MIDDLE';
        }
        message.position = 'BOTTOM';
        latestGroup.messages.push(message);
      } else {
        let showTimeInfo = false;
        if (latestGroup) {
          if (
            (message.timestamp -
              latestGroup.messages[latestGroup.messages.length - 1].timestamp) /
              1000 >
            1200
          ) {
            showTimeInfo = true;
          }
        }
        message.position = 'ONLY';
        const isUsers = message.sender === username;
        accumulator.push({ messages: [message], isUsers, showTimeInfo });
      }
      return accumulator;
    }, [])
);

export default messages;
