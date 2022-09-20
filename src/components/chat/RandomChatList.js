import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userActions } from "../../redux/modules/user";
import { userAction } from "../../redux/modules/chat";
import styled from "styled-components";
import swal from "sweetalert";
import { Text } from "../../elements";
import defaultProfile from "../../assets/defaultProfile.jpg";
import reset from "../../assets/reset.png";
import chat from "../../assets/chat.png";

const RandomChatList = ({
  myInfo,
  userInfo,
  reqOut,
  accOut,
  ModalOpen,
  roomId,
}) => {
  const dispatch = useDispatch();
  const navigator = useNavigate();

  const resetClick = () => {
    dispatch(userActions.userInfoDB());
  };

  console.log(userInfo);

  return (
    <RandomChatListContainer>
      <Text
        S1
        style={{
          height: "80px",
          padding: "30px",
          borderBottom: "1px solid rgb(175, 176, 179)",
        }}
      >
        채팅
      </Text>
      <ResetWrap onClick={resetClick}>
        <Text C>새로고침</Text>
        <img src={reset} alt="reset" />
      </ResetWrap>
      {userInfo &&
        userInfo.map((list, i) => {
          return (
            <RandomChatListWrap
              onClick={() => {
                if (list.nickname === myInfo.nickname) {
                  swal({
                    title: "본인에게 채팅을 할 수 없습니다!",
                    icon: "error",
                    closeOnClickOutside: false,
                  });
                  return;
                }
                dispatch(
                  userAction.addRoomDB(myInfo.id, list.id, reqOut, accOut)
                );
                ModalOpen();
              }}
              key={i}
            >
              {list.userImgUrl === "" || list.userImgUrl === null ? (
                <img src={defaultProfile} alt="defaultProfile" />
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
            </RandomChatListWrap>
          );
        })}
      <ChatIconWrap onClick={ModalOpen}>
        <img src={chat} alt="chat" />
        <Text BM style={{ marginLeft: "10px" }}>
          채팅목록
        </Text>
      </ChatIconWrap>
    </RandomChatListContainer>
  );
};

const RandomChatListContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  max-width: 500px;
  max-height: 800px;
  height: 100%;
  width: 100%;
  border-right: 1px solid rgb(175, 176, 179);
`;

const ResetWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 10px;
  cursor: pointer;
  & > img {
    width: 20px;
    margin: -3px 20px 5px 5px;
  }
`;

const RandomChatListWrap = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 400px;
  max-height: 100px;
  height: 100%;
  width: 100%;
  background-color: #f5f5f5;
  margin: 17px auto;
  cursor: pointer;
  border-radius: 10px;
  & > img {
    width: 70px;
    border-radius: 50%;
    margin: 15px;
    @media screen and (max-width: 768px) {
      width: 60px;
    }
  }
  @media screen and (max-width: 768px) {
    max-width: 350px;
    max-height: 90px;
  }
`;

const TextWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ChatIconWrap = styled.div`
  position: absolute;
  background-color: #fff;
  right: 20px;
  bottom: 20px;
  width: 75px;
  height: 75px;
  border-radius: 50%;
  box-shadow: 5px 5px 5px 5px #dcdcdc;
  cursor: pointer;
  & > img {
    width: 45px;
    margin-left: 15px;
    height: 45px;
  }
  @media screen and (max-width: 768px) {
    position: fixed;
  }
`;

export default RandomChatList;
