import React, { useEffect, useRef, useState, createContext } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { chatAction } from 'redux/modules/chat';
import { ChatUser, ChatContent, ChatInput, Loading } from 'components';
import { waitForConnection } from 'utils/WaitForConnection';
import * as L from 'styles/LayoutStlye';

export const ChatContext = createContext();

const ChatRoom = () => {
  const dispatch = useDispatch();

  const { roomId } = useParams();

  const userId = useSelector(state => state.chat.userId);
  const myInfo = useSelector(state => state.user.myinfo);

  const [isLoading, setIsLoading] = useState(false);

  let stompClient = useRef(null);
  const inputRef = useRef();

  const socketConnect = () => {
    const webSocket = new SockJS(`${process.env.REACT_APP_API_URL}/ws-stomp`);
    stompClient.current = Stomp.over(webSocket);
    try {
      stompClient.current.debug = null;

      stompClient.current.connect(
        {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          type: 'TALK',
        },
        () => {
          stompClient.current.subscribe(
            `/sub/api/chat/room/${roomId}`,
            data => {
              const messageFromServer = JSON.parse(data.body);
              dispatch(chatAction.addMessage(messageFromServer));
            },
            { Authorization: `Bearer ${localStorage.getItem('token')}` }
          );
          setIsLoading(false);
        }
      );
    } catch (err) {}
  };

  const socketDisconnect = () => {
    try {
      stompClient.current.debug = null;
      stompClient.current.disconnect(
        () => {
          stompClient.current.unsubscribe('sub-0');
        },
        { Authorization: `Bearer ${localStorage.getItem('token')}` }
      );
    } catch (err) {}
  };

  const sendMessage = event => {
    event.preventDefault();

    const message = event.target.chat.value;

    if (message === '' || message.trim() === '') return false;

    const data = {
      accType: 'TALK',
      reqType: 'TALK',
      roomId: roomId,
      senderId: myInfo?.id,
      nickname: myInfo?.nickname,
      acceptorId: userId,
      message: message,
      isRead: false,
    };

    waitForConnection(stompClient.current, () => {
      stompClient.current.debug = null;
      stompClient.current.send(
        '/pub/api/chat/message',
        {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        JSON.stringify(data)
      );
    });
    event.target.chat.value = null;
  };

  useEffect(() => {
    setIsLoading(true);

    if (stompClient.current) {
      socketDisconnect();
    }
    socketConnect();

    return () => {
      if (stompClient.current) socketDisconnect();
    };
  }, [roomId]);

  return (
    <L.Layout height='700px'>
      {isLoading ? (
        <Loading />
      ) : (
        <ChatContext.Provider value={{ roomId, userId, myInfo, sendMessage, inputRef }}>
          <ChatUser />
          <ChatContent />
          <ChatInput />
        </ChatContext.Provider>
      )}
    </L.Layout>
  );
};

export default ChatRoom;
