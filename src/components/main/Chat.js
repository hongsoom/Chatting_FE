import React, { useState } from "react";
import styled from "styled-components";
import { Text } from "../../elements";
import ChatList from "../chatting/ChatList";
import logo from "../../assets/logo.png";

const Chat = () => {
  const [modal, setModal] = useState(false);

  const ModalOpen = () => {
    setModal(!modal);
  };
  return (
    <ChatWrap>
      {/*       <Text H1 style={{ margin: "50px 50px 20px" }}>
        Chat
      </Text> */}
      <img src={logo} alt="logo" />
      <ChatList ModalOpen={ModalOpen} modal={modal} />
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
  & > img {
    width: 300px;
    margin-left: 30px;
    height: 150px;
  }
`;

export default Chat;
