import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { userAction } from 'redux/modules/chat';
import { Text, Button } from 'elements';
import * as L from 'styles/LayoutStlye';
import { defaultProfile } from 'assets';

const BanChatList = () => {
  const dispatch = useDispatch();

  const banList = useSelector(state => state.chat.banList);

  const getBanChatList = () => {
    dispatch(userAction.banUserListDB());
  };

  useEffect(() => {
    getBanChatList();
  }, [dispatch]);

  if (banList?.length === 0) return <Text padding='30px 0'>차단한 사용자가 없습니다.</Text>;

  return (
    <L.ItemListLayout>
      {banList?.map(list => {
        return (
          <L.ItemLayout key={list.id}>
            <img src={list.profile ? list.profile : defaultProfile} alt='userprofile' />
            <BanUser>
              <Text margin='10px'>{list.nickname}</Text>
              <Button
                width='100px'
                onClick={() => {
                  dispatch(userAction.cancelBanUserDB(list.id));
                }}
                position='absolute'
                right='0'
                cursor='pointer'
              >
                차단해제
              </Button>
            </BanUser>
          </L.ItemLayout>
        );
      })}
    </L.ItemListLayout>
  );
};

const BanUser = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  width: 100%;
`;

export default BanChatList;
