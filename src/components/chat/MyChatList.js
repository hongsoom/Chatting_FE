import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { getDay } from 'utils/date';
import { chatAction } from 'redux/modules/chat';
import { userAction } from 'redux/modules/user';
import { Text, Image } from 'elements';
import * as L from 'styles/LayoutStlye';

const MyRoomList = () => {
  const dispatch = useDispatch();
  const navigator = useNavigate();

  const myInfo = useSelector(state => state.user.myinfo);
  const roomList = useSelector(state => state.chat.roomList);

  useEffect(() => {
    if (!myInfo) {
      dispatch(userAction.myInfoDB());
    }
  }, []);

  if (roomList?.length === 0) return <Text padding='30px 0'>진행 중인 채팅이 없습니다.</Text>;

  return (
    <L.ItemListLayout>
      {roomList?.map(list => {
        return (
          <L.ItemLayout
            key={list.roomId}
            onClick={() => {
              list.requesterId === Number(myInfo?.id)
                ? dispatch(chatAction.addRoomDB(list.requesterId, list.acceptorId))
                : dispatch(chatAction.addRoomDB(list.acceptorId, list.requesterId));
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
            <ChatUser alignItems='flex-end'>
              <Text B2>{getDay(list.date)}</Text>
              {list.unreadCnt !== 0 && <L.NewNoti>{list.unreadCnt}</L.NewNoti>}
            </ChatUser>
          </L.ItemLayout>
        );
      })}
    </L.ItemListLayout>
  );
};

const ChatInfo = styled.div`
  display: flex;
  align-items: center;
`;

const ChatUser = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${({ alignItems }) => alignItems && `${alignItems};`};
`;

export default MyRoomList;
