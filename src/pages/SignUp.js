import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAuth } from 'hooks';
import * as S from 'styles/AuthStyle';
import { userActions } from 'redux/modules/user';
import { Button, Input, Text } from 'elements';

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    setUsername,
    setNickname,
    setPassword,
    setPasswordCheck,
    error,
    handleSubmit,
    handleCheck,
  } = useAuth();

  const [idCheckError, setIdCheckError] = useState('');
  const [nickCheckError, setNickCheckError] = useState('');

  const Signup = ({ username, nickname, password, passwordCheck }) => {
    dispatch(userActions.signUpDB(username, nickname, password, passwordCheck, navigate));
  };

  const SignupEnter = e => {
    if (e.key === 'Enter') {
      Signup();
    }
  };

  const idCondition = username => {
    dispatch(userActions.idCheckDB(username, setIdCheckError));
  };

  const nicknameCondition = nickname => {
    dispatch(userActions.nicknameCheckDB(nickname, setNickCheckError));
  };

  return (
    <S.AuthWrap onSubmit={e => handleSubmit(e, Signup)}>
      <Text S3 style={{ margin: '0px' }}>
        회원가입
      </Text>
      <S.AuthBox>
        <S.InputWrap>
          <Input
            M
            id='username'
            placeholder='아이디 입력 (6~20자)'
            onChange={e => setUsername(e.target.value)}
            margin='0 0 8px 0'
            padding='10px'
            width='350px'
            height='50px'
            style={{
              borderRadius: '4px',
              borderColor: '#DBDBDB',
              color: '#000000',
            }}
          />
          <S.CheckButton onClick={e => handleCheck(e, idCondition)}>중복확인</S.CheckButton>
          <span>{idCheckError ? idCheckError : error.username}</span>
        </S.InputWrap>
        <S.InputWrap>
          <Input
            M
            id='nickname'
            placeholder='닉네임 입력 (2~8자)'
            onChange={e => setNickname(e.target.value)}
            margin='0 0 8px 0'
            padding='10px'
            width='350px'
            height='50px'
            style={{
              borderRadius: '4px',
              borderColor: '#DBDBDB',
              color: '#000000',
            }}
          />
          <S.CheckButton onClick={e => handleCheck(e, nicknameCondition)}>중복확인</S.CheckButton>
          <span>{nickCheckError ? nickCheckError : error.nickname}</span>
        </S.InputWrap>
        <S.InputWrap>
          <Input
            M
            id='password'
            type='password'
            placeholder='비밀번호 입력 (8~16자)'
            onChange={e => setPassword(e.target.value)}
            margin='0 0 8px 0'
            padding='10px'
            width='350px'
            height='50px'
            style={{
              borderRadius: '4px',
              borderColor: '#DBDBDB',
              color: '#000000',
            }}
          />
        </S.InputWrap>
        <S.InputWrap>
          <Input
            M
            id='passwordCheck'
            type='password'
            placeholder='비밀번호 재입력'
            onChange={e => setPasswordCheck(e.target.value)}
            margin='0 0 8px 0'
            padding='10px'
            width='350px'
            height='50px'
            style={{
              borderRadius: '4px',
              borderColor: '#DBDBDB',
              color: '#000000',
            }}
            onKeyPress={e => SignupEnter(e)}
          />
          <span>{error.password}</span>
        </S.InputWrap>
      </S.AuthBox>
      <S.AuthBox>
        <Button
          L
          color='#fff'
          borderColor='#000'
          borderRadius='4px'
          width='350px'
          height='6vh'
          fontSize='14px'
        >
          회원가입
        </Button>
        <S.PathBox>
          <p>
            계정이 있으신가요? &nbsp;
            <span onClick={() => navigate('/signin')}>로그인</span>
          </p>
        </S.PathBox>
      </S.AuthBox>
    </S.AuthWrap>
  );
};

export default SignUp;
