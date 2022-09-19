import SockJS from "sockjs-client";
import Stomp from "stompjs";
import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import ChatContent from "./ChatContent";
import ChatUser from "./ChatUser";
import ChatInput from "./ChatInput";
import Loading from "../share/Loading";

const ChatModal = ({ myInfo, roomId }) => {
  const [message, setMessage] = useState("");
  const [messageState, setMessageState] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  let stompClient = useRef(null);

  const stompConnect = () => {
    const webSocket = new SockJS(`${process.env.REACT_APP_API_URL}/ws-stomp`);
    stompClient.current = Stomp.over(webSocket);
    try {
      //stompClient.current.debug = null;

      stompClient.current.connect(
        {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          type: "TALK",
        },
        () => {
          stompClient.current.subscribe(
            "/sub",
            (data) => {
              const newMessage = JSON.parse(data.body);
              console.log(newMessage);
            },
            { Authorization: `Bearer ${localStorage.getItem("token")}` }
          );
          setIsLoading(false);
        }
      );
    } catch (err) {}
  };

  const socketDisconnect = () => {
    try {
      //stomp.debug = null;
      stompClient.current.disconnect(
        () => {
          stompClient.current.unsubscribe("sub-0");
        },
        { Authorization: `Bearer ${localStorage.getItem("token")}` }
      );
    } catch (err) {}
  };

  const waitForConnection = (stompClient, callback) => {
    setTimeout(function () {
      if (stompClient.ws.readyState === 1) {
        callback();
      } else {
        waitForConnection(stompClient, callback);
      }
    }, 0.1);
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

    waitForConnection(stompClient.current, () => {
      stompClient.current.send(
        "/pub/api/chat/message",
        {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        JSON.stringify(data)
      );
      setMessageState(true);
    });
    setMessage("");
  };

  useEffect(() => {
    setIsLoading(true);
    stompConnect();
  }, [roomId]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <ChatListContainer>
          <ChatUser socketDisconnect={socketDisconnect} roomId={roomId} />
          <ChatContent
            roomId={roomId}
            messageState={messageState}
            setMessageState={setMessageState}
            myInfo={myInfo}
          />
          <ChatInput
            SendMessage={SendMessage}
            message={message}
            setMessage={setMessage}
          />
        </ChatListContainer>
      )}
    </>
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
