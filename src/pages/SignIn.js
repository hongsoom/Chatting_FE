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

  const { setUsername, setPassword, error, handleSubmit } = useAuth();

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
      <Text S3 style={{ margin: '0px' }}>
        로그인
      </Text>
      <S.AuthBox>
        <S.InputWrap>
          <Input
            M
            id='username'
            type='text'
            onChange={e => setUsername(e.target.value)}
            placeholder='아이디를 입력해주세요.'
            margin='0 0 8px 0'
            padding='10px'
            width='350px'
            height='50px'
            style={{ borderRadius: '4px', borderColor: '#DBDBDB' }}
          ></Input>
          <span>{error.username}</span>
        </S.InputWrap>
        <S.InputWrap>
          <Input
            M
            id='password'
            type='password'
            onChange={e => setPassword(e.target.value)}
            placeholder='비밀번호를 입력해주세요.'
            margin='0 0 8px 0'
            padding='10px'
            width='350px'
            height='50px'
            style={{ borderRadius: '4px', borderColor: '#DBDBDB' }}
            onKeyPress={e => LoginEnter(e)}
          ></Input>
          <span>{loginError ? loginError : error.password}</span>
        </S.InputWrap>
      </S.AuthBox>
      <S.AuthBox>
        <Button
          L
          color='#fff'
          borderColor='#fff'
          borderRadius='4px'
          width='350px'
          height='6vh'
          fontSize='14px'
        >
          로그인
        </Button>
        <S.PathBox>
          <p>
            계정이 없으신가요? &nbsp;
            <span onClick={() => navigate('/signup')}>회원가입</span>
          </p>
        </S.PathBox>
      </S.AuthBox>
    </S.AuthWrap>
  );
};

export default SignIn;
