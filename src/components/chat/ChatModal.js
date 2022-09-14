import SockJS from "sockjs-client";
import Stomp from "stompjs";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userAction } from "../../redux/modules/chat";
import styled from "styled-components";
import ChatContent from "./ChatContent";
import { Button, Input } from "../../elements";
import exit from "../../assets/exit.png";

const ChatModal = ({ RoomOpen, myInfo, userInfo }) => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");

  const roomId = useSelector((state) => state.chat.roomId);

  const webSocket = new SockJS(`${process.env.REACT_APP_API_URL}/ws-stomp`);
  const stomp = Stomp.over(webSocket);

  const stompConnect = () => {
    try {
      stomp.debug = null;

      stomp.connect(
        {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          type: "TALK",
        },
        () => {
          stomp.subscribe(
            `${process.env.REACT_APP_API_URL}`,
            (data) => {
              const newMessage = JSON.parse(data.body);
              //데이터 파싱
            },
            { Authorization: `Bearer ${localStorage.getItem("token")}` }
          );
        }
      );
    } catch (err) {}
  };

  const socketDisconnect = () => {
    stomp.disconnect();
    RoomOpen();
  };

  const ExitRoom = () => {
    dispatch(userAction.exitRoomDB(roomId));
  };

  const SendMessage = () => {
    if (!message) return;
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
  };

  const handleMessage = (e) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    stompConnect();

    return () => {
      socketDisconnect();
    };
  }, [roomId]);

  return (
    <ChatListContainer>
      <ChatTop>
        <Button
          S
          width="80px"
          height="36px"
          bg="#fff"
          color="#000"
          margin="10px 0 0 0"
          borderRadius="15px"
          borderColor="#000"
          onClick={ExitRoom}
        >
          나가기
        </Button>
        <img src={exit} alt="exit" onClick={socketDisconnect} />
      </ChatTop>
      <ChatMiddle>
        <ChatContent />
      </ChatMiddle>
      <ChatBottom>
        <Input
          S
          width="950px"
          height="60px"
          padding="10px"
          style={{
            borderRadius: "15px",
            borderColor: "rgb(175, 176, 179)",
          }}
          placeholder="메시지를 입력해주세요."
          className="chatInput"
          autocomplete="off"
          maxLength={150}
          onChange={handleMessage}
        ></Input>
        <Button
          S
          width="80px"
          height="50px"
          padding="10px"
          style={{ borderRadius: "15px", borderColor: "#ffb6c1" }}
          className="chatButton"
          onClick={SendMessage}
          disabled={!message}
        >
          보내기
        </Button>
      </ChatBottom>
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

const ChatTop = styled.div`
  display: flex;
  justify-content: flex-end;
  & > img {
    width: 15px;
    height: 15px;
    margin: 20px;
    cursor: pointer;
  }
`;

const ChatMiddle = styled.div`
  width: 100%;
  max-height: 650px;
  height: 100%;
`;

const ChatBottom = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  .chatButton {
    position: absolute;
    background-color: #ffb6c1;
    color: #fff;
    font-weight: 600;
    right: 30px;
    bottom: 5px;
  }
`;

export default ChatModal;
