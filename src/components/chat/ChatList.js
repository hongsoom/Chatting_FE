import React, { useState } from "react";
import styled from "styled-components";
import { Text } from "../../elements";
import ChatModal from "./ChatModal";
import user from "../../assets/user.png";
import reset from "../../assets/reset.png";

const ChatList = ({ userInfo }) => {
  const [modal, setModal] = useState(false);

  const ModalOpen = () => {
    setModal(!modal);
  };

  return (
    <>
      {modal ? <ChatModal ModalOpen={ModalOpen} /> : null}
      <ChatListContainer>
        <ResetWrap>
          <p>새로고침</p>
          <img src={reset} alt="reset" />
        </ResetWrap>
        {userInfo.map((list, i) => {
          return (
            <ChatListWrap onClick={ModalOpen} key={i}>
              {list.userImgUrl === "" ? (
                <img src={user} alt="userprofile" />
              ) : (
                <img src={list.userImgUrl} alt="userprofile" />
              )}
              <TextWrap>
                <Text C style={{ fontWeight: "600" }}>
                  {list.nickname}
                </Text>
                <Text C style={{ marginTop: "0px" }}>
                  {list.introduction}
                </Text>
              </TextWrap>
            </ChatListWrap>
          );
        })}
      </ChatListContainer>
    </>
  );
};

const ChatListContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 500px;
  max-height: 800px;
  height: 100%;
  width: 100%;
`;

const ResetWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  & > img {
    width: 20px;
    margin: -3px 50px 5px 5px;
    cursor: pointer;
  }
  & > p {
    font-size: 10px;
    margin: 0;
    cursor: pointer;
  }
`;

const ChatListWrap = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 400px;
  max-height: 100px;
  height: 100%;
  width: 100%;
  background-color: #fff;
  margin: 20px auto;
  cursor: pointer;
  border-radius: 10px;
  & > img {
    width: 70px;
    border-radius: 50%;
    margin: 15px;
  }
`;

const TextWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export default ChatList;
