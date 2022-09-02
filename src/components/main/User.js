import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../redux/modules/user";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Text } from "../../elements";
import user from "../../assets/user.png";
import userbasic from "../../assets/userbasic.jpg";
import { TbBrandHipchat, TbUser, TbLogin, TbLogout } from "react-icons/tb";

const User = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const is_login = localStorage.getItem("token") ? true : false;

  const myInfo = useSelector((state) => state.user.myinfo);
  return (
    <UserWrap>
      {is_login ? (
        <>
          <UserProfile>
            {/* <img src={myInfo.userImgUrl} alt="userprofile" /> */}
            <Text S2>{myInfo && myInfo.nickname}</Text>
          </UserProfile>
          <UsersUse>
            <TbBrandHipchat
              className="chat"
              onClick={() => navigate("/board")}
            />
            <TbUser className="user" onClick={() => navigate("/mypage")} />
            <TbLogout
              className="logout"
              onClick={() => dispatch(userActions.logOutDB())}
            />
          </UsersUse>
        </>
      ) : (
        <>
          <UserProfile>
            <img src={userbasic} alt="userbasicprofile" />
            <Text B1 style={{ marginTop: "10px" }}>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 로그인
              &nbsp;&nbsp;&nbsp;&nbsp;부탁드립니다👇
            </Text>
          </UserProfile>
          <UsersUse>
            <TbLogin className="login" onClick={() => navigate("/login")} />
          </UsersUse>
        </>
      )}
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
