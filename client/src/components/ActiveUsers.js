import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { toggleActiveUsers } from '../actions';

const Container = styled.div`
	position: absolute;
	top: 0;
	z-index: 1;
`

const ActiveUsers = () => {
	const { display, users } = useSelector(state => state.activeUsers);
	const dispatch = useDispatch()

	return (
		<Container>
			{display && <div>{users}</div>}
			<button onClick={() => dispatch(toggleActiveUsers(!display))}>Toggle</button>
		</Container>
	)
};

export default ActiveUsers;
