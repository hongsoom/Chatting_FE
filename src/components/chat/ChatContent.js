import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userAction } from "../../redux/modules/chat";
import styled from "styled-components";

const ChatContent = ({ roomId, setMessageState, messageState }) => {
  const dispatch = useDispatch();

  const messageList = useSelector((state) => state.chat.messageList);

  const getMessageList = () => {
    dispatch(userAction.messageListDB(roomId));
    setMessageState(false);
  };

  useEffect(() => {
    getMessageList();
  }, [roomId, messageState]);

  return (
    <ChatContentWrap>
      {messageList.map((chat, index) => {
        return <MyChat key={index}>{chat.message}</MyChat>;
      })}
    </ChatContentWrap>
  );
};

const ChatContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 100%;
  max-height: 650px;
  height: 100%;
  overflow: auto;
  -ms-overflow-style: none;
  ::-webkit-scrollbar {
    display: none;
    width: 0 !important;
  }
`;

const MyChat = styled.div`
  width: fit-content;
  margin: 10px;
  background-color: rgb(242, 242, 242);
  border-radius: 15px 0px 15px 15px;
  padding: 20px 30px;
`;

export default ChatContent;