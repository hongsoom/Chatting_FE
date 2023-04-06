import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { userAction } from 'redux/modules/chat';
import { ChatUser, ChatContent, ChatInput, Loading } from 'components';
import * as L from 'styles/LayoutStlye';

const ChatRoom = () => {
  const dispatch = useDispatch();

  const userId = useSelector(state => state.chat.userId);
  const roomId = useSelector(state => state.chat.roomId);
  const myInfo = useSelector(state => state.user.myInfo);

  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messageState, setMessageState] = useState(false);

  let stompClient = useRef(null);

  const stompConnect = () => {
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
              dispatch(userAction.messageListDB(roomId));
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

  const waitForConnection = (stompClient, callback) => {
    setTimeout(function () {
      if (stompClient.ws.readyState === 1) {
        callback();
      } else {
        waitForConnection(stompClient, callback);
      }
    }, 0.1);
  };

  const SendMessage = () => {
    if (!message) return;

    const data = {
      accType: 'TALK',
      reqType: 'TALK',
      roomId: roomId,
      senderId: myInfo && myInfo.id,
      nickname: myInfo && myInfo.nickname,
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
      setMessageState(true);
    });
    setMessage('');
  };

  useEffect(() => {
    setIsLoading(true);
    stompConnect();
    return () => {
      socketDisconnect();
    };
  }, [roomId]);

  return (
    <L.Layout>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <ChatUser roomId={roomId} userId={userId} />
          <ChatContent
            roomId={roomId}
            messageState={messageState}
            setMessageState={setMessageState}
            myInfo={myInfo}
          />
          <ChatInput SendMessage={SendMessage} message={message} setMessage={setMessage} />
        </>
      )}
    </L.Layout>
  );
};

export default ChatRoom;
