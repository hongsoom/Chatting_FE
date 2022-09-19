import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userAction } from "../../redux/modules/chat";
import styled from "styled-components";
import { Text, Button } from "../../elements";
import defaultProfile from "../../assets/defaultProfile.jpg";

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
              {/*   {list.profile === "" ? (
                <img src={defaultProfile} alt="defaultProfile" />
              ) : (
                <img src={list.profile} alt="userprofile" />
              )}
              <Text B2 style={{ margin: "10px" }}>
                {list.nickname}
              </Text> */}
              <Button
                onClick={() =>
                  dispatch(userAction.cleanBanUserListDB(list.bannedId))
                }
              >
                차단해제
              </Button>
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
  & > img {
    width: 60px;
    border-radius: 50%;
    margin-right: 5px;
    @media screen and (max-width: 768px) {
      width: 50px;
    }
  }
`;

export default BanChatList;
