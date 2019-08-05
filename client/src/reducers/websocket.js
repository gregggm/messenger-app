const initialState = { connected: false };

const websocket = (state = initialState, action) => {
  switch (action.type) {
    case 'CONNECTED':
      return { ...state, connected: true };
    case 'DISCONNECTED':
      return { ...state, connected: false };
    default:
      return state;
  }
};

export default websocket;
