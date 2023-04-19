import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import * as S from 'styles/AuthStyle';
import * as L from 'styles/LayoutStlye';
import { userAction } from 'redux/modules/user';
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

  const onValid = signinObj => {
    dispatch(userAction.logInDB(signinObj.username, signinObj.password)).then(result => {
      if (!result) {
        setLoginError('이메일 또는 비밀번호를 잘못 입력했습니다.');
        return false;
      }
      navigate('/chat');
    });
  };

  return (
    <L.FormLayout onSubmit={handleSubmit(onValid)}>
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
          <L.ErrorLayout>{errors?.username?.message}</L.ErrorLayout>
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
          <L.ErrorLayout>{errors?.password?.message || loginError}</L.ErrorLayout>
        </S.InputWrap>
      </S.AuthBox>
      <S.AuthBox>
        <Button width='100%' disabled={errors.username || errors.password}>
          로그인
        </Button>
        <S.PathBox>
          <Text B fontSize='13px'>
            계정이 없으신가요? &nbsp;
            <Text L onClick={() => navigate('/signup')}>
              회원가입
            </Text>
          </Text>
        </S.PathBox>
      </S.AuthBox>
    </L.FormLayout>
  );
};

export default SignIn;
