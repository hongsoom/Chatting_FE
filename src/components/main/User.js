import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userActions } from "../../redux/modules/user";
import styled from "styled-components";
import { Text } from "../../elements";
import { TbBrandHipchat, TbUser, TbLogout } from "react-icons/tb";
import defaultProfile from "../../assets/defaultProfile.jpg";

const User = ({ myInfo }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <>
      <UserWrap>
        <UserProfile>
          {myInfo && myInfo.userImgUrl === "" ? (
            <img src={defaultProfile} alt="defaultProfile" />
          ) : (
            <img src={myInfo && myInfo.userImgUrl} alt="userprofile" />
          )}
          <Text S2>{myInfo && myInfo.nickname}</Text>
        </UserProfile>
        <UsersUse>
          <TbBrandHipchat className="chat" />
          <TbUser className="user" onClick={() => navigate("/mypage")} />
          <TbLogout
            className="logout"
            onClick={() => dispatch(userActions.logOutDB())}
          />
        </UsersUse>
      </UserWrap>
    </>
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
  .login {
    font-size: 50px;
    color: #000;
    margin-top: 200px;
    cursor: pointer;
  }
`;

export default User;
