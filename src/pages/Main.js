import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../redux/modules/user";
import styled from "styled-components";
import User from "../components/main/User";

const Main = () => {
  const dispatch = useDispatch();

  const myInfo = useSelector((state) => state.user.myinfo);

  useEffect(() => {
    dispatch(userActions.myInfoDB());
  }, []);

  return (
    <MainWrap>
      <User myInfo={myInfo} />
    </MainWrap>
  );
};

const MainWrap = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 10px 10px 10px 10px #dcdcdc;
  max-width: 750px;
  height: 900px;
  width: 100%;
  margin: 0 auto;
`;

export default Main;
