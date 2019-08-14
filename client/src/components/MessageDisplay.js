import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Message from './Message';
import styled from 'styled-components';

import { getPreviousMessages } from '../actions';
import { getTimeSortedMessages } from '../reducers/messages';

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
  const messages = useSelector(getTimeSortedMessages);
  const currentUser = useSelector(state => state.user.username);
  const dispatch = useDispatch();
	const containerEl = useRef(null);

  useEffect(() => {
    dispatch(getPreviousMessages());
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (containerEl.current.scrollTop === 0) {
				dispatch(getPreviousMessages(messages[0].id))
      }
    };
    containerEl.current.scrollTop = containerEl.current.scrollHeight;
    containerEl.current.addEventListener('scroll', handleScroll);
    return () =>
      containerEl.current.removeEventListener('scroll', handleScroll);
  }, [messages]);

  return (
    <Container ref={containerEl}>
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
