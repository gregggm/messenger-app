//YOU WILL NEED TO DO 'npm i @stomp/stompjs'

import React from 'react';
var Stomp = require('stompjs');


class App extends React.Component {
  constructor() {
    super();
    this.name = "";
  }

  createStompClient() {
    this.stompClient = Stomp.client("ws://localhost:8080/ima");
    this.connect()
  }

  connect() {
    //You can set this to false if you want to see the logs between client and server with respect to websocket
    this.stompClient.debug = true;

    this.stompClient.connect({}, (frame) => {
      this.name = frame.headers.name;
      
      //Subscribing to channel /topic/chatroom
      this.stompClient.subscribe('/topic/chatroom', (data) => {
        //Here I can handle whatever I want to do with the messages that come to this subscription

      });

      //Subscribing to channel /queue/whateverNameIsGiven
      this.stompClient.subscribe('/queue/'+this.name, (data) => {
      //Here I can handle whatever I want to do with the messages that come to this subscription

    });

    });
  }

  render() {
    return (
      <div className="App">
        {
          this.createStompClient()

          }
  
      </div>
    );
  }
}

export default App;