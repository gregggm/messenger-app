import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { toggleActiveUsers } from '../actions';
import { useSpring, animated } from 'react-spring';

const Container = styled(animated.div)`
  width: 300px;
  padding: 15px;
  padding-left: 115px;
	min-height: 100px;
  border-bottom-right-radius: 20px;
  background: ${({theme}) => theme.secondary};
  position: absolute;
  top: 0;
  z-index: 1;
`;

const Button = styled.button`
  position: absolute;
	box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
  top: 20px;
  width: 50px;
  height: 50px;
  left: 300px;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  cursor: pointer;
	border: none;
  background: #ccc;
	color: #000;
	z-index: 2;
`;

const ActiveUsers = () => {
  const { display, users } = useSelector(state => state.activeUsers);
  const dispatch = useDispatch();
  const slide = useSpring({
    config: {
      friction: 17
    },
		left: display ? '-100px' : '-300px',
		boxShadow: display ? '5px 5px 10px rgba(0, 0, 0, 0.2)' : '5px 5px 10px rgba(0, 0, 0, 0)'
  });
  useEffect(() => {
		dispatch(toggleActiveUsers(true))
    setTimeout(() => dispatch(toggleActiveUsers(false)), 2000);
  }, [users]);

  return (
    <Container style={slide} onBlur={() => dispatch(toggleActiveUsers(false))}>
      {users.map(user => (
        <p key={user}>{user}</p>
      ))}
      <Button onClick={() => dispatch(toggleActiveUsers(!display))}>
        Online users
      </Button>
    </Container>
  );
};

export default ActiveUsers;
