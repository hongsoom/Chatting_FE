import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { userActions } from "../redux/modules/user";
import { userAction } from "../redux/modules/chat";
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
    dispatch(userAction.banUserListDB());
  }, []);

  useEffect(() => {
    if (roomId) {
      navigator(`/chat/${roomId}`);
    }
  }, [roomId]);

  return (
    <MainWrap>
      <ChatHeader myInfo={myInfo} />
      <ChatMain>
        <ChatLeftWrap id={id}>
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
        <ChatRightWrap id={id}>
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
  max-width: 1300px;
  height: 800px;
  width: 100%;
  margin: 30px auto;
  @media screen and (min-width: 300px) and (max-width: 768px) {
    box-shadow: none;
    margin: 0 auto;
    max-width: 100vw;
    max-height: 100vh;
  }
`;

const ChatMain = styled.div`
  display: flex;
  flex-direction: row;
  max-wdith: 1300px;
  max-height: 700px;
  width: 100%;
  height: 100%;
`;

const ChatLeftWrap = styled.div`
  max-width: 400px;
  max-height: 700px;
  width: 100%;
  height: 100%;
  @media screen and (min-width: 300px) and (max-width: 768px) {
    display: ${({ id }) => id && "none"};
    max-width: 100vw;
    max-height: 100vh;
  }
`;

const ChatRightWrap = styled.div`
  max-width: 900px;
  max-height: 700px;
  width: 100%;
  height: 100%;
  @media screen and (min-width: 300px) and (max-width: 768px) {
    display: ${({ id }) => !id && "none"};
  }
`;

export default Chat;
