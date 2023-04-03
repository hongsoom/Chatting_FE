import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { userAction } from 'redux/modules/chat';
import { Text } from 'elements';
import * as L from 'styles/LayoutStlye';

const OnChatList = () => {
  const dispatch = useDispatch();
  const navigator = useNavigate();

  const chatList = useSelector(state => state.chat.chatList);
  const myInfo = useSelector(state => state.user.myinfo);

  if (chatList?.length === 0) return <Text padding='30px 0'>진행 중인 채팅이 없습니다.</Text>;

  return (
    <L.ItemListLayout>
      {chatList?.map(list => {
        return (
          <L.ItemLayout
            key={list.roomId}
            onClick={() => {
              list.requesterId === Number(myInfo?.id)
                ? dispatch(userAction.addRoomDB(list.requesterId, list.acceptorId))
                : dispatch(userAction.addRoomDB(list.acceptorId, list.requesterId));

              navigator(`/chat/${list.roomId}`);
            }}
          >
            <ChatUser>
              <Text B1>
                {list.requesterId === Number(myInfo?.id) ? list.yourNickname : list.myNickname}
              </Text>
              <Text B2>{list.message}</Text>
            </ChatUser>
          </L.ItemLayout>
        );
      })}
    </L.ItemListLayout>
  );
};

const ChatUser = styled.div`
  display: flex;
  flex-direction: column;
`;

const ChatCount = styled.div`
  display: flex;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #ffb6c1;
`;

export default OnChatList;
