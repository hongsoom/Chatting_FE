import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { getDay } from 'utils/date';
import { userAction } from 'redux/modules/chat';
import { Loading } from 'components';
import { Text, Image } from 'elements';
import * as L from 'styles/LayoutStlye';

const MyRoomList = ({ myInfo }) => {
  const dispatch = useDispatch();
  const navigator = useNavigate();

  const roomList = useSelector(state => state.chat.roomList);

  if (roomList?.length === 0) return <Text padding='30px 0'>진행 중인 채팅이 없습니다.</Text>;

  return (
    <L.ItemListLayout>
      {!roomList && <Loading />}
      {roomList?.map(list => {
        return (
          <L.ItemLayout
            key={list.roomId}
            onClick={() => {
              list.requesterId === Number(myInfo?.id)
                ? dispatch(userAction.addRoomDB(list.requesterId, list.acceptorId))
                : dispatch(userAction.addRoomDB(list.acceptorId, list.requesterId));
              navigator(`/chat/${list.roomId}`);
            }}
            justifyContent='space-between'
          >
            <ChatInfo>
              <Image
                src={
                  list.requesterId === Number(myInfo?.id)
                    ? list.acceptorUserImgUrl
                    : list.requesterUserImgUrl
                }
                alt='이미지'
              />
              <ChatUser>
                <Text B1>
                  {list.requesterId === Number(myInfo?.id) ? list.yourNickname : list.myNickname}
                </Text>
                <Text B2>{list.message}</Text>
              </ChatUser>
            </ChatInfo>
            <Text B2>{getDay(list.date)}</Text>
          </L.ItemLayout>
        );
      })}
    </L.ItemListLayout>
  );
};

const ChatInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ChatUser = styled.div`
  display: flex;
  flex-direction: column;
`;

export default MyRoomList;
