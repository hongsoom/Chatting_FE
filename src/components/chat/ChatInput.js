import React, { useContext } from 'react';
import styled from 'styled-components';
import { ChatContext } from 'pages/ChatRoom';
import { Button } from 'elements';
import { Input } from 'elements/Input';

const ChatInput = () => {
  const { sendMessage, inputRef } = useContext(ChatContext);

  return (
    <ChatInputWrap onSubmit={sendMessage}>
      <Input
        width='870px'
        padding='10px'
        placeholder='메시지를 입력해주세요.'
        autocapitalize='off'
        autoComplete='off'
        maxLength={150}
        ref={inputRef}
        name='chat'
      ></Input>
      <Button width='90px' padding='10px' margin='0 0 0 10px'>
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
