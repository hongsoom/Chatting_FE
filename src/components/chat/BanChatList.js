import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { userAction } from 'redux/modules/chat';
import { Text, Button } from 'elements';
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

  return (
    <BanChatListWrap>
      {banList?.length === 0 ? (
        <Text height='80px' padding='30px 0'>
          차단한 사용자가 없습니다.
        </Text>
      ) : (
        <>
          {banList?.map((list, i) => {
            return (
              <BanChatListContainer key={i}>
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
              </BanChatListContainer>
            );
          })}
        </>
      )}
    </BanChatListWrap>
  );
};

const BanChatListWrap = styled.div`
  max-height: 700px;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const BanChatListContainer = styled.div`
  max-height: 100px;
  height: 100%;
  padding: 0 18px;
  display: flex;
  flex-direction: row;

  & > img {
    width: 70px;
    border-radius: 50%;
    margin: 15px;
    @media screen and (max-width: 768px) {
      width: 60px;
    }
  }
  @media screen and (max-width: 768px) {
    max-height: 90px;
  }
`;

const BanUser = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  width: 100%;
`;

export default BanChatList;
