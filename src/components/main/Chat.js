import React from "react";
import styled from "styled-components";
import { Text } from "../../elements";
import ChatList from "../chat/ChatList";

const Chat = ({ userInfo }) => {
  return (
    <ChatWrap>
      <Text H1 style={{ margin: "50px 50px 20px" }}>
        Chat
      </Text>
      <ChatList userInfo={userInfo} />
    </ChatWrap>
  );
};
const ChatWrap = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 500px;
  max-height: 900px;
  height: 100%;
  width: 100%;
  background-color: #f5f5f5;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  & > img {
    width: 300px;
    margin-left: 30px;
    height: 150px;
  }
`;
export default Chat;
