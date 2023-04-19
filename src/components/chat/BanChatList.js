import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { chatAction } from 'redux/modules/chat';
import { Text, Button, Image } from 'elements';
import * as L from 'styles/LayoutStlye';
import { defaultProfile } from 'assets';

const BanChatList = () => {
  const dispatch = useDispatch();

  const banList = useSelector(state => state.chat.banList);

  useEffect(() => {
    dispatch(chatAction.banUserListDB());
  }, [dispatch]);

  if (banList?.length === 0) return <Text padding='30px 0'>차단한 사용자가 없습니다.</Text>;

  return (
    <L.ItemListLayout>
      {banList?.map(list => {
        return (
          <L.ItemLayout key={list.id}>
            <Image
              src={list.profile ? list.profile : defaultProfile}
              alt='userprofile'
              width='75px'
            />
            <BanUser>
              <Text B1 margin='10px'>
                {list.nickname}
              </Text>
              <Button
                onClick={() => {
                  dispatch(chatAction.cancelBanUserDB(list.id));
                }}
                padding='10px'
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
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export default BanChatList;
