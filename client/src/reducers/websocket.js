const initialState = { connected: false, sessionID: null };

const websocket = (state = initialState, action) => {
  switch (action.type) {
    case 'CONNECTED':
      return { ...state, connected: true, sessionId: action.payload };
    case 'DISCONNECTED':
      return { ...state, connected: false, sessionId: null };
    default:
      return state;
  }
};

export default websocket;
