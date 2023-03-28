import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import styled from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import Router from './Router';

function App() {
  return (
    <Wrap>
      <GlobalStyles />
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </Wrap>
  );
}

export default App;

const Wrap = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  box-shadow: 10px 10px 10px 10px #dcdcdc;
  max-width: 400px;
  height: 700px;
  width: 100%;
  top: 100px;
  left: 50%;
  transform: translate(-50%, 0%);
`;
