import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import MessageDisplay from './components/MessageDisplay';
import MessageSender from './components/MessageSender';

const GlobalStyle = createGlobalStyle`
  body {
		background-color: grey;
		margin: 0;
  }
`;

const Container = styled.div`
  width: 496px;
  margin: 0 auto;
	padding: 10px;
  height: 100vh;
  background-color: white;
`;

const App = () => (
  <>
    <GlobalStyle />
    <Container>
      <MessageDisplay />
      <MessageSender />
    </Container>
  </>
);

export default App;
