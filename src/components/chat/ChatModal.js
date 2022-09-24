import SockJS from "sockjs-client";
import Stomp from "stompjs";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userAction, notification } from "../../redux/modules/chat";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import swal from "sweetalert";
import ChatContent from "./ChatContent";
import ChatUser from "./ChatUser";
import ChatInput from "./ChatInput";
import Loading from "../share/Loading";

const ChatModal = ({ myInfo, roomId }) => {
  const dispatch = useDispatch();

  const { id } = useParams();

  const acceptorId = useSelector((state) => state.chat.userId);

  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messageState, setMessageState] = useState(false);

  let stompClient = useRef(null);

  const stompConnect = () => {
    const webSocket = new SockJS(`${process.env.REACT_APP_API_URL}/ws-stomp`);
    stompClient.current = Stomp.over(webSocket);
    try {
      stompClient.current.debug = null;

      stompClient.current.connect(
        {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          type: "TALK",
        },
        () => {
          stompClient.current.subscribe(
            `/sub/api/chat/room/${roomId}`,
            (data) => {
              const messageFromServer = JSON.parse(data.body);
              dispatch(userAction.messageListDB(roomId));
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
      stompClient.current.debug = null;
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
      swal({
        title: "이모티콘은 사용할 수 없습니다 😢",
        icon: "error",
        closeOnClickOutside: false,
      }).then(function () {
        setMessage("");
      });
      return;
    }

    const data = {
      accType: "TALK",
      reqType: "TALK",
      roomId: roomId,
      senderId: myInfo && myInfo.id,
      nickname: myInfo && myInfo.nickname,
      acceptorId: acceptorId,
      message: message,
      isRead: false,
    };

    waitForConnection(stompClient.current, () => {
      stompClient.current.debug = null;
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

  useEffect(() => {
    return () => {
      dispatch(notification(false));
    };
  }, [dispatch]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <ChatListContainer>
          <ChatUser
            socketDisconnect={socketDisconnect}
            roomId={roomId}
            myInfo={myInfo}
          />
          <ChatContent
            roomId={roomId}
            messageState={messageState}
            setMessageState={setMessageState}
            myInfo={myInfo}
            id={id}
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
  max-width: 9000px;
  max-height: 700px;
  height: 100%;
  width: 100%;
  border-bottom-right-radius: 10px;
`;

export default ChatModal;
