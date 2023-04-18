import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { userActions } from 'redux/modules/user';
import useOutSideRef from 'hooks/useOutSideRef';
import { loadProfilImg } from 'utils/ImageCompression';
import { Text, Button } from 'elements';
import { Input } from 'elements/Input';
import * as S from 'styles/MypageStyle';
import * as L from 'styles/LayoutStlye';
import { defaultProfile, camera } from 'assets';

const EditMypage = ({ ModalOpen, myInfo }) => {
  const dispatch = useDispatch();

  const { ref, isShowOptions, ShowOption } = useOutSideRef();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  });

  const [previewUrl, setPreviewUrl] = useState(null);

  const formData = new FormData();

  const onEditSave = async data => {
    if (data.image) {
      formData.append('userImgUrl', await loadProfilImg(data.image));
    }
    if (data.nickname) {
      formData.append('nickname', data.nickname);
    }

    if (data.introduction) {
      formData.append('introduction', data.introduction);
    }

    //dispatch(userActions.editInfoDB(formData));
  };

  const onDeleteImg = () => {
    dispatch(userActions.deleteImgDB());
    ShowOption();
  };

  return (
    <L.FormLayout onSubmit={handleSubmit(onEditSave)}>
      <S.ImgWrap>
        {previewUrl ? (
          <img src={previewUrl} alt='미리보기 이미지' />
        ) : (
          <img src={myInfo?.userImgUrl ? myInfo?.userImgUrl : defaultProfile} alt='프로필 이미지' />
        )}
        <S.UserProfileEdit ref={ref}>
          <img src={camera} alt='camera' onClick={ShowOption} />

          <L.SelectOptions top='55px' left='10px' show={isShowOptions}>
            <L.Option onClick={onDeleteImg}>
              <label>기본 이미지로 변경</label>
            </L.Option>
            <L.Option>
              <label htmlFor='image'>사진 변경</label>
              <Input
                id='image'
                type='file'
                accept='image/*'
                {...register('image', {
                  validate: image => {
                    if (image.length !== 0) setPreviewUrl(URL.createObjectURL(image[0]));
                  },
                })}
                onClick={ShowOption}
                style={{ display: 'none' }}
              />
            </L.Option>
          </L.SelectOptions>
        </S.UserProfileEdit>
      </S.ImgWrap>

      <Text S color='#AFB0B3'>
        닉네임
      </Text>
      <Input
        type='text'
        placeholder='닉네임 (2 ~ 8자, 한글, 영문, 숫자만)'
        autocapitalize='off'
        autoComplete='off'
        defaultValue={myInfo?.nickname}
        {...register('nickname', {
          required: '닉네임을 입력해주세요.',
          pattern: {
            value: /^[가-힣ㄱ-ㅎa-zA-Z0-9._ -]{2,15}$/,
            message: '닉네임은 2 ~ 8자로 한글, 영문, 숫자만 사용할 수 있습니다.',
          },
          minLength: {
            value: 2,
            message: '2자 이상 입력해주세요.',
          },
          maxLength: {
            value: 8,
            message: '8자까지만 입력할 수 있습니다.',
          },
          validate: async nickname => {
            if (nickname === myInfo?.nickname) return;
            const result = await dispatch(userActions.nicknameCheckDB(nickname));
            if (!result) return '이미 가입된 닉네임입니다.';
            else return;
          },
        })}
      />
      <L.ErrorLayout>{errors?.nickname?.message}</L.ErrorLayout>

      <Text S color='#AFB0B3'>
        자기소개
      </Text>
      <Input
        type='text'
        placeholder='소개 ( 150 자 )'
        autocapitalize='off'
        autoComplete='off'
        defaultValue={myInfo?.introduction}
        {...register('introduction', {
          maxLength: {
            value: 150,
            message: '150자까지만 입력할 수 있습니다.',
          },
        })}
        margin='0 0 30px 0'
      />

      <S.ButtonWrap>
        <Button type='button' onClick={ModalOpen} width='215px' height='50px' margin='0 20px 0 0'>
          취소
        </Button>
        <Button type='submit' width='215px' height='50px'>
          수정
        </Button>
      </S.ButtonWrap>
    </L.FormLayout>
  );
};

export default EditMypage;
