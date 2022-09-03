import React from "react";
import styled from "styled-components";
import { Text, Button } from "../../elements";
import defaultProfile from "../../assets/defaultProfile.png";

const Mypage = () => {
  return (
    <MypageWrap>
      <img src={defaultProfile} alt="defaultProfile" />
      <Text S1> ninckname</Text>
      <div className="userInfo">
        dfjadkfjdfkadjsfkdjfkadsjflkadjfk;jdsfkadsjadsfdadsfadsfasfdsafffadsfsadfffffffffffffffffffffffffsfadsfdsafdasfdasfdsfㅇㅁㄹㅇㄴㄻㄴㅇㄹㅇㅁㄴㄻㄴㅇㄹㅇㅁㄴㄹㄴㅁㄹㅇㅇㄹㅇㄹㅇㄹㅇㄹ
      </div>
      <Button L width="350px">
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
  max-width: 500px;
  width: 100%;
  & > img {
    width: 200px;
    border-radius: 50%;
  }
  .userInfo {
    display: inline-block;
    justify-content: center;
    align-items: center;
    word-wrap: break-word;
    margin-bottom: 50px;
    line-height: 1.8;
    font-size: 17px;
    width: 350px;
  }
`;

export default Mypage;
