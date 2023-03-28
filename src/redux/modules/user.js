import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import instance from '../request';

const MYINFO = 'myinfo';
const MYID = 'myid';
const USERINFO = 'userinfo';
const EDITMYINFO = 'editinfo';
const CLEANSTATUS = 'cleanstatus';

const initialState = {
  list: [],
};

const myInfo = createAction(MYINFO, myinfo => ({ myinfo }));
const myId = createAction(MYID, myid => ({ myid }));
const userInfo = createAction(USERINFO, userinfo => ({ userinfo }));
const editInfo = createAction(EDITMYINFO, myinfo => ({ myinfo }));
export const cleanStatus = createAction(CLEANSTATUS, () => ({}));

const signUpDB = (username, nickname, password, passwordCheck, navigate) => {
  return async function () {
    const introduction = '';
    const userImgUrl = '';
    try {
      const response = await instance.post('/api/users/register', {
        username: username,
        nickname: nickname,
        password: password,
        passwordCheck: passwordCheck,
        userImgUrl: userImgUrl,
        introduction: introduction,
      });
      if (response.status === 200) {
        navigate('/signin');
      }
    } catch (err) {}
  };
};

const logInDB = (username, password, navigate, setLoginError) => {
  return async function () {
    try {
      const response = await instance.post('/api/users/login', {
        username: username,
        password: password,
      });

      if (response.status === 200) {
        const token = response.data;
        localStorage.setItem('token', token);
        navigate('/chat');
      }
    } catch (err) {
      if (err) {
        return setLoginError('이메일 또는 비밀번호를 잘못 입력했습니다.');
      }
    }
  };
};

const idCheckDB = (username, setIdCheckError) => {
  return async function (dispatch) {
    try {
      const response = await instance.post('/api/users/register/idCheck', {
        username: username,
      });

      if (response.status === 200) {
        setIdCheckError(response.data.message);
      }
    } catch (err) {
      if (err) {
        setIdCheckError('이미 사용중인 ID 입니다.');
        return false;
      }
    }
  };
};

const nicknameCheckDB = (nickname, setNickCheckError) => {
  return async function (dispatch) {
    try {
      const response = await instance.post('/api/users/register/nickCheck', {
        nickname: nickname,
      });

      if (response.status === 200) {
        setNickCheckError(response.data.message);
      }
    } catch (err) {
      if (err) {
        setNickCheckError('이미 사용중인 닉네임 입니다.');
        return false;
      }
    }
  };
};

const logOutDB = () => {
  return async function (dispatch) {
    localStorage.removeItem('token');
    window.location.assign('/');
  };
};

const myInfoDB = () => {
  return async function (dispatch) {
    await instance
      .get(
        `/api/users/myPage
      `
      )
      .then(res => {
        const myid = res.data.id;
        const data = res.data;

        dispatch(myId(myid));
        dispatch(myInfo(data));
      })
      .catch(error => {});
  };
};

const userInfoDB = () => {
  return async function (dispatch) {
    await instance
      .get(
        `/api/users/usersRandom
      `
      )
      .then(res => {
        const data = res.data.userList;
        dispatch(userInfo(data));
      })
      .catch(error => {});
  };
};

const deleteImgDB = () => {
  return async function (dispatch) {
    await instance
      .put('/api/users/imgDeleted')
      .then(res => {
        dispatch(myInfoDB());
      })
      .catch(error => {});
  };
};

const editInfoDB = data => {
  return async function (dispatch) {
    await instance
      .put('/api/users/updated', data)
      .then(res => {
        dispatch(editInfo(data));
        window.location.assign('/mypage');
      })
      .catch(error => {});
  };
};

export default handleActions(
  {
    [CLEANSTATUS]: (state, action) =>
      produce(state, draft => {
        draft.status = '';
      }),

    [MYINFO]: (state, action) =>
      produce(state, draft => {
        draft.myinfo = action.payload.myinfo;
      }),

    [MYID]: (state, action) =>
      produce(state, draft => {
        draft.myId = action.payload.myid;
      }),

    [USERINFO]: (state, action) =>
      produce(state, draft => {
        draft.userinfo = action.payload.userinfo;
      }),

    [EDITMYINFO]: (state, action) =>
      produce(state, draft => {
        draft.myinfo = {
          ...draft.myinfo,
          ...action.payload.myinfo,
        };
      }),
  },
  initialState
);

const userActions = {
  signUpDB,
  logInDB,
  idCheckDB,
  nicknameCheckDB,
  logOutDB,
  myInfoDB,
  userInfoDB,
  editInfoDB,
  deleteImgDB,
};

export { userActions };
