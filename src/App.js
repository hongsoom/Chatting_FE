import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import styled from 'styled-components';
import GlobalStyles from 'styles/GlobalStyles';
import Router from 'router/Router';

const App = () => {
  return (
    <Wrap>
      <GlobalStyles />
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </Wrap>
  );
};

export default App;

const Wrap = styled.div`
  display: flex;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
  align-content: center;
  flex-direction: column;
`;
