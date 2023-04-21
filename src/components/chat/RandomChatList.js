import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { chatAction } from 'redux/modules/chat';
import { userAction } from 'redux/modules/user';
import { Loading } from 'components';
import { Text, Image } from 'elements';
import * as L from 'styles/LayoutStlye';
import { defaultProfile } from 'assets';

const RandomChatList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userInfo = useSelector(state => state.user.userinfo);
  const myInfo = useSelector(state => state.user.myinfo);

  const addRoom = (requester, acceptor) => {
    dispatch(chatAction.addRoomDB(requester, acceptor)).then(result => navigate(`/chat/${result}`));
  };

  useEffect(() => {
    if (!myInfo) {
      dispatch(userAction.myInfoDB());
    }
  }, []);

  if (userInfo?.length === 0) return <Loading />;
  console.log(myInfo);
  return (
    <L.ItemListLayout>
      {userInfo?.map(list => {
        return (
          <L.ItemLayout
            onClick={() => {
              addRoom(myInfo.id, list.id);
            }}
            key={list.id}
          >
            <Image src={list?.userImgUrl ? list?.userImgUrl : defaultProfile} alt='유저이미지' />
            <TextWrap>
              <Text B1>{list.nickname}</Text>
              <Text B2>{list.introduction}</Text>
            </TextWrap>
          </L.ItemLayout>
        );
      })}
    </L.ItemListLayout>
  );
};

const TextWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

export default RandomChatList;
