import React from 'react';
import styled from 'styled-components';
import { Button } from 'elements';
import { Input } from 'elements/Input';

const ChatInput = ({ SendMessage, message, setMessage }) => {
  const handleMessage = e => {
    setMessage(e.target.value);
  };

  return (
    <ChatInputWrap onSubmit={SendMessage}>
      <Input
        width='870px'
        padding='10px'
        placeholder='메시지를 입력해주세요.'
        autocapitalize='off'
        autoComplete='off'
        maxLength={150}
        onChange={handleMessage}
        value={message}
      ></Input>
      <Button width='90px' padding='10px' margin='0 0 0 10px' disabled={!message}>
        전송
      </Button>
    </ChatInputWrap>
  );
};

const ChatInputWrap = styled.form`
  display: flex;
  justify-content: center;
`;

export default ChatInput;
