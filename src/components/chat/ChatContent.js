import React, { useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userAction } from "../../redux/modules/chat";
import styled from "styled-components";

const ChatContent = ({ roomId, setMessageState, messageState }) => {
  const dispatch = useDispatch();

  const scrollRef = useRef();

  const messageList = useSelector((state) => state.chat.messageList);

  const getMessageList = () => {
    dispatch(userAction.messageListDB(roomId));
    setMessageState(false);
  };

  useEffect(() => {
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messageList]);

  useEffect(() => {
    getMessageList();
  }, [roomId, messageState]);

  return (
    <ChatContentWrap>
      <ChatContentContainer ref={scrollRef}>
        {messageList.map((chat, index) => {
          return <MyChat key={index}>{chat.message}</MyChat>;
        })}
      </ChatContentContainer>
    </ChatContentWrap>
  );
};

const ChatContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  max-width: 1000px;
  width: 100%;
  max-height: 650px;
  height: 100%;
  overflow: hidden;
`;

const ChatContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const MyChat = styled.div`
  width: fit-content;
  margin: 10px;
  background-color: #FFC0CB;
  border-radius: 15px 0px 15px 15px;
  padding: 20px 30px;
`;

export default ChatContent;
