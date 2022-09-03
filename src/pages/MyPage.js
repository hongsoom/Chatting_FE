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
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 10px 10px 10px 10px #dcdcdc;
  max-width: 650px;
  height: 700px;
  width: 100%;
  top: 100px;
  left: 50%;
  transform: translate(-50%, 0%);
`;

export default MyPage;
