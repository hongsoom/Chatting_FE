import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { userActions } from "../redux/modules/user";
import { notification } from "../redux/modules/chat";
import styled from "styled-components";
import ChatHeader from "../components/main/ChatHeader";
import ChatRoom from "../components/main/ChatRoom";
import ChatList from "../components/main/ChatList";
import RandomChatList from "../components/chat/RandomChatList";
import ChatModal from "../components/chat/ChatModal";

const Chat = ({ myInfo }) => {
  const dispatch = useDispatch();
  const navigator = useNavigate();

  const { id } = useParams();

  const eventSource = useRef();

  const userInfo = useSelector((state) => state.user.userinfo);
  const roomId = useSelector((state) => state.chat.roomId);
  const myId = useSelector((state) => state.user.myId);
  const messageList = useSelector((state) => state.chat.messageList);

  const [modal, setModal] = useState(false);
  const [reqOut, setReqOut] = useState(false);
  const [accOut, setAccOut] = useState(false);

  const ModalOpen = () => {
    setModal(!modal);
  };

  useEffect(() => {
    dispatch(userActions.userInfoDB());
  }, []);

  useEffect(() => {
    if (roomId) {
      navigator(`/chat/${roomId}`);
    }
  }, [roomId]);

  useEffect(() => {
    if (myId) {
      // SSE 구독 요청
      eventSource.current = new EventSource(
        `${process.env.REACT_APP_API_URL}/api/subscribe/${myId}`
      );

      // 서버에서 메시지가 전송될 때 실행되는 함수
      eventSource.current.onmessage = (message) => {
        console.log(message);
        if (!message.data.includes("EventStream Created")) {
          dispatch(notification(true));
          console.log("연결 성공");
        }
      };
    }
    return () => {
      // 언마운트 시 연결 종료
      if (eventSource.current) {
        eventSource.current.close();
        eventSource.current = null;
      }
    };
  }, [myId]);

  return (
    <MainWrap>
      <ChatHeader myInfo={myInfo} />
      <ChatMain>
        <ChatLeftWrap roomId={roomId}>
          {modal ? (
            <RandomChatList
              myInfo={myInfo}
              userInfo={userInfo}
              reqOut={reqOut}
              accOut={accOut}
              ModalOpen={ModalOpen}
            />
          ) : (
            <ChatList
              myInfo={myInfo}
              reqOut={reqOut}
              accOut={accOut}
              ModalOpen={ModalOpen}
              roomId={roomId}
            />
          )}
        </ChatLeftWrap>
        <ChatRightWrap roomId={roomId}>
          {id ? <ChatModal myInfo={myInfo} roomId={roomId} /> : <ChatRoom />}
        </ChatRightWrap>
      </ChatMain>
    </MainWrap>
  );
};

const MainWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 10px 10px 10px 10px #dcdcdc;
  max-width: 1500px;
  height: 900px;
  width: 100%;
  margin: 20px auto;
  @media screen and (max-width: 768px) {
    box-shadow: none;
    margin: 0 auto;
    max-width: 100vw;
    max-height: 100vh;
  }
`;

const ChatMain = styled.div`
  display: flex;
  flex-direction: row;
  max-wdith: 1500px;
  max-height: 800px;
  width: 100%;
  height: 100%;
`;

const ChatLeftWrap = styled.div`
  max-width: 500px;
  max-height: 800px;
  width: 100%;
  height: 100%;
  @media screen and (max-width: 768px) {
    display: ${({ roomId }) => roomId && "none"};
  }
`;

const ChatRightWrap = styled.div`
  max-width: 1000px;
  max-height: 800px;
  width: 100%;
  height: 100%;
  @media screen and (max-width: 768px) {
    display: ${({ roomId }) => !roomId && "none"};
  }
`;

export default Chat;
