import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { userAction } from 'redux/modules/chat';
import { ChatUser, ChatContent, ChatInput, Loading } from 'components';
import * as L from 'styles/LayoutStlye';

const ChatRoom = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const userId = useSelector(state => state.chat.userId);
  const roomId = useSelector(state => state.chat.roomId);
  const myInfo = useSelector(state => state.user.myInfo);
  console.log(roomId);

  const [isLoading, setIsLoading] = useState(false);

  let stompClient = useRef(null);
  const inputRef = useRef();

  const socketConnect = () => {
    const webSocket = new SockJS(`${process.env.REACT_APP_API_URL}/ws-stomp`);
    stompClient.current = Stomp.over(webSocket);
    try {
      //stompClient.current.debug = null;

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
              dispatch(userAction.addMessage(messageFromServer));
              dispatch(
                userAction.updateRoomMessage({
                  ...messageFromServer,
                  index: location.state.index ?? 0,
                })
              );
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
      //stompClient.current.debug = null;
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
      //stompClient.current.debug = null;
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
    <L.Layout>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <ChatUser roomId={roomId} userId={userId} />
          <ChatContent roomId={roomId} myInfo={myInfo} />
          <ChatInput sendMessage={sendMessage} inputRef={inputRef} />
        </>
      )}
    </L.Layout>
  );
};

export default ChatRoom;
