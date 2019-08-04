import { Client } from '@stomp/stompjs';
import { setUser, recieveMessage } from '../actions';

const websocket = store => {
  const client = new Client({
    brokerURL: 'ws://chat-app-backend-server.herokuapp.com/ima',
    debug: function(str) {
      console.log(str);
    },
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000
  });

  client.onConnect = function(frame) {
    const { name } = frame.headers;
    console.log('xxx', name);
    store.dispatch(setUser(name));
    const subscription = client.subscribe('/topic/public-room', message => {
      console.log(JSON.parse(message.body));
      const {
        sender: username,
        content: text,
        timestamp: timeString
      } = JSON.parse(message.body);
      const timestamp = new Date(timeString);
      const id = message.headers['message-id'];
      store.dispatch(
        recieveMessage({
          username,
          text,
          timestamp,
          id
        })
      );
    });

    // Do something, all subscribes must be done is this callback
    // This is needed because this will be executed after a (re)connect
  };

  client.onStompError = function(frame) {
    // Will be invoked in case of error encountered at Broker
    // Bad login/passcode typically will cause an error
    // Complaint brokers will set `message` header with a brief message. Body may contain details.
    // Compliant brokers will terminate the connection after any error
    console.log('Broker reported error: ' + frame.headers['message']);
    console.log('Additional details: ' + frame.body);
  };

  client.activate();

  return next => action => {
    switch (action.type) {
      case 'SEND_MESSAGE':
        const { text, username, timestamp } = action.payload;
        const message = {
          content: text,
          sender: username,
          timestamp
        };
        client.publish({
          destination: '/topic/public-room',
          body: JSON.stringify(message)
        });
        console.log('send', action);
    }
    return next(action);
  };
};

export default websocket;
