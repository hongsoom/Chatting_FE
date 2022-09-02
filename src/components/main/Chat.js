import React from "react";
import styled from "styled-components";
import ChatList from "../chatting/ChatList";

const Chat = () => {
  return (
    <ChatWrap>
      <p>logo</p>
      <ChatList />
    </ChatWrap>
  );
};

const ChatWrap = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 600px;
  max-height: 900px;
  height: 100%;
  width: 100%;
  background-color: #f5f5f5;
  & > p {
    width: 300px;
    margin-left: 30px;
    height: 150px;
  }
`;

export default Chat;
