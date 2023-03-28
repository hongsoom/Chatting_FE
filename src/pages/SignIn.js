import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as S from 'styles/AuthStyle';
import { useAuth } from 'hooks';
import { userActions } from 'redux/modules/user';
import { Button, Input, Text } from 'elements';

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginError, setLoginError] = useState(null);

  const { setUsername, setPassword, isCorrect, error, handleSubmit } = useAuth();

  const login = ({ username, password }) => {
    dispatch(userActions.logInDB(username, password, navigate, setLoginError));
  };

  const LoginEnter = e => {
    if (e.key === 'Enter') {
      login();
    }
  };

  return (
    <S.AuthWrap onSubmit={e => handleSubmit(e, login)}>
      <Text H margin='50px 0'>
        로그인
      </Text>
      <S.AuthBox>
        <S.InputWrap>
          <Text S color='#AFB0B3'>
            아이디
          </Text>
          <Input
            id='username'
            type='text'
            onChange={e => setUsername(e.target.value)}
            placeholder='아이디를 입력해주세요.'
            autocapitalize='off'
            autoComplete='off'
          ></Input>
          <S.ErrorWrap>{error.username}</S.ErrorWrap>
        </S.InputWrap>
        <S.InputWrap>
          <Text S color='#AFB0B3'>
            비밀번호
          </Text>
          <Input
            id='password'
            type='password'
            onChange={e => setPassword(e.target.value)}
            placeholder='비밀번호를 입력해주세요.'
            onKeyPress={e => LoginEnter(e)}
            autocapitalize='off'
            autoComplete='off'
          ></Input>
          <S.ErrorWrap>{loginError ? loginError : error.password}</S.ErrorWrap>
        </S.InputWrap>
      </S.AuthBox>
      <S.AuthBox>
        <Button disabled={isCorrect}>로그인</Button>
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
