import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Text } from "../../elements";
import user from "../../assets/user.png";
import { TbBrandHipchat, TbUser, TbLogout } from "react-icons/tb";

const User = () => {
  const navigate = useNavigate();
  const myInfo = useSelector((state) => state.user.myinfo);
  console.log(myInfo);

  return (
    <UserWrap>
      <UserProfile>
        <img src={user} alt="userprofile" />
        <Text S2>hongsoom</Text>
      </UserProfile>
      <UsersUse>
        <TbBrandHipchat className="chat" onClick={() => navigate("/board")} />
        <TbUser className="user" onClick={() => navigate("/mypage")} />
        <TbLogout className="logout" />
      </UsersUse>
    </UserWrap>
  );
};

const UserWrap = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 150px;
  max-height: 900px;
  height: 100%;
  width: 100%;
`;

const UserProfile = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  width: 100%;
  & > img {
    width: 60px;
    border-radius: 50%;
    margin-right: 20px;
  }
  & > p {
    color: #000;
    font-wei
  }
`;

const UsersUse = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 450px;
  .chat {
    font-size: 50px;
    color: #000;
    margin-top: 30px;
    cursor: pointer;
  }
  .user {
    font-size: 50px;
    color: #000;
    margin-top: 30px;
    cursor: pointer;
  }
  .logout {
    font-size: 50px;
    color: #000;
    margin-top: 30px;
    cursor: pointer;
  }
`;

export default User;
