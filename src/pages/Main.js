import React from "react";
import styled from "styled-components";
import User from "../components/main/User";
import Chat from "../components/main/Chat";

const Main = () => {
  return (
    <MainWrap>
      <User />
      <Chat />
    </MainWrap>
  );
};

const MainWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 20px 20px 20px #dcdcdc;
`;
export default Main;
