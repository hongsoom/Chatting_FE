import React from "react";
import styled from "styled-components";
import { Text, Button } from "../../elements";
import userbasic from "../../assets/userbasic.jpg";

const Mypage = () => {
  return (
    <MypageWrap>
      <img src={userbasic} alt="userbasic" />
      <Text S3> ninckname</Text>
      <div>자기소개</div>
      <Button L margin="10px" color="#fff" borderColor="#000">
        프로필 편집
      </Button>
    </MypageWrap>
  );
};

const MypageWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  & > img {
    width: 300px;
  }
`;

export default Mypage;
