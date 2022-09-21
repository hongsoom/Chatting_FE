import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userAction } from "../../redux/modules/chat";
import styled from "styled-components";
import MyChatList from "./MyChatList";
import { Text } from "../../elements";
import chat from "../../assets/chat.png";

const ChatList = ({ myInfo, reqOut, accOut, ModalOpen, roomId }) => {
  const dispatch = useDispatch();

  const chatList = useSelector((state) => state.chat.chatList);
  const notification = useSelector((state) => state.chat.notification);

  console.log(notification);

  const [banmodal, setBanModal] = useState(false);

  const BanModalOpen = () => {
    setBanModal(!banmodal);
  };

  const getChatList = () => {
    dispatch(userAction.chatListDB());
  };

  useEffect(() => {
    getChatList();
  }, [roomId]);

  return (
    <ChatListWrap>
      <ChatTitle>
        {notification && <NewNoti />}
        <Text
          S1
          style={{
            width: "250px",
            height: "80px",
            padding: "25px",
            borderBottom: banmodal === false && "5px solid rgb(175, 176, 179)",
          }}
          onClick={BanModalOpen}
        >
          채팅목록
        </Text>
        <Text
          S1
          style={{
            width: "250px",
            height: "80px",
            padding: "25px",
            borderBottom: banmodal === true && "5px solid rgb(175, 176, 179)",
          }}
          onClick={BanModalOpen}
        >
          차단목록
        </Text>
      </ChatTitle>
      <MyChatList
        banmodal={banmodal}
        chatList={chatList}
        myInfo={myInfo}
        reqOut={reqOut}
        accOut={accOut}
        roomId={roomId}
      />
      <ChatIconWrap onClick={ModalOpen}>
        <img src={chat} alt="chat" />
        <Text BM style={{ marginLeft: "25px" }}>
          채팅
        </Text>
      </ChatIconWrap>
    </ChatListWrap>
  );
};

const ChatListWrap = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  max-width: 500px;
  max-height: 800px;
  height: 100%;
  width: 100%;
  border-bottom-left-radius: 10px;
  border-right: 1px solid rgb(175, 176, 179);
`;

const NewNoti = styled.div`
  width: 14px;
  height: 14px;
  border-radius: 10px;
  position: absolute;
  right: 5px;
  bottom: 45px;

  &:before {
    position: absolute;
    left: 0;
    top: -10%;
    width: 100%;
    height: 120%;

    filter: blur(10px);
    content: "";
    opacity: 0;
    animation: flash 0.9s ease-out alternate infinite;
  }
  @keyframes flash {
    to {
      opacity: 1;
    }
  }
`;

const ChatTitle = styled.div`
  display: flex;
  flex-direction: row;
  text-align: center;
`;

const ChatIconWrap = styled.div`
  position: absolute;
  background-color: #fff;
  right: 20px;
  bottom: 20px;
  width: 75px;
  height: 75px;
  border-radius: 50%;
  box-shadow: 5px 5px 5px 5px #dcdcdc;
  cursor: pointer;
  & > img {
    width: 45px;
    margin-left: 15px;
    height: 45px;
  }
  @media screen and (max-width: 768px) {
    position: fixed;
  }
`;

export default ChatList;
