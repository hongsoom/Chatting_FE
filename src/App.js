import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { userActions } from 'redux/modules/user';
import GlobalStyles from 'styles/GlobalStyles';
import Router from 'Router';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userActions.myInfoDB());
  }, []);

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
`;
