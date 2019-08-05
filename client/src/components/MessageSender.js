import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editMessage, sendMessage } from '../actions';
import styled from 'styled-components';

const Container = styled.div`
  width: 90%;
  display: block;
  margin: 0 auto;
`;

const TextArea = styled.textarea`
  resize: none;
  display: inline-block;
  padding: 0;
  width: 100%;
`;

const MessageSender = () => {
  const text = useSelector(state => state.currentMessage);
  const dispatch = useDispatch();
  const textAreaEl = useRef(null);
  useEffect(() => textAreaEl.current.focus(), []);

  const handleInput = event => dispatch(editMessage(event.target.value));
  const send = () => {
    dispatch(sendMessage(text));
    textAreaEl.current.focus();
  };

  return (
    <Container>
      <TextArea
        ref={textAreaEl}
        type="text"
        value={text}
        onChange={handleInput}
        onKeyPress={e => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            send();
          }
        }}
      />
      <button onClick={send}>Send</button>
    </Container>
  );
};

export default MessageSender;