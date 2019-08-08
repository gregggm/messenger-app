import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Message from './Message';
import styled from 'styled-components';
import { getPreviousMessages } from '../actions';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 95%;
  position: relative;
  overflow-y: scroll;
  padding-bottom: 10px;
`;

const MessageDisplay = () => {
  const messages = useSelector(state => state.messages);
  const currentUser = useSelector(state => state.user.username);
  const dispatch = useDispatch();

  const messagesReducer = (
    accumulator,
    currentVal,
    index,
    array
  ) => {
    console.log(accumulator)
    const { timestamp, sender, content } = currentVal
    return [
      ...accumulator,
      <Message
        key={1}
        timestamp={timestamp}
        sender={sender}
        content={content}
        isUsers={sender === currentUser}
        status={status}
        isGrouped={!!array[index - 1] && (array[index - 1].sender === sender)}
      />
    ];
  };

  useEffect(() => {
    dispatch(getPreviousMessages());
  }, []);

  return <Container>{messages.reduce(messagesReducer, [])}</Container>;
};

export default MessageDisplay;
