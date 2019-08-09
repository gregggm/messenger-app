import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useTransition, animated } from 'react-spring';

const Container = styled.div`
  display: block;
  align-self: ${({ isUsers }) => (isUsers ? 'flex-end' : 'flex-start')};
`;

const MessageInfo = styled(animated.span)`
  font-size: 0.8em;
  color: #303030;
  display: block;
`;

const MessageBubble = styled.span`
  max-width: 200px;
  display: inline-block;
  border-radius: 15px;
  padding: 10px;
  background: ${({ isUsers }) => (isUsers ? '#0099ff' : '#f0f0f0')};
  color: ${({ isUsers }) => (isUsers ? '#fff' : '#000')};
  float: ${({ isUsers }) => (isUsers ? 'right' : 'left')};
`;


const Message = ({ timestamp, content, sender, isUsers, isGrouped }) => {
  let timeout;
  const [showInfo, toggleInfo] = useState(isGrouped);
  const transition = useTransition(showInfo, null, {
    from: { opacity: 0, height: 0 },
    enter: item => async (next, cancel) => {
      await next({ height: 20 });
      await next({ opacity: 1 });
    },
    leave: item => async (next, cancel) => {
      await next({ opacity: 0 });
      await next({ height: 0 });
    }
  });
  return (
    <Container
      isUsers={isUsers}
      onClick={() => {
        toggleInfo(!showInfo);
        clearTimeout(timeout)
        timeout = setTimeout(() => toggleInfo(true), 8000)
      }}
    >
      {transition.map(
        ({ item, key, props }) =>
          item || (
            <MessageInfo style={props}>
              {sender} {timestamp.toTimeString().slice(0, 8)}
            </MessageInfo>
          )
      )}

      <MessageBubble isUsers={isUsers}>{content}</MessageBubble>
    </Container>
  );
};

Message.propTypes = {
  timestamp: PropTypes.instanceOf(Date).isRequired,
  content: PropTypes.string.isRequired,
  sender: PropTypes.string.isRequired,
  isUsers: PropTypes.bool.isRequired,
  isGrouped: PropTypes.bool,
  status: PropTypes.string
};

export default Message;
