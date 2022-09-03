import React, { useState } from "react";
import styled from "styled-components";
import { Text, Button } from "../../elements";
import defaultProfile from "../../assets/defaultProfile.png";
import EditMypage from "./EditMypage";

const Mypage = ({ myInfo }) => {
  const [editClick, setEditClick] = useState(false);

  const editOpen = () => {
    setEditClick(!editClick);
  };

  return (
    <MypageWrap>
      {editClick ? (
        <EditMypage myInfo={myInfo} editOpen={editOpen} />
      ) : (
        <>
          {myInfo && myInfo.userImgUrl === null ? (
            <img src={defaultProfile} alt="defaultProfile" />
          ) : (
            <img src={myInfo && myInfo.userImgUrl} alt="userprofile" />
          )}
          <Text S1>{myInfo && myInfo.nickname}</Text>
          <UserInfo>
            {myInfo && myInfo.introduction === null ? (
              <p> </p>
            ) : (
              <p>{myInfo && myInfo.introduction}</p>
            )}
          </UserInfo>
          <Button L width="350px" onClick={editOpen}>
            프로필 편집
          </Button>
        </>
      )}
    </MypageWrap>
  );
};

const MypageWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  max-width: 500px;
  width: 100%;
  & > img {
    width: 200px;
    border-radius: 50%;
  }
`;

const UserInfo = styled.div`
  display: inline-block;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
  width: 350px;
  & > p {
    line-height: 1.8;
    font-size: 17px;
    word-wrap: break-word;
  }
`;

export default Mypage;
