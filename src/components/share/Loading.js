import React from "react";
import styled from "styled-components";
import loding from "../../assets/loding.gif";

const Loading = () => {
  return (
    <LoadingWrap>
      <img src={loding} alt="loding" />
    </LoadingWrap>
  );
};

const LoadingWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 1000px;
  max-height: 800px;
  height: 100%;
  width: 100%;
  & > img {
    width: 150px;
    height: 150px;
  }
`;

export default Loading;
