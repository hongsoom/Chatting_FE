import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userAction } from "../../redux/modules/chat";
import styled from "styled-components";

const ChatContent = ({ roomId }) => {
  const dispatch = useDispatch();

  const messageList = useSelector((state) => state.chat.messageList);
  console.log(messageList);

  const getMessageList = () => {
    dispatch(userAction.messageListDB(roomId));
  };

  useEffect(() => {
    getMessageList();
  }, []);
  return <ChatContentWrap></ChatContentWrap>;
};

const ChatContentWrap = styled.div`
  width: 100%;
  max-height: 650px;
  height: 100%;
`;
export default ChatContent;
