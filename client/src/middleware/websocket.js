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
    store.dispatch(setUser(name));

    const subscription = client.subscribe('/topic/public-room', message => {
      console.log('RECIEVE' ,JSON.parse(message.body));
      const {
        sender,
        content,
        timestamp: timeString
      } = JSON.parse(message.body);
      const timestamp = new Date(timeString);
      const id = message.headers['message-id'];
      store.dispatch(
        recieveMessage({
          sender,
          content,
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
        const { content, sender, timestamp } = action.payload;
        const message = {
          content,
          sender,
          timestamp
        };
        client.publish({
          destination: '/topic/public-room',
          body: JSON.stringify(message)
        });
        console.log('SEND', message);
    }
    return next(action);
  };
};

export default websocket;