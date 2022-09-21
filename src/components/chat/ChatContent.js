import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userAction } from "../../redux/modules/chat";
import styled from "styled-components";
import moment from "moment";
import { Text } from "../../elements";

const ChatContent = ({ roomId, setMessageState, messageState, myInfo }) => {
  const dispatch = useDispatch();

  const scrollRef = useRef();

  let messageList = useSelector((state) => state.chat.messageList);
  console.log("messageList", messageList);

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

  (() => {
    let slicedList = [];
    messageList.forEach((message) => {
      slicedList = [...slicedList, message];
      if (
        message.type === "OUT" &&
        message.senderName === String(myInfo && myInfo.username)
      ) {
        slicedList = [];
      }
    });
    messageList = slicedList;
  })();

  return (
    <ChatContentWrap>
      <ChatContentContainer ref={scrollRef}>
        {messageList &&
          messageList.map((chat, index) => {
            const time = moment(chat.date).format("HH:mm");
            const date = moment(chat.date).format("YYYY.MM.DD");
            return (
              <>
                <ChatListDate key={index}>
                  {chat.date.split("T")[0] !==
                    messageList[index - 1]?.date?.split("T")[0] && date}
                </ChatListDate>
                {chat.type === "TALK" && (
                  <>
                    {chat.senderNickname ===
                    String(myInfo && myInfo.nickname) ? (
                      <MyChatWrap>
                        <ChatTime>
                          {time !==
                            moment(messageList[index - 1]?.date).format(
                              "HH:mm"
                            ) && time}
                        </ChatTime>
                        <MyChat key={chat.messageId}>{chat.message}</MyChat>
                      </MyChatWrap>
                    ) : (
                      <YourChatWrap>
                        <Text>{chat.senderNickname}</Text>
                        <YorChatContainer>
                          <YourChat key={chat.messageId}>
                            {chat.message}
                          </YourChat>
                          <ChatTime>
                            {time !==
                              moment(messageList[index - 1]?.date).format(
                                "HH:mm"
                              ) && time}
                          </ChatTime>
                        </YorChatContainer>
                      </YourChatWrap>
                    )}
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
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const ChatListDate = styled.div`
  width: 100%;
  text-align: center;
  display: ${(props) => props.key && "none"};
`;

const MyChatWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
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

const YourChatWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
`;

const YorChatContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const YourChat = styled.div`
  width: fit-content;
  margin: 10px;
  background-color: #eeeeee;
  border-radius: 0px 15px 15px 15px;
  padding: 20px 30px;
`;

export default ChatContent;
