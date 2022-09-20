import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { userActions } from "../redux/modules/user";
import styled from "styled-components";
import ChatHeader from "../components/main/ChatHeader";
import ChatRoom from "../components/main/ChatRoom";
import ChatList from "../components/main/ChatList";
import RandomChatList from "../components/chat/RandomChatList";
import ChatModal from "../components/chat/ChatModal";

const Chat = ({ myInfo }) => {
  const dispatch = useDispatch();

  const { id } = useParams();

  const userInfo = useSelector((state) => state.user.userinfo);
  const roomId = useSelector((state) => state.chat.roomId);

  const [modal, setModal] = useState(false);
  const [reqOut, setReqOut] = useState(false);
  const [accOut, setAccOut] = useState(false);

  const ModalOpen = () => {
    setModal(!modal);
  };

  useEffect(() => {
    dispatch(userActions.userInfoDB());
  }, []);

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
              roomId={roomId}
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
