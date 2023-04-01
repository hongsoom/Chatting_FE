import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { userAction } from 'redux/modules/chat';
import { Text } from 'elements';
import { defaultProfile } from 'assets';

const RandomChatList = () => {
  const dispatch = useDispatch();

  const userInfo = useSelector(state => state.user.userinfo);
  const myInfo = useSelector(state => state.user.myinfo);

  return (
    <>
      {userInfo?.map((list, i) => {
        return (
          <RandomChatListWrap
            onClick={() => {
              if (list.nickname === myInfo.nickname) {
                return;
              }
              dispatch(userAction.addRoomDB(myInfo.id, list.id));
            }}
            key={i}
          >
            <img src={list?.userImgUrl ? list?.userImgUrl : defaultProfile} alt='userprofile' />
            <TextWrap>
              <Text B1>{list.nickname}</Text>
              <Text B2>{list.introduction}</Text>
            </TextWrap>
          </RandomChatListWrap>
        );
      })}
    </>
  );
};

const RandomChatListWrap = styled.div`
  display: flex;
  max-width: 400px;
  width: 100%;
  margin: 13px auto;
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
  }

  & > img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin: 20px 20px 10px 0px;
  }
`;

const TextWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export default RandomChatList;
