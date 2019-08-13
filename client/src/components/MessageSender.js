import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editMessage, sendMessage } from '../actions';
import styled from 'styled-components';

const Container = styled.div`
  flex: 0.5;
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  display: block;
`;

const TextArea = styled.textarea`
  resize: none;
  display: inline-block;
  padding: 0;
  width: 88%;
  height: 100%;
  font-size: 1em;
`;

const Button = styled.button`
  position: absolute;
  right: 0;
  display: inline-block;
  width: 10%;
  height: 100%;
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
      <Button onClick={send}>Send</Button>
    </Container>
  );
};

export default MessageSender;
