import React from "react";
import styled from "styled-components";
import { Button, Input } from "../../elements";

const ChatInput = ({ SendMessage, message, setMessage }) => {
  const handleMessage = (e) => {
    setMessage(e.target.value);
  };

  return (
    <ChatInputWrap>
      <Input
        S
        width="950px"
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
      ></Input>
      <Button
        S
        width="80px"
        height="50px"
        padding="10px"
        style={{ borderRadius: "15px", borderColor: "#ffb6c1" }}
        className="chatButton"
        onClick={SendMessage}
        disabled={!message}
      >
        보내기
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
    background-color: #ffb6c1;
    color: #fff;
    font-weight: 600;
    right: 30px;
    bottom: 5px;
    @media screen and (max-width: 768px) {
      right: 15px;
      bottom: 15px;
    }
  }
  .chatInput {
    @media screen and (max-width: 768px) {
      margin: 10px;
    }
  }
`;

export default ChatInput;
