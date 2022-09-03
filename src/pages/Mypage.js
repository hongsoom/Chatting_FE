import React from "react";
import Mypage from "../components/mypage/Mypage";
import styled from "styled-components";

const MyPage = () => {
  return (
    <MypageWrap>
      <Mypage />
    </MypageWrap>
  );
};

const MypageWrap = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 10px 10px 10px 10px #dcdcdc;
  max-width: 650px;
  height: 500px;
  width: 100%;
  margin: 20px auto;
`;

export default MyPage;
