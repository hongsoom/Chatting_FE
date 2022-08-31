import React from "react";
import styled from "styled-components";
import user from "../../assets/user.png";
import { TbLogout } from "react-icons/tb";

const User = () => {
  return (
    <UserWrap>
      <UserProfile>
        <img src={user} alt="userprofile" />
        <p>유저 닉네임</p>
      </UserProfile>
      <UsersUse>
        <TbLogout size="40" color="#fff" />
      </UsersUse>
    </UserWrap>
  );
};

const UserWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #000;
`;

const UserProfile = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  & > img {
    width: 100px;
    border-radius: 50%;
  }
  & > p {
    color: #fff;
  }
`;

const UsersUse = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default User;
