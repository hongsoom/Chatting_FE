import React from "react";
import styled from "styled-components";

const ChatModal = () => {
  return (
    <ChatListWContainer>
      <ChatListWrap>
        <span> </span>
      </ChatListWrap>
    </ChatListWContainer>
  );
};

const ChatListWContainer = styled.div`
  position: relative;
`;

const ChatListWrap = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 10px 10px 10px 10px #dcdcdc;
  max-width: 1500px;
  height: 750px;
  width: 100%;
  margin: 0 auto;
`;

export default ChatModal;
