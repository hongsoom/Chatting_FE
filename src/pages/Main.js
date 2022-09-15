import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../redux/modules/user";
import styled from "styled-components";
import User from "../components/main/User";
import Chat from "../components/main/Chat";
import ChatRoom from "../components/main/ChatRoom";
import RandomChatList from "../components/chat/RandomChatList";
import ChatModal from "../components/chat/ChatModal";

const Main = ({ myInfo }) => {
  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state.user.userinfo);
  const roomId = useSelector((state) => state.chat.roomId);

  const [room, setRoom] = useState(false);
  const [modal, setModal] = useState(false);

  const RoomOpen = () => {
    setRoom(!room);
  };

  const ModalOpen = () => {
    setModal(!modal);
  };

  useEffect(() => {
    dispatch(userActions.userInfoDB());
  }, []);

  return (
    <MainWrap>
      <User myInfo={myInfo} />
      <ChatMain>
        <ChatLeftWrap>
          {modal ? (
            <RandomChatList
              myInfo={myInfo}
              userInfo={userInfo}
              setRoom={setRoom}
              ModalOpen={ModalOpen}
            />
          ) : (
            <ChatRoom
              userInfo={userInfo}
              ModalOpen={ModalOpen}
              modal={modal}
              roomId={roomId}
            />
          )}
        </ChatLeftWrap>
        <ChatRightWrap>
          {roomId && room ? (
            <ChatModal
              myInfo={myInfo}
              userInfo={userInfo}
              RoomOpen={RoomOpen}
              roomId={roomId}
            />
          ) : (
            <Chat />
          )}
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
`;

const ChatRightWrap = styled.div`
  max-width: 1000px;
  max-height: 800px;
  width: 100%;
  height: 100%;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export default Main;
