import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useTransition, animated } from 'react-spring';

const Span = styled(animated.span)`
  font-size: 0.6em;
  color: #303030;
  display: block;
  width: 100%;
  text-align: center;
`;

const MessageInfo = ({ showInfo, timestamp }) => {
  const transition = useTransition(showInfo, null, {
    config: {
      mass: 0.1,
      friction: 20
    },
    from: {
      position: 'relative',
      opacity: 0,
      height: 0,
      marginTop: 0,
      marginBottom: 0
    },
    enter: { opacity: 1, height: 10, marginTop: 10, marginBottom: 5 },
    leave: { opacity: 0, height: 0, marginTop: 0, marginBottom: 0 }
  });

  return transition.map(
    ({ item, key, props }) =>
      item && (
        <Span key={key} style={props}>
          {timestamp.toLocaleString()}
        </Span>
      )
  );
};

MessageInfo.propTypes = {
  showInfo: PropTypes.bool.isRequired,
  timestamp: PropTypes.instanceOf(Date).isRequired
};

export default MessageInfo;
