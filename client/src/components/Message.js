import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import MessageInfo from './MessageInfo';
import MessageBubble from './MessageBubble';

const Container = styled.div`
  display: block;
  width: 100%;
  align-self: ${({ isUsers }) => (isUsers ? 'flex-end' : 'flex-start')};
`;

const Message = ({ timestamp, content, sender, isUsers, position }) => {
  const [showInfo, setShowInfo] = useState(false);
  const timeout = useRef();

  return (
    <Container
      isUsers={isUsers}
      onClick={() => {
        clearTimeout(timeout.current);
        setShowInfo(!showInfo);
        timeout.current = setTimeout(() => setShowInfo(false), 5000);
      }}
    >
      <MessageInfo showInfo={showInfo} timestamp={timestamp} />
      <MessageBubble isUsers={isUsers} position={position}>
        {content}
      </MessageBubble>
    </Container>
  );
};

Message.propTypes = {
  timestamp: PropTypes.instanceOf(Date).isRequired,
  content: PropTypes.string.isRequired,
  sender: PropTypes.string.isRequired,
  isUsers: PropTypes.bool.isRequired,
  status: PropTypes.string,
  position: PropTypes.string.isRequired
};

export default Message;
