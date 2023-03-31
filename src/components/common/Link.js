import React from 'react';
import { useMatch } from 'react-router-dom';
import styled from 'styled-components';
import { Text } from 'elements';
import { GrPowerReset } from 'react-icons/gr';
import { HiOutlineBan } from 'react-icons/hi';

const Link = ({ onClick }) => {
  const match = useMatch('/chat');

  return (
    <ChatIconWrap onClick={onClick}>
      {match ? (
        <>
          <Text L>새로 고침</Text>
          <Reset />
        </>
      ) : (
        <>
          <Text L>차단 목록</Text>
          <Ban />
        </>
      )}
    </ChatIconWrap>
  );
};

const ChatIconWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  background-color: #fff;
  right: 20px;
  bottom: 20px;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  box-shadow: 5px 5px 5px 5px #dcdcdc;
  cursor: pointer;
`;

const Reset = styled(GrPowerReset)`
  font-size: 16px;
  margin-top: 5px;
`;

const Ban = styled(HiOutlineBan)`
  font-size: 16px;
  margin-top: 5px;
`;

export default Link;
