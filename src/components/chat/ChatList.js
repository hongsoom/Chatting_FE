import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userAction } from "../../redux/modules/chat";
import styled from "styled-components";
import { Text } from "../../elements";

const ChatList = () => {
  const dispatch = useDispatch();

  const chatList = useSelector((state) => state.chat.chatList);
  console.log(chatList);

  const getChatList = () => {
    dispatch(userAction.chatListDB());
  };

  useEffect(() => {
    getChatList();
  }, []);

  return <ChatListWrap></ChatListWrap>;
};

const ChatListWrap = styled.div`
  max-height: 80px;
  height: 100%;
`;

export default ChatList;
