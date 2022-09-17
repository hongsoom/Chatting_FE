import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { userAction } from "../../redux/modules/chat";
import styled from "styled-components";
import moment from "moment";

const ChatContent = ({ roomId, setMessageState, messageState }) => {
  const dispatch = useDispatch();

  const { id } = useParams();

  const scrollRef = useRef();

  const messageList = useSelector((state) => state.chat.messageList);
  console.log(messageList);

  const getMessageList = () => {
    if (roomId) {
      dispatch(userAction.messageListDB(roomId));
    } else {
      dispatch(userAction.messageListDB(id));
    }
    setMessageState(false);
  };

  useEffect(() => {
    if (roomId) {
      dispatch(userAction.chatListDB(roomId));
    } else {
      dispatch(userAction.chatListDB(id));
    }
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
                <>
                  {chat.date.split("T")[0] !==
                    messageList[index - 1]?.date?.split("T")[0] && (
                    <ChatListDate key={chat.date}>
                      {moment(chat.date).format("YYYY.MM.DD")}
                    </ChatListDate>
                  )}
                  <ChatWrap key={index}>
                    <ChatTime>
                      {moment(messageList[index - 1]?.date).format("HH:mm")}
                    </ChatTime>
                    <MyChat key={chat.messageId}>{chat.message}</MyChat>
                  </ChatWrap>
                </>
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
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const ChatListDate = styled.div`
  width: 100%;
  text-align: center;
`;

const ChatWrap = styled.div`
  display: flex;
  flex-direction: row;
`;

const ChatTime = styled.div`
  margin-top: 40px;
`;

const MyChat = styled.div`
  width: fit-content;
  margin: 10px;
  background-color: #ffc0cb;
  border-radius: 15px 0px 15px 15px;
  padding: 20px 30px;
`;

export default ChatContent;
