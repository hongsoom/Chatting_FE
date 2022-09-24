import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { userAction, cleanMessageList } from "../../redux/modules/chat";
import styled from "styled-components";
import moment from "moment";
import { Text } from "../../elements";

const ChatContent = ({ roomId, setMessageState, messageState, myInfo }) => {
  const dispatch = useDispatch();

  const scrollRef = useRef();

  const { id } = useParams();

  let messageList = useSelector((state) => state.chat.messageList);
  const chatList = useSelector((state) => state.chat.chatList);
  const messageRoodId = useSelector((state) => state.chat.messageRoodId);

  const [requesterId, setRequesterId] = useState("");

  const getMessageList = () => {
    dispatch(userAction.messageListDB(roomId));
    setMessageState(false);
  };

  useEffect(() => {
    dispatch(userAction.chatListDB(roomId));
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messageList]);

  useEffect(() => {
    dispatch(cleanMessageList());
    getMessageList();
    chatList.forEach((message) => {
      if (message.roomId === roomId) {
        setRequesterId(message.requesterId);
      }
    });
  }, [roomId, messageState]);

  return (
    <ChatContentWrap>
      <ChatContentContainer ref={scrollRef}>
        {messageList &&
          messageList.map((chat, i) => {
            const time = moment(chat.date).format("HH:mm");
            const date = moment(chat.date).format("YYYY.MM.DD");
            const mychat =
              chat.senderNickname === String(myInfo && myInfo.nickname);
            return (
              <div>
                {(chat.accType === "OUT" && chat.reqType === "OUT") ||
                (requesterId === Number(myInfo && myInfo.id) &&
                  chat.reqType === "OUT") ||
                (requesterId !== Number(myInfo && myInfo.id) &&
                  chat.accType === "OUT") ||
                (chat.accType === "STATUS" &&
                  chat.reqType === "STATUS") ? null : (
                  <div>
                    <ChatListDate>
                      {chat.date.split("T")[0] !==
                        messageList[i - 1]?.date?.split("T")[0] && date}
                    </ChatListDate>
                    <ChatWrap mychat={mychat}>
                      <Text className="senderNickname" mychat={mychat}>
                        {chat.senderNickname}
                      </Text>
                      <ChatContainer key={chat.senderId} mychat={mychat}>
                        <Chat mychat={mychat}>{chat.message}</Chat>
                        <Text C style={{ marginTop: "40px" }}>
                          {time}
                        </Text>
                      </ChatContainer>
                    </ChatWrap>
                  </div>
                )}
              </div>
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
  max-width: 900px;
  width: 100%;
  max-height: 550px;
  height: 100%;
  padding: 0 10px;
  overflow: hidden;
`;

const ChatContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
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
  flex-direction: ${(props) => (props.mychat ? "row" : "column")};
  justify-content: ${(props) => (props.mychat ? "flex-end" : "0")};
  margin-left: ${(props) => (props.mychat ? "0" : "10px")};
  .senderNickname {
    display: ${(props) => (props.mychat ? "none" : "flex")};
  }
`;

const ChatContainer = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.mychat ? "row-reverse" : "row")};
`;

const Chat = styled.div`
  width: fit-content;
  margin: 10px;
  background-color: ${(props) => (props.mychat ? "#ffc0cb" : "#eeeeee")};
  border-radius: ${(props) =>
    props.mychat ? "15px 0px 15px 15px" : "0px 15px 15px 15px"};
  padding: 20px 30px;
`;

export default ChatContent;
