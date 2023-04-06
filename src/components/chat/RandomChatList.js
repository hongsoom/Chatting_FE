import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { userAction } from 'redux/modules/chat';
import { Loading } from 'components';
import { Text } from 'elements';
import * as L from 'styles/LayoutStlye';
import { defaultProfile } from 'assets';

const RandomChatList = ({ myInfo }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userInfo = useSelector(state => state.user.userinfo);

  const addRoom = (requester, acceptor) => {
    dispatch(userAction.addRoomDB(requester, acceptor)).then(result => navigate(`/chat/${result}`));
  };

  if (userInfo?.length === 0) return <Loading />;

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
            <img src={list?.userImgUrl ? list?.userImgUrl : defaultProfile} alt='userprofile' />
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
  justify-content: center;
`;

export default RandomChatList;
