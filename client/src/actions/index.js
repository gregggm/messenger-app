import { SENDING } from '../constants/messageStatus';

export const connected = username => ({
  type: 'CONNECTED',
  payload: username
});

export const editMessage = text => ({
  type: 'EDIT_MESSAGE',
  payload: text
});

export const sendMessage = text => (dispatch, getState) => {
  const { user } = getState();

  dispatch({
    type: 'SEND_MESSAGE',
    payload: {
      content: text,
      sender: user.username,
      timestamp: new Date(),
      status: SENDING
    }
  });
};

export const recieveMessage = message => ({
  type: 'RECIEVE_MESSAGE',
  payload: message
});

export const getPreviousMessages = messageId => async dispatch => {
  if (messageId) {
    dispatch({
      type: 'REQUEST_PREVIOUS_MESSAGES',
      payload: messageId
    });
    const response = await fetch(
      'https://chat-app-backend-server.herokuapp.com/message/previous/10',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: messageId
      }
    ).catch(console.error);
    const { messages } = await response.json();
    const previousMessgaes = messages.map(({ _id, sender, content, timeSent }) => ({
      id: JSON.stringify(_id),
      sender,
      content,
      timestamp: new Date(timeSent)
    }));
    dispatch({
      type: 'RECIEVE_PREVIOUS_MESSAGES',
      payload: previousMessgaes
    });
  } else {
    dispatch({
      type: 'REQUEST_PREVIOUS_MESSAGES'
    });
    const response = await fetch(
      'https://chat-app-backend-server.herokuapp.com/messages/latest/20'
    );
    const { messages } = await response.json();
    const previousMessgaes = messages.map(({ _id, sender, content, timeSent }) => ({
      id: JSON.stringify(_id),
      sender,
      content,
      timestamp: new Date(timeSent)
    }));
    dispatch({
      type: 'RECIEVE_PREVIOUS_MESSAGES',
      payload: previousMessgaes
    });
  }
};
