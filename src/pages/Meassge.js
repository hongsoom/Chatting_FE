import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { GrClose } from 'react-icons/gr';
import styled from 'styled-components';
import { Category, Title, Link, MyChatList, BanChatList } from 'components';
import { userAction } from 'redux/modules/chat';
import * as L from 'styles/LayoutStlye';

const Meassage = () => {
  const dispatch = useDispatch();

  const [banModal, setBanModal] = useState('');

  const ModalOpen = () => {
    setBanModal(!banModal);
  };

  const getChatList = () => {
    dispatch(userAction.chatListDB());
  };

  useEffect(() => {
    getChatList();
  }, [dispatch]);

  return (
    <>
      <L.Layout height='570px'>
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
            <MyChatList />
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

export default Meassage;
