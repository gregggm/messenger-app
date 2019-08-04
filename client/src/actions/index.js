import { SENDING } from "../constants/messageStatus";

export const setUser = username => ({
	type: 'SET_USER',
	payload: username
})

export const editMessage = text => ({
  type: 'EDIT_MESSAGE',
  payload: text
});

export const sendMessage = text => (dispatch, getState) => {
  const { user } = getState();

  dispatch({
    type: 'SEND_MESSAGE',
    payload: {
      text,
      username: user.username,
      timestamp: new Date(),
			id: '1',
			status: SENDING
    }
  });
};

export const recieveMessage = message => ({
  type: 'RECIEVE_MESSAGE',
  payload: message
});
