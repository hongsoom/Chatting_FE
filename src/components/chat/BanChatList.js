import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userAction } from "../../redux/modules/chat";
import styled from "styled-components";
import { Text, Button } from "../../elements";
import defaultProfile from "../../assets/defaultProfile.jpg";

const BanChatList = ({ state, setState }) => {
  const dispatch = useDispatch();

  const banList = useSelector((state) => state.chat.banList);

  const getBanChatList = () => {
    dispatch(userAction.banUserListDB());
    setState(false);
  };

  useEffect(() => {
    getBanChatList();
  }, [state]);

  return (
    <BanChatListWrap>
      {banList && banList.length === 0 ? (
        <Text
          B2
          style={{
            height: "80px",
            padding: "30px",
            borderBottom: "1px solid rgb(175, 176, 179)",
          }}
        >
          차단한 사용자가 없습니다.
        </Text>
      ) : (
        <>
          {banList &&
            banList.map((list, i) => {
              return (
                <BanChatListContainer key={i}>
                  {list.profile === "" ? (
                    <img src={defaultProfile} alt="defaultProfile" />
                  ) : (
                    <img src={list.profile} alt="userprofile" />
                  )}
                  <BanUser>
                    <Text B1 style={{ margin: "10px" }}>
                      {list.nickname}
                    </Text>
                    <Button
                      S
                      width="100px"
                      onClick={() => {
                        dispatch(userAction.cancelBanUserDB(list.bannedId));
                        setState(true);
                      }}
                      style={{
                        position: "absolute",
                        right: "0",
                        cursor: "pointer",
                      }}
                    >
                      차단해제
                    </Button>
                  </BanUser>
                </BanChatListContainer>
              );
            })}
        </>
      )}
    </BanChatListWrap>
  );
};

const BanChatListWrap = styled.div`
  max-height: 800px;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const BanChatListContainer = styled.div`
  max-height: 100px;
  height: 100%;
  padding: 0 18px;
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid rgb(175, 176, 179);
  & > img {
    width: 70px;
    border-radius: 50%;
    margin: 15px;
    @media screen and (max-width: 768px) {
      width: 60px;
    }
  }
  @media screen and (max-width: 768px) {
    max-height: 90px;
  }
`;

const BanUser = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  width: 100%;
`;

export default BanChatList;
