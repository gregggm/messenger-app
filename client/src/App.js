import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import MessageDisplay from './components/MessageDisplay';
import MessageSender from './components/MessageSender';

const GlobalStyle = createGlobalStyle`
  * {
		margin: 0;
    box-sizing: border-box;
    font-family: 'helvetica, sans-serif'
  }
`;

const AppContainer = styled.div`
  height: 100vh;
  background-color: #adadad;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  border-radius: 10px;
  width: 400px;
  height: 600px;
  padding: 10px;
  background-color: white;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.4);
`;

const App = () => (
  <AppContainer>
    <GlobalStyle />
    <Container>
      <MessageDisplay />
      <MessageSender />
    </Container>
  </AppContainer>
);

export default App;
