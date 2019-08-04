import React from 'react';
import { useSelector } from 'react-redux';
import Message from './Message';
import styled from 'styled-components';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
`

const MessageDisplay = () => {
  const messages = useSelector(state => state.messages);
  const currentUser = useSelector(state => state.user.username);

  return (
    <Container>
      {messages.map(({ id, timestamp, username, text, status }) => (
        <Message
          key={id}
          timestamp={timestamp}
          username={username}
          text={text}
          isUsers={username === currentUser}
					status={status}
        />
      ))}
    </Container>
  );
};

export default MessageDisplay;
