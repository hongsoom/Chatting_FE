import React from "react";
import styled from "styled-components";
import { Button, Input } from "../../elements";
import exit from "../../assets/exit.png";

const ChatModal = (props) => {
  const { ModalOpen } = props;
  return (
    <ChatListContainer>
      <ChatTop>
        <img src={exit} alt="exit" onClick={ModalOpen} />
      </ChatTop>
      <ChatMiddle>
        <div className="chatmiddle-box"></div>
      </ChatMiddle>
      <ChatBottom>
        <Input
          S
          className="chatbottom-input"
          placeholder="메시지를 입력해주세요."
        ></Input>
        <Button S className="chatbottom-button">
          보내기
        </Button>
      </ChatBottom>
    </ChatListContainer>
  );
};
const ChatListContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 10px 10px 10px 10px #dcdcdc;
  height: 750px;
  width: 500px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const ChatTop = styled.div`
  display: flex;
  justify-content: flex-end;
  & > img {
    width: 10px;
    height: 10px;
    margin: 20px;
    cursor: pointer;
  }
`;

const ChatMiddle = styled.div`
  .chatmiddle-box {
    width: 450px;
    height: 620px;
  }
`;

const ChatBottom = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  .chatbottom-input {
    width: 450px;
    height: 50px;
    border: 1px solid rgb(175, 176, 179);
    border-radius: 15px;
    color: rgb(175, 176, 179);
    padding: 10px;
  }
  .chatbottom-button {
    position: absolute;
    width: 80px;
    height: 40px;
    background-color: #ffb6c1;
    color: #fff;
    font-weight: 600;
    border-radius: 15px;
    right: 30px;
    bottom: 5px;
  }
`;

export default ChatModal;
