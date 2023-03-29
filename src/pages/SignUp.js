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
    isCorrect,
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
      <Text H margin='50px 0'>
        회원가입
      </Text>
      <S.AuthBox>
        <S.InputWrap position='relative'>
          <Text S color='#AFB0B3'>
            아이디
          </Text>
          <Input
            id='username'
            type='text'
            placeholder='아이디 입력 (6~20자)'
            onChange={e => setUsername(e.target.value)}
            autocapitalize='off'
            autoComplete='off'
          />
          <Button
            onClick={e => handleCheck(e, idCondition)}
            width='70px'
            fontSize='11px'
            style={{ position: 'absolute', right: '0', bottom: '20px' }}
          >
            중복확인
          </Button>
          <S.ErrorWrap idCheckError={idCheckError}>
            {idCheckError ? idCheckError : error.username}
          </S.ErrorWrap>
        </S.InputWrap>
        <S.InputWrap position='relative'>
          <Text S color='#AFB0B3'>
            닉네임
          </Text>
          <Input
            id='nickname'
            type='text'
            placeholder='닉네임 입력 (2~8자)'
            onChange={e => setNickname(e.target.value)}
            autocapitalize='off'
            autoComplete='off'
          />
          <Button
            S
            onClick={e => handleCheck(e, nicknameCondition)}
            width='70px'
            fontSize='11px'
            style={{ position: 'absolute', right: '0', bottom: '20px' }}
          >
            중복확인
          </Button>
          <S.ErrorWrap>{nickCheckError ? nickCheckError : error.nickname}</S.ErrorWrap>
        </S.InputWrap>
        <S.InputWrap>
          <Text S color='#AFB0B3'>
            비밀번호
          </Text>
          <Input
            id='password'
            type='password'
            placeholder='비밀번호 입력 (8~16자)'
            onChange={e => setPassword(e.target.value)}
          />
        </S.InputWrap>
        <S.InputWrap>
          <Text S color='#AFB0B3'>
            비밀번호확인
          </Text>
          <Input
            id='passwordCheck'
            type='password'
            placeholder='비밀번호 재입력'
            onChange={e => setPasswordCheck(e.target.value)}
            onKeyPress={e => SignupEnter(e)}
          />
          <S.ErrorWrap>{error.password}</S.ErrorWrap>
        </S.InputWrap>
      </S.AuthBox>
      <S.AuthBox>
        <Button disabled={isCorrect}>회원가입</Button>
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
