import { useCallback, useEffect, useState } from 'react';

function useAuth() {
  const [username, setUsername] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [error, setError] = useState({ username: '', nickname: '', password: '' });
  const USERNAME_REGEX = /^[a-zA-z0-9]{6,20}$/;
  const NICKNAME_REGEX = /^[가-힣ㄱ-ㅎa-zA-Z0-9._ -]{2,15}$/;

  const idValidate = useCallback(
    e => {
      if (username === '') {
        return setError(prev => {
          const result = { ...prev, username: '아이디를 입력해주세요' };
          return result;
        });
      }

      if (!USERNAME_REGEX.test(username)) {
        return setError(prev => {
          const result = {
            ...prev,
            username: '아이디는 6 ~ 20자로 영문, 숫자만 사용할 수 있습니다.',
          };
          return result;
        });
      }

      if (username.length < 6 || username.length > 20)
        setError(prev => {
          const result = { ...prev, username: '아이디는 6자리 이상, 20자리 미만입니다.' };
          return result;
        });

      return setError(prev => {
        const result = { ...prev, username: '' };
        return result;
      });
    },
    [username]
  );

  const nicknameValidate = useCallback(
    e => {
      if (nickname === '') {
        return setError(prev => {
          const result = { ...prev, nickname: '닉네임을 입력해주세요' };
          return result;
        });
      }

      if (!NICKNAME_REGEX.test(nickname)) {
        return setError(prev => {
          const result = {
            ...prev,
            nickname: '닉네임은 2 ~ 8자로 한글, 영문, 숫자만 사용할 수 있습니다.',
          };
          return result;
        });
      }

      if (nickname.length < 2 || nickname.length > 8)
        setError(prev => {
          const result = { ...prev, nickname: '닉네임은 2자리 이상, 8자리 미만입니다.' };
          return result;
        });

      setError(prev => {
        const result = { ...prev, nickname: '' };
        return result;
      });
    },
    [nickname]
  );

  const passwordValidate = useCallback(
    e => {
      if (password === '')
        return setError(prev => {
          const result = { ...prev, password: '비밀번호를 입력해주세요' };
          return result;
        });

      if (password.length < 6 || password.length > 16)
        return setError(prev => {
          const result = { ...prev, password: '비밀번호는 6자리 이상, 16자리 미만입니다.' };
          return result;
        });

      if (password !== passwordCheck)
        setError(prev => {
          const result = { ...prev, password: '비밀번호와 비밀번호확인 값이 다릅니다.' };
          return result;
        });

      return setError(prev => {
        const result = { ...prev, password: '' };
        return result;
      });
    },
    [password]
  );

  const handleSubmit = useCallback(
    async (e, fn) => {
      e.preventDefault();
      if (nickname || passwordCheck) fn({ username, nickname, password, passwordCheck });
      fn({ username, password });
    },
    [username, nickname, password, passwordCheck]
  );

  const handleCheck = useCallback(
    async (e, fn) => {
      e.preventDefault();
      if (username) fn(username);
      if (password) fn(password);
    },
    [username, password]
  );

  useEffect(() => {
    idValidate();
  }, [username]);

  useEffect(() => {
    nicknameValidate();
  }, [nickname]);

  useEffect(() => {
    passwordValidate();
  }, [password]);

  useEffect(() => {
    setError(prev => {
      const result = { ...prev, username: null, nickname: null, password: null };
      return result;
    });
  }, []);

  return {
    setUsername,
    setNickname,
    setPassword,
    setPasswordCheck,
    error,
    handleSubmit,
    handleCheck,
  };
}

export default useAuth;
