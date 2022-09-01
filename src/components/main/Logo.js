import React from "react";
import styled from "styled-components";

const Logo = () => {
  return (
    <LogoWrap>
      <span> </span>
    </LogoWrap>
  );
};

const LogoWrap = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 700px;
  max-height: 900px;
  height: 100%;
  width: 100%;
  background-color: rgb(239, 241, 254);
`;

export default Logo;
