import React from "react";
import styled from "styled-components";
import { Button, Input } from "../../elements";
import { TbSend } from "react-icons/tb";

const ChatInput = ({ SendMessage, message, setMessage }) => {
  const handleMessage = (e) => {
    setMessage(e.target.value);
  };

  const SendMessageEnter = (e) => {
    if (e.key === "Enter") {
      SendMessage();
    }
  };

  return (
    <ChatInputWrap>
      <Input
        S
        width="870px"
        height="60px"
        padding="10px"
        borderColor="rgb(175, 176, 179)"
        style={{
          borderRadius: "15px",
        }}
        placeholder="메시지를 입력해주세요."
        className="chatInput"
        autocomplete="off"
        maxLength={150}
        onChange={handleMessage}
        value={message}
        onKeyUp={(e) => SendMessageEnter(e)}
      ></Input>
      <Button
        S
        width="80px"
        height="50px"
        padding="10px"
        className="chatButton"
        onClick={SendMessage}
        disabled={!message}
      >
        <TbSend size="40" color="#ffc0cb" />
      </Button>
    </ChatInputWrap>
  );
};

const ChatInputWrap = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  .chatButton {
    position: absolute;
    background-color: transparent;
    color: #fff;
    font-weight: 600;
    right: 10px;
    bottom: 10px;
    @media screen and (max-width: 768px) {
      right: 5px;
      bottom: 20px;
    }
  }
  .chatInput {
    @media screen and (max-width: 768px) {
      margin: 10px;
    }
  }
`;

export default ChatInput;
