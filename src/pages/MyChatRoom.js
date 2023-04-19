import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { GrClose } from 'react-icons/gr';
import styled from 'styled-components';
import { Category, Title, Link, MyChatList, BanChatList } from 'components';
import { useModal } from 'hooks/useModal';
import { chatAction } from 'redux/modules/chat';
import * as L from 'styles/LayoutStlye';

const MyChatRoom = () => {
  const dispatch = useDispatch();

  const [banModal, ModalOpen] = useModal();

  useEffect(() => {
    dispatch(chatAction.roomListDB());
  }, [dispatch]);

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

export default MyChatRoom;
