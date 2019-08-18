import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MessageGroup from './MessageGroup';
import styled from 'styled-components';

import { getPreviousMessages } from '../actions';
import { getGroupedSortedMessages } from '../reducers/messages';
import useScroll from '../hooks/useScroll';

const Container = styled.div`
  flex: 10;
  display: flex;
  flex-direction: column;
  position: relative;
  margin-bottom: 10px;
  overflow-y: auto;
  min-height: 0;
  height: 100px;
`;

const Scrollable = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  flex: 1 0 auto;
`;

const MessageDisplay = () => {
  const messageGroups = useSelector(getGroupedSortedMessages);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPreviousMessages());
  }, []);

	const scrollContainer = useScroll();
	
  return (
    <Container ref={scrollContainer}>
      <Scrollable>
        {messageGroups.map(({messages, isUsers, showTimeInfo}) => {
          return (
            <MessageGroup
              key={messages[0].id}
              messages={messages}
              isUsers={isUsers}
							showTimeInfo={showTimeInfo}
            />
          );
        })}
      </Scrollable>
    </Container>
  );
};

export default MessageDisplay;
