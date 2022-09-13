import React from "react";
import styled from "styled-components";
import { Text } from "../../elements";
import Menu from "../share/Menu";
import userbasic from "../../assets/userbasic.jpg";

const User = ({ myInfo }) => {
  return (
    <UserWrap>
      <UserTitle>
        <Text S2>Messenger</Text>
      </UserTitle>
      <UserProfile>
        {myInfo && myInfo.userImgUrl === "" ? (
          <img src={userbasic} alt="userbasicprofile" />
        ) : (
          <img src={myInfo && myInfo.userImgUrl} alt="userprofile" />
        )}
        <Text S2>hongsoom</Text>
        {/* <Text S2>{myInfo && myInfo.nickname}</Text> */}
        <Menu />
      </UserProfile>
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
  }
`;

export default User;
