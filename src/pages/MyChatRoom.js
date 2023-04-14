import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GrClose } from 'react-icons/gr';
import styled from 'styled-components';
import { userActions } from 'redux/modules/user';
import { Category, Title, Link, MyChatList, BanChatList } from 'components';
import { userAction } from 'redux/modules/chat';
import * as L from 'styles/LayoutStlye';

const MyChatRoom = () => {
  const dispatch = useDispatch();

  const [banModal, setBanModal] = useState('');

  const myInfo = useSelector(state => state.user.myinfo);

  const ModalOpen = () => {
    setBanModal(!banModal);
  };

  const getChatList = () => {
    dispatch(userAction.roomListDB());
  };

  useEffect(() => {
    getChatList();
  }, [dispatch]);

  useEffect(() => {
    if (!myInfo) {
      dispatch(userActions.myInfoDB());
    }
  }, []);

  return (
    <>
      <L.Layout>
        {banModal ? (
          <>
            <TitleWrap>
              <Title title='차단 목록' />
              <CloseModal onClick={ModalOpen} />
            </TitleWrap>
            <BanChatList />
          </>
        ) : (
          <>
            <Title title='메세지' />
            <MyChatList myInfo={myInfo} />
            <Link onClick={ModalOpen} />
          </>
        )}
      </L.Layout>
      <Category />
    </>
  );
};

const TitleWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CloseModal = styled(GrClose)`
  font-size: 20px;
  cursor: pointer;
`;

export default MyChatRoom;
