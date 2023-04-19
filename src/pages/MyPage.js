import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { userAction } from 'redux/modules/user';
import { Title, EditMypage, Category } from 'components';
import { useModal } from 'hooks/useModal';
import { Text, Button } from 'elements';
import * as S from 'styles/MypageStyle';
import * as L from 'styles/LayoutStlye';
import { defaultProfile } from 'assets';

const Mypage = () => {
  const dispatch = useDispatch();

  const [editModal, ModalOpen] = useModal();

  const myInfo = useSelector(state => state.user.myinfo);

  const Logout = () => {
    dispatch(userAction.logOutDB());
  };

  useEffect(() => {
    if (!myInfo) {
      dispatch(userAction.myInfoDB());
    }
  }, []);

  return editModal ? (
    <EditMypage ModalOpen={ModalOpen} myInfo={myInfo} />
  ) : (
    <>
      <L.Layout display='flex' flexDirection='column' justifyContent='space-between'>
        <Title title='마이페이지' />
        <S.ImgWrap>
          <img src={myInfo?.userImgUrl ? myInfo?.userImgUrl : defaultProfile} alt='userprofile' />
          <Text H fontSize='20px' margin='20px 0 0 0' color='#808080'>
            {myInfo?.nickname}
          </Text>
        </S.ImgWrap>

        <MyInfoWrap>
          <Text S color='#AFB0B3'>
            아이디
          </Text>
          <Text B1 color='#808080'>
            {myInfo?.username}
          </Text>
        </MyInfoWrap>

        <MyInfoWrap>
          <Text S color='#AFB0B3'>
            자기소개
          </Text>
          <Text B1 color='#808080'>
            {myInfo?.introduction}
          </Text>
        </MyInfoWrap>

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

const MyInfoWrap = styled.div`
  margin-bottom: 20px;
`;

export default Mypage;
