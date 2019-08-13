import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Message from './Message';
import styled from 'styled-components';

import { getPreviousMessages } from '../actions';

const Container = styled.div`
  flex: 10;
  display: flex;
  flex-direction: column;
  position: relative;
  margin-bottom: 10px;
  overflow-y: auto;
  min-height: 0;
  height: 100px;
`;

const Scrollable = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  flex: 1 0 auto;
`;

const MessageDisplay = () => {
  const messages = useSelector(state => state.messages);
  const currentUser = useSelector(state => state.user.username);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPreviousMessages());
  }, []);

  return (
    <Container>
      <Scrollable>
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
      </Scrollable>
    </Container>
  );
};

export default MessageDisplay;
