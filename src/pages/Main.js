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
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 10px 10px 10px 10px #dcdcdc;
  max-width: 750px;
  height: 900px;
  width: 100%;
  margin: 0 auto;
`;
export default Main;
