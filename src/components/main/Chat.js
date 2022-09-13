import React, { useState } from "react";
import styled from "styled-components";
import { Text } from "../../elements";
import ChatList from "../chat/ChatList";
import ChatRoom from "./ChatRoom";
import chat from "../../assets/chat.png";

const Chat = ({ userInfo }) => {
  const [room, setRoom] = useState(false);
  const [modal, setModal] = useState(false);

  const RoomOpen = () => {
    setRoom(!room);
  };

  const ModalOpen = () => {
    setModal(!modal);
  };

  return (
    <>
      {room && <ChatRoom RoomOpen={RoomOpen} />}
      <ChatWrap>
        <Text H1 style={{ margin: "50px 50px 20px" }}>
          Chat
        </Text>
        <ChatList userInfo={userInfo} ModalOpen={ModalOpen} modal={modal} />
        <ChatRoomWrap onClick={RoomOpen} room={room}>
          <img src={chat} alt="chat" />
          <Text BM style={{ marginLeft: "22px" }}>
            채팅
          </Text>
        </ChatRoomWrap>
      </ChatWrap>
    </>
  );
};

const ChatWrap = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1000px;
  max-height: 800px;
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

const ChatRoomWrap = styled.div`
  display: ${(props) => (props.room === true ? "none" : "0")};
  position: absolute;
  background-color: #fff;
  right: 20px;
  bottom: 20px;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  box-shadow: 5px 5px 5px 5px #dcdcdc;
  cursor: pointer;
  & > img {
    width: 45px;
    margin-left: 13px;
    height: 45px;
  }
`;
export default Chat;
