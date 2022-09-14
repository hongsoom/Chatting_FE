import React from "react";
import styled from "styled-components";
import { Text } from "../../elements";
import defaultProfile from "../../assets/defaultProfile.jpg";
import Menu from "../share/Menu";

const User = ({ myInfo }) => {
  return (
    <UserWrap>
      <UserTitle>
        <Text S2>Messenger</Text>
      </UserTitle>
      <UserProfile>
        {myInfo && myInfo.userImgUrl === "" ? (
          <img src={defaultProfile} alt="defaultProfile" />
        ) : (
          <img src={myInfo && myInfo.userImgUrl} alt="userprofile" />
        )}
        <Text S2>{myInfo && myInfo.nickname}</Text>
      </UserProfile>
      <MenuWrap>
        <Menu />
      </MenuWrap>
    </UserWrap>
  );
};

const UserWrap = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #c0c0c0;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  max-width: 1500px;
  max-height: 100px;
  height: 100%;
  width: 100%;
  @media screen and (max-width: 768px) {
    border-radius: 0px;
  }
`;

const UserTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: center;
  align-items: center;
  padding-left: 200px;
  max-width: 1300px;
  height: 100%;
  width: 100%;
  @media screen and (max-width: 768px) {
    padding-left: 0px;
  }
`;

const UserProfile = styled.div`
  display: flex;
  flex-direction: row;
  align-content: flex-end;
  justify-content: flex-end;
  align-items: center;
  max-width: 200px;
  height: 100%;
  width: 100%;
  & > img {
    width: 60px;
    border-radius: 50%;
    @media screen and (max-width: 768px) {
      width: 50px;
    }
  }
  & > p {
    @media screen and (max-width: 768px) {
      font-size: 14px;
    }
  }
  @media screen and (max-width: 768px) {
    max-width: 70px;
    flex-direction: column;
    justify-content: center;
  }
`;

const MenuWrap = styled.div`
  display: flex;
  align-items: center;
`;

export default User;
