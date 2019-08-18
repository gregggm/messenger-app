import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Message from './Message';
import formatMessageTime from '../services/formatMessageTime';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-self: ${({ isUsers }) => (isUsers ? 'flex-end' : 'flex-start')};
  margin-top: 10px;
  width: 100%;
`;

const UserInfo = styled.span`
  font-size: 0.7em;
  color: #303030;
  display: block;
  padding: 0 10px;
  margin-bottom: 2px;
  text-align: ${({ isUsers }) => (isUsers ? 'right' : 'left')};
`;

const TimeInfo = styled.span`
  font-size: 0.6em;
  color: #303030;
  display: block;
	margin-top: 20px;
	margin-bottom: 10px;
  width: 100%;
  text-align: center;
`;

const MessageGroup = ({ messages, isUsers, showTimeInfo }) => {
  return (
    <Container isUsers={isUsers}>
      {showTimeInfo && <TimeInfo>{formatMessageTime(messages[0].timestamp)}</TimeInfo>}
      {!isUsers && <UserInfo isUsers={isUsers}>{messages[0].sender}</UserInfo>}
      {messages.map(({ id, timestamp, sender, content, status, position }) => {
        return (
          <Message
            key={id}
            timestamp={timestamp}
            sender={sender}
            content={content}
            isUsers={isUsers}
            status={status}
            position={position}
          />
        );
      })}
    </Container>
  );
};

MessageGroup.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
			id: PropTypes.string.isRequired,
      timestamp: PropTypes.instanceOf(Date).isRequired,
      content: PropTypes.string.isRequired,
      sender: PropTypes.string.isRequired,
      position: PropTypes.string.isRequired,
      status: PropTypes.string
    })
  ),
  isUsers: PropTypes.bool.isRequired,
  showTimeInfo: PropTypes.bool.isRequired
};

export default MessageGroup;
