import React, { useState } from "react";
import styled from "styled-components";
import { Text, Button } from "../../elements";
import defaultProfile from "../../assets/defaultProfile.png";

const EditMypage = ({ editOpen }) => {
  return <EditMypageWrap></EditMypageWrap>;
};

const EditMypageWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  max-width: 500px;
  width: 100%;
`;

export default EditMypage;
