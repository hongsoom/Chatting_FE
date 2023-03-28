import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Text, Button } from 'elements';
import * as S from 'styles/MypageStyle';
import { defaultProfile } from 'assets';

const Mypage = () => {
  const navigate = useNavigate();

  const myInfo = useSelector(state => state.user.myinfo);

  return (
    <S.MypageWrap>
      <S.ImgWrap>
        <img src={myInfo?.userImgUrl ? myInfo?.userImgUrl : defaultProfile} alt='userprofile' />
      </S.ImgWrap>

      <Text H margin='20px'>
        {myInfo?.nickname}
      </Text>

      <Text B1 margin='0 0 20px 0'>
        {myInfo?.introduction}
      </Text>

      <Button onClick={() => navigate(`/mypage/:${myInfo.id}`)}>프로필 편집</Button>
    </S.MypageWrap>
  );
};

export default Mypage;
