import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { chatAction } from 'redux/modules/chat';
import useOutSideRef from 'hooks/useOutSideRef';
import { ChatContext } from 'pages/ChatRoom';
import { IoChevronBackOutline, IoReorderFourSharp } from 'react-icons/io5';
import * as L from 'styles/LayoutStlye';

const ChatUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { roomId, userId } = useContext(ChatContext);

  const { ref, isShowOptions, ShowOption } = useOutSideRef();

  const BanUser = () => {
    dispatch(chatAction.banUserDB(userId));
  };

  const ExitRoom = () => {
    dispatch(chatAction.exitRoomDB(roomId)).then(() => navigate(-1));
  };

  const CloseRoom = () => {
    navigate(-1);
  };

  return (
    <ChatUserWrap ref={ref}>
      <Exitmodal onClick={CloseRoom} />
      <Openmenu onClick={ShowOption} />
      <L.SelectOptions top='55px' right='10px' show={isShowOptions}>
        <L.Option>
          <label onClick={BanUser}>사용자 차단하기</label>
        </L.Option>
        <L.Option>
          <label onClick={ExitRoom}>채팅방 나가기</label>
        </L.Option>
        <L.Option>
          <label onClick={CloseRoom}>채팅방 닫기</label>
        </L.Option>
      </L.SelectOptions>
    </ChatUserWrap>
  );
};

const ChatUserWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Exitmodal = styled(IoChevronBackOutline)`
  font-size: 25px;
  cursor: pointer;
`;

const Openmenu = styled(IoReorderFourSharp)`
  font-size: 25px;
  cursor: pointer;
`;

export default ChatUser;
