import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userAction } from "../../redux/modules/chat";
import styled from "styled-components";
import { Text } from "../../elements";

const BanChatList = ({}) => {
  const dispatch = useDispatch();

  const banList = useSelector((state) => state.chat.banList);
  console.log(banList);

  const getBanChatList = () => {
    dispatch(userAction.banUserListDB());
  };

  useEffect(() => {
    getBanChatList();
  }, []);

  return (
    <BanChatListWrap>
      {banList &&
        banList.map((list, index) => {
          return (
            <BanChatListContainer key={index}>
              <img src={list.profile} />
              <Text B2 style={{ margin: "10px" }}>
                {list.nickname}
              </Text>
            </BanChatListContainer>
          );
        })}
    </BanChatListWrap>
  );
};

const BanChatListWrap = styled.div`
  max-height: 720px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const BanChatListContainer = styled.div`
  max-height: 100px;
  height: 100%;
  padding: 0 18px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  border-bottom: 1px solid rgb(175, 176, 179);
  cursor: pointer;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export default BanChatList;
