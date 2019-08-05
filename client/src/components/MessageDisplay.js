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
      {messages.map(({ id, timestamp, sender, content, status }) => (
        <Message
          key={id}
          timestamp={timestamp}
          sender={sender}
          content={content}
          isUsers={sender === currentUser}
					status={status}
        />
      ))}
    </Container>
  );
};

export default MessageDisplay;
