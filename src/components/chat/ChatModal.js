import SockJS from "sockjs-client";
import Stomp from "stompjs";
import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import ChatContent from "./ChatContent";
import { Button, Input } from "../../elements";
import exit from "../../assets/exit.png";

const ChatModal = ({ RoomOpen }) => {
  const dispatch = useDispatch();

  const webSocket = new SockJS(`${process.env.REACT_APP_API_URL}/ws-stomp`);
  const stomp = Stomp.over(webSocket);

  const stompConnect = () => {
    try {
      //stomp.debug = null;
      //웹소켓 연결시 stomp에서 자동으로 connect이 되었다는것을
      //console에 보여주는데 그것을 감추기 위한 debug

      stomp.connect(
        {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          type: "TALK",
        },
        () => {
          stomp.subscribe(
            `서버주소`,
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

  useEffect(() => {
    stompConnect();

    return () => {
      // 언마운트 시 연결 해제
    };
  }, []);

  return (
    <ChatListContainer>
      <ChatTop>
        <img src={exit} alt="exit" onClick={RoomOpen} />
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
        ></Input>
        <Button
          S
          width="80px"
          height="50px"
          padding="10px"
          style={{ borderRadius: "15px", borderColor: "#ffb6c1" }}
          className="chatButton"
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
