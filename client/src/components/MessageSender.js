import React, { useRef, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editMessage, sendMessage } from '../actions';
import { useSpring, animated } from 'react-spring';
import styled, { ThemeContext } from 'styled-components';

const Container = styled.div`
  position: relative;
  display: flex;

  justify-content: center;
  width: 100%;
  height: 45px;
  display: block;
`;

const TextArea = styled.input`
  box-sizing: border-box;
  outline: none;
  border: none;
  resize: none;
  background-color: #f0f0f0;
  border-radius: 20px;
  display: inline-block;
  padding-left: 10px;
  width: 85%;
  height: 100%;
  font-size: 1em;
`;

const Button = styled(animated.button)`
  position: absolute;
  right: 0;
  display: inline-block;
  width: 12.5%;
  height: 100%;
  border-radius: 20px;
  outline: none;
  border: none;
  background-color: transparent;
	cursor: pointer;
`;

const MessageSender = () => {
  const text = useSelector(state => state.currentMessage);
	const textHasContent = text.trim().length > 0;
	const theme = useContext(ThemeContext);

  const dispatch = useDispatch();
	const textAreaEl = useRef(null);

  const animate = useSpring({
		config: { 
			friction: 20,
			clamp: true
		 },
		color: textHasContent ? theme.primary : '#303030',
  });
  useEffect(() => textAreaEl.current.focus(), []);

  const handleInput = event => dispatch(editMessage(event.target.value));
  const send = () => {
    if (textHasContent) {
      dispatch(sendMessage(text));
    }
    textAreaEl.current.focus();
  };

  return (
    <Container>
      <TextArea
        placeholder="Aa"
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
      <Button style={animate} onClick={send}>
        Send
      </Button>
    </Container>
  );
};

export default MessageSender;
