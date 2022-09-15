import React from "react";
import { useDispatch } from "react-redux";
import { userAction } from "../../redux/modules/chat";
import styled from "styled-components";
import { Button } from "../../elements";
import exit from "../../assets/exit.png";

const ChatUser = ({ socketDisconnect, RoomOpen, roomId }) => {
  const dispatch = useDispatch();

  const ExitRoom = () => {
    dispatch(userAction.exitRoomDB(roomId));
    socketDisconnect();
  };

  const ExitModal = () => {
    socketDisconnect();
    RoomOpen();
  };

  return (
    <ChatUserWrap>
      <Button
        S
        width="80px"
        height="36px"
        bg="#fff"
        color="#000"
        margin="10px 0 0 0"
        borderRadius="15px"
        borderColor="#000"
        onClick={ExitRoom}
      >
        나가기
      </Button>
      <img src={exit} alt="exit" onClick={ExitModal} />
    </ChatUserWrap>
  );
};

const ChatUserWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  & > img {
    width: 15px;
    height: 15px;
    margin: 20px;
    cursor: pointer;
  }
`;

export default ChatUser;
