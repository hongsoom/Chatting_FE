import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import * as S from 'styles/AuthStyle';
import { userActions } from 'redux/modules/user';
import { Button, Text } from 'elements';
import { Input } from 'elements/Input';

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  });

  const onValid = signUpObj => {
    dispatch(userActions.signUpDB(signUpObj));
    navigate('/signin');
  };

  return (
    <S.AuthWrap onSubmit={handleSubmit(onValid)}>
      <Text H margin='50px 0'>
        회원가입
      </Text>
      <S.AuthBox>
        <S.InputWrap position='relative'>
          <Text S color='#AFB0B3'>
            아이디
          </Text>
          <Input
            type='text'
            placeholder='아이디 입력 (6~20자)'
            autocapitalize='off'
            autoComplete='off'
            {...register('username', {
              required: '아이디를 입력해주세요.',
              pattern: {
                value: /^[a-zA-z0-9]{6,20}$/,
                message: '아이디는 6 ~ 20자로 영문, 숫자만 사용할 수 있습니다.',
              },
              minLength: {
                value: 6,
                message: '6자 이상 입력해주세요.',
              },
              maxLength: {
                value: 20,
                message: '20자까지만 입력할 수 있습니다.',
              },
              validate: async username => {
                const result = await dispatch(userActions.idCheckDB(username));
                if (!result) return '이미 가입된 아이디입니다.';
                else return;
              },
            })}
          />
          <S.ErrorWrap message={errors?.username?.message}>{errors?.username?.message}</S.ErrorWrap>
        </S.InputWrap>
        <S.InputWrap position='relative'>
          <Text S color='#AFB0B3'>
            닉네임
          </Text>
          <Input
            type='text'
            placeholder='닉네임 입력 (2~8자)'
            autocapitalize='off'
            autoComplete='off'
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
              validate: async username => {
                const result = await dispatch(userActions.idCheckDB(username));
                if (!result) return '이미 가입된 닉네임입니다.';
                else return;
              },
            })}
          />
          <S.ErrorWrap message={errors?.nickname?.message}>{errors?.nickname?.message}</S.ErrorWrap>
        </S.InputWrap>
        <S.InputWrap>
          <Text S color='#AFB0B3'>
            비밀번호
          </Text>
          <Input
            type='password'
            placeholder='비밀번호 입력 (8~16자)'
            {...register('password', {
              required: '비밀번호를 입력해주세요.',
              minLength: {
                value: 8,
                message: '8자 이상 입력해주세요.',
              },
              maxLength: {
                value: 16,
                message: '16자까지만 입력할 수 있습니다.',
              },
            })}
          />
        </S.InputWrap>
        <S.InputWrap>
          <Text S color='#AFB0B3'>
            비밀번호확인
          </Text>
          <Input
            type='password'
            placeholder='비밀번호 재입력'
            {...register('passwordCheck', {
              required: '비밀번호를 다시 입력해주세요.',
              validate: value =>
                value === getValues('password') || '동일한 비밀번호를 입력해주세요.',
            })}
          />
          <S.ErrorWrap>{errors?.passwordCheck?.message}</S.ErrorWrap>
        </S.InputWrap>
      </S.AuthBox>
      <S.AuthBox>
        <Button>회원가입</Button>
        <S.PathBox>
          <Text B3>
            계정이 있으신가요? &nbsp;
            <Text L onClick={() => navigate('/signin')}>
              로그인
            </Text>
          </Text>
        </S.PathBox>
      </S.AuthBox>
    </S.AuthWrap>
  );
};

export default SignUp;
