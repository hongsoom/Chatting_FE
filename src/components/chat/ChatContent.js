import React, { useEffect, useRef, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import styled from 'styled-components';
import { chatAction } from 'redux/modules/chat';
import { ChatContext } from 'pages/ChatRoom';
import { Text } from 'elements';

const ChatContent = () => {
  const dispatch = useDispatch();

  const { roomId, myInfo } = useContext(ChatContext);

  const scrollRef = useRef();

  let messageList = useSelector(state => state.chat.messageList);

  useEffect(() => {
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messageList]);

  useEffect(() => {
    dispatch(chatAction.messageListDB(roomId));
  }, [roomId]);

  return (
    <ChatContentWrap>
      <ChatContentContainer ref={scrollRef}>
        {messageList?.map((chat, index) => {
          const date = dayjs(chat.date).format('HH:mm');
          const mychat = chat.senderName === String(myInfo?.username);
          return (
            <>
              {chat.date.split('T')[0] !== messageList[index - 1]?.date?.split('T')[0] && (
                <ChatListDate key={chat.date}>{dayjs(chat.date).format('YYYY.MM.DD')}</ChatListDate>
              )}
              <ChatWrap mychat={mychat}>
                <Text S mychat={mychat}>
                  {!mychat && chat.senderNickname}
                </Text>
                <ChatContainer key={chat.senderId} mychat={mychat}>
                  <Chat mychat={mychat}>{chat.message}</Chat>
                  <Text B1 style={{ marginTop: '40px' }}>
                    {date !== dayjs(messageList[index - 1]?.date).format('HH:mm') && date}
                  </Text>
                </ChatContainer>
              </ChatWrap>
            </>
          );
        })}
      </ChatContentContainer>
    </ChatContentWrap>
  );
};

const ChatContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const ChatContentContainer = styled.div`
  height: 570px;
  width: 100%;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const ChatListDate = styled.div`
  width: 100%;
  text-align: center;
`;

const ChatWrap = styled.div`
  display: flex;
  flex-direction: ${props => (props.mychat ? 'row' : 'column')};
  justify-content: ${props => (props.mychat ? 'flex-end' : '0')};
  margin-left: ${props => (props.mychat ? '0' : '10px')};
`;

const ChatContainer = styled.div`
  display: flex;
  flex-direction: ${props => (props.mychat ? 'row-reverse' : 'row')};
`;

const Chat = styled.div`
  width: fit-content;
  margin: 10px;
  background-color: ${props => (props.mychat ? '#ffc0cb' : '#eeeeee')};
  border-radius: ${props => (props.mychat ? '15px 0px 15px 15px' : '0px 15px 15px 15px')};
  padding: 20px 30px;
`;

export default ChatContent;
