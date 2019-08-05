import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  display: block;
  align-self: ${({ isUsers }) => (isUsers ? 'flex-end' : 'flex-start')};
`;

const MessageInfo = styled.span`
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

const Message = ({ timestamp, content, sender, isUsers }) => {
  return (
    <Container isUsers={isUsers}>
      <MessageInfo>
        {sender} {timestamp.toTimeString().slice(0, 8)}
      </MessageInfo>
      <MessageBubble isUsers={isUsers}>
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
  status: PropTypes.string
};

export default Message;
