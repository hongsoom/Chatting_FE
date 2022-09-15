import SockJS from "sockjs-client";
import Stomp from "stompjs";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ChatContent from "./ChatContent";
import ChatUser from "./ChatUser";
import ChatInput from "./ChatInput";

const ChatModal = ({ RoomOpen, myInfo, roomId }) => {
  const [message, setMessage] = useState("");
  const [messageState, setMessageState] = useState(false);

  const webSocket = new SockJS(`${process.env.REACT_APP_API_URL}/ws-stomp`);
  const stomp = Stomp.over(webSocket);

  const stompConnect = () => {
    try {
      //stomp.debug = null;

      stomp.connect(
        {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          type: "TALK",
        },
        () => {
          stomp.subscribe(
            "/sub",
            (data) => {
              const newMessage = JSON.parse(data.body);
              console.log(newMessage);
            },
            { Authorization: `Bearer ${localStorage.getItem("token")}` }
          );
        }
      );
    } catch (err) {}
  };

  const socketDisconnect = () => {
    try {
      //stomp.debug = null;
      stomp.disconnect(
        () => {
          stomp.unsubscribe("sub-0");
        },
        { Authorization: `Bearer ${localStorage.getItem("token")}` }
      );
    } catch (err) {}
  };

  const SendMessage = () => {
    if (!message) return;

    const _reg =
      /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g;
    if (_reg.test(message)) {
      console.log("이모지 NO");
      setMessage("");
      return;
    }

    const data = {
      type: "TALK",
      roomId: roomId,
      senderId: myInfo.id,
      nickname: myInfo.nickname,
      message: message,
      isRead: false,
    };

    stomp.send(
      "/pub/api/chat/message",
      {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      JSON.stringify(data)
    );

    setMessage("");
    setMessageState(true);
  };

  useEffect(() => {
    stompConnect();
  }, [roomId]);

  return (
    <ChatListContainer>
      <ChatUser
        socketDisconnect={socketDisconnect}
        RoomOpen={RoomOpen}
        roomId={roomId}
      />
      <ChatContent
        roomId={roomId}
        messageState={messageState}
        setMessageState={setMessageState}
      />
      <ChatInput
        SendMessage={SendMessage}
        message={message}
        setMessage={setMessage}
      />
    </ChatListContainer>
  );
};

const ChatListContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1000px;
  max-height: 800px;
  height: 100%;
  width: 100%;
  border-bottom-right-radius: 10px;
`;

export default ChatModal;
