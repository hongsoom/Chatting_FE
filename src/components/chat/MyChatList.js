import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userAction } from 'redux/modules/chat';
import styled from 'styled-components';
import { Text } from '../../elements';

const OnChatList = () => {
  const dispatch = useDispatch();
  const navigator = useNavigate();

  const chatList = useSelector(state => state.chat.chatList);
  const myInfo = useSelector(state => state.user.myinfo);

  return (
    <OnChatListWrap>
      {chatList?.length === 0 ? (
        <Text height='80px' padding='30px' border='1px solid rgb(175, 176, 179)'>
          진행 중인 채팅이 없습니다.
        </Text>
      ) : (
        <>
          {chatList?.map((list, i) => {
            return (
              <OnChatListContainer
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
              </OnChatListContainer>
            );
          })}
        </>
      )}
    </OnChatListWrap>
  );
};

const OnChatListWrap = styled.div`
  height: 100%;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const OnChatListContainer = styled.div`
  display: flex;
  max-width: 400px;
  width: 100%;
  margin: 13px auto;
  cursor: pointer;
`;

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
