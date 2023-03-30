import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import * as S from 'styles/AuthStyle';
import { userActions } from 'redux/modules/user';
import { Button, Text } from 'elements';
import { Input } from 'elements/Input';

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginError, setLoginError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onValid = loginObj => {
    dispatch(userActions.logInDB(loginObj.username, loginObj.password)).then(result => {
      if (!result) {
        setLoginError('이메일 또는 비밀번호를 잘못 입력했습니다.');
        return false;
      }
      navigate('/chat');
    });
  };

  return (
    <S.AuthWrap onSubmit={handleSubmit(onValid)}>
      <Text H margin='50px 0'>
        로그인
      </Text>
      <S.AuthBox>
        <S.InputWrap>
          <Text S color='#AFB0B3'>
            아이디
          </Text>
          <Input
            placeholder='아이디를 입력해주세요.'
            autocapitalize='off'
            autoComplete='off'
            {...register('username', {
              required: '아이디는 필수 입력입니다.',
            })}
          ></Input>
          <S.ErrorWrap>{errors?.username?.message}</S.ErrorWrap>
        </S.InputWrap>
        <S.InputWrap>
          <Text S color='#AFB0B3'>
            비밀번호
          </Text>
          <Input
            type='password'
            placeholder='비밀번호를 입력해주세요.'
            autocapitalize='off'
            autoComplete='off'
            {...register('password', {
              required: '비밀번호는 필수 입력입니다.',
            })}
          ></Input>
          <S.ErrorWrap>{errors?.password?.message || loginError}</S.ErrorWrap>
        </S.InputWrap>
      </S.AuthBox>
      <S.AuthBox>
        <Button>로그인</Button>
        <S.PathBox>
          <Text B3>
            계정이 없으신가요? &nbsp;
            <Text L onClick={() => navigate('/signup')}>
              회원가입
            </Text>
          </Text>
        </S.PathBox>
      </S.AuthBox>
    </S.AuthWrap>
  );
};

export default SignIn;
