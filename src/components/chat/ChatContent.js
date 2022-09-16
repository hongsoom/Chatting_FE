import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userAction } from "../../redux/modules/chat";
import styled from "styled-components";

const ChatContent = ({ roomId, setMessageState, messageState }) => {
  const dispatch = useDispatch();

  const scrollRef = useRef();

  const messageList = useSelector((state) => state.chat.messageList);
  console.log(messageList);

  const getMessageList = () => {
    dispatch(userAction.messageListDB(roomId));
    setMessageState(false);
  };

  useEffect(() => {
    dispatch(userAction.chatListDB(roomId));
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messageList]);

  useEffect(() => {
    getMessageList();
  }, [roomId, messageState]);

  return (
    <ChatContentWrap>
      <ChatContentContainer ref={scrollRef}>
        {messageList.map((chat, index) => {
          return (
            <>
              {chat.type === "TALK" && (
                <MyChat key={index}>{chat.message}</MyChat>
              )}
            </>
          );
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
  background-color: #ffc0cb;
  border-radius: 15px 0px 15px 15px;
  padding: 20px 30px;
`;

export default ChatContent;
