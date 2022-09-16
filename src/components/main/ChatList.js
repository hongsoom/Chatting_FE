import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userAction } from "../../redux/modules/chat";
import styled from "styled-components";
import MyChatList from "../chat/MyChatList";
import { Text } from "../../elements";
import chat from "../../assets/chat.png";

const ChatList = ({ myInfo, reqOut, accOut, ModalOpen, roomId }) => {
  const dispatch = useDispatch();

  const chatList = useSelector((state) => state.chat.chatList);

  const getChatList = () => {
    dispatch(userAction.chatListDB());
  };

  useEffect(() => {
    getChatList();
  }, [roomId]);

  return (
    <ChatListWrap>
      <Text
        S1
        style={{
          height: "80px",
          padding: "30px",
          borderBottom: "1px solid rgb(175, 176, 179)",
        }}
      >
        채팅
      </Text>
      {chatList ? (
        <MyChatList
          chatList={chatList}
          myInfo={myInfo}
          reqOut={reqOut}
          accOut={accOut}
        />
      ) : (
        <Text
          B2
          style={{
            height: "80px",
            padding: "30px",
            borderBottom: "1px solid rgb(175, 176, 179)",
          }}
        >
          진행 중인 채팅이 없습니다.
        </Text>
      )}
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
