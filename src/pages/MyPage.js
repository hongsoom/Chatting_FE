import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userActions } from 'redux/modules/user';
import { Title, EditMypage, Category } from 'components';
import { Text, Button } from 'elements';
import * as S from 'styles/MypageStyle';
import * as L from 'styles/LayoutStlye';
import { defaultProfile } from 'assets';

const Mypage = () => {
  const dispatch = useDispatch();

  const [editModal, setEditModal] = useState(false);

  const myInfo = useSelector(state => state.user.myinfo);

  const ModalOpen = () => {
    setEditModal(!editModal);
  };

  const Logout = () => {
    dispatch(userActions.logOutDB());
  };

  return editModal ? (
    <EditMypage ModalOpen={ModalOpen} myInfo={myInfo} />
  ) : (
    <>
      <L.Layout>
        <Title title='마이페이지' />
        <S.ImgWrap>
          <img src={myInfo?.userImgUrl ? myInfo?.userImgUrl : defaultProfile} alt='userprofile' />
          <Text H margin='20px 0 0 0' color='#808080'>
            {myInfo?.nickname}
          </Text>
        </S.ImgWrap>

        <S.MyInfoWrap>
          <Text S color='#AFB0B3'>
            아이디
          </Text>
          <Text B color='#808080'>
            {myInfo?.username}
          </Text>
        </S.MyInfoWrap>

        <S.MyInfoWrap>
          <Text S color='#AFB0B3'>
            자기소개
          </Text>
          <Text B color='#808080'>
            {myInfo?.introduction}
          </Text>
        </S.MyInfoWrap>

        <S.ButtonWrap>
          <Button width='215px' height='50px' margin='0 20px 0 0' onClick={Logout}>
            로그아웃
          </Button>
          <Button width='215px' height='50px' onClick={ModalOpen}>
            프로필 편집
          </Button>
        </S.ButtonWrap>
      </L.Layout>

      <Category />
    </>
  );
};

export default Mypage;
