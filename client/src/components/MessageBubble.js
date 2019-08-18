import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const MessageBubble = styled.span`
  max-width: 200px;
  min-width: 30px;
  display: inline-block;
  border-radius: 15px;
	padding: 10px;
  margin-top: 2px;
	background: ${({ isUsers, theme }) => (isUsers ? theme.primary : theme.secondary)};
  color: ${({ isUsers }) => (isUsers ? '#fff' : '#000')};
  float: ${({ isUsers }) => (isUsers ? 'right' : 'left')};
  ${({ position, isUsers }) => {
    if (isUsers) {
      if (position === 'TOP') {
        return {
          'border-bottom-right-radius': '3px'
        };
      } else if (position === 'BOTTOM') {
        return {
          'border-top-right-radius': '3px'
        };
      } else if (position === 'MIDDLE') {
        return {
          'border-bottom-right-radius': '3px',
          'border-top-right-radius': '3px'
        };
      }
    } else {
      if (position === 'TOP') {
        return {
          'border-bottom-left-radius': '3px'
        };
      } else if (position === 'BOTTOM') {
        return {
          'border-top-left-radius': '3px'
        };
      } else if (position === 'MIDDLE') {
        return {
          'border-bottom-left-radius': '3px',
          'border-top-left-radius': '3px'
        };
      }
    }
  }}
`;

MessageBubble.propTypes = {
	isUsers: PropTypes.bool.isRequired,
	position: PropTypes.string.isRequired,
	children: PropTypes.string.isRequired
}

export default MessageBubble;
