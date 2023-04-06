import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { userAction } from 'redux/modules/chat';
import useOutSideRef from 'hooks/useOutSideRef';
import { IoChevronBackOutline, IoReorderFourSharp } from 'react-icons/io5';
import * as L from 'styles/LayoutStlye';

const ChatUser = ({ roomId, userId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { outsideRef, ShowOption } = useOutSideRef(null);

  const [isShowOptions, setShowOptions] = useState(false);

  const BanUser = () => {
    dispatch(userAction.banUserDB(userId));
  };

  const ExitRoom = () => {
    dispatch(userAction.exitRoomDB(roomId)).then(() => navigate(-1));
  };

  const CloseRoom = () => {
    navigate(-1);
  };

  return (
    <ChatUserWrap ref={outsideRef}>
      <Exitmodal onClick={CloseRoom} />
      <Openmenu onClick={() => setShowOptions(prev => !prev)} />
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
