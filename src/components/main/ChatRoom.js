import React from "react";
import styled from "styled-components";
import { Text } from "../../elements";

const ChatRoom = () => {
  return (
    <ChatRoomWrap>
      <Text S15>왼쪽 채팅을 클릭하여</Text>
      <Text S15>채팅을 시작해주세요!</Text>
    </ChatRoomWrap>
  );
};

const ChatRoomWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 1000px;
  max-height: 800px;
  height: 100%;
  width: 100%;
  border-bottom-right-radius: 10px;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export default ChatRoom;
