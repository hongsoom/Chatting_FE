import React, { useState } from "react";
import styled from "styled-components";
import { Text, Button } from "../../elements";
import defaultProfile from "../../assets/defaultProfile.jpg";
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
          {myInfo && myInfo.userImgUrl === "" ? (
            <img src={defaultProfile} alt="defaultProfile" />
          ) : (
            <img src={myInfo && myInfo.userImgUrl} alt="userprofile" />
          )}
          <Text S1 style={{ marginTop: "20px" }}>
            {myInfo && myInfo.nickname}
          </Text>
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
  max-width: 300px;
  width: 100%;
  & > img {
    width: 200px;
    border-radius: 50%;
  }
`;

const UserInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0 50px 0;
  width: 350px;
  & > p {
    line-height: 1.8;
    font-size: 17px;
    word-wrap: break-word;
  }
`;

export default Mypage;
