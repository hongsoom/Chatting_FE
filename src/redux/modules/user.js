import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import instance from '../request';

const MYINFO = 'myinfo';
const USERINFO = 'userinfo';
const EDITMYINFO = 'editinfo';
const CLEANSTATUS = 'cleanstatus';

const initialState = {
  list: [],
};

const myInfo = createAction(MYINFO, myinfo => ({ myinfo }));
const userInfo = createAction(USERINFO, userinfo => ({ userinfo }));
const editInfo = createAction(EDITMYINFO, myinfo => ({ myinfo }));
export const cleanStatus = createAction(CLEANSTATUS, () => ({}));

const signUpDB = userObj => {
  return async () => {
    const introduction = '';
    const userImgUrl = '';
    try {
      await instance.post('/api/users/register', {
        username: userObj.username,
        nickname: userObj.nickname,
        password: userObj.password,
        passwordCheck: userObj.passwordCheck,
        userImgUrl: userImgUrl,
        introduction: introduction,
      });
      return true;
    } catch (err) {
      return false;
    }
  };
};

const logInDB = (username, password) => {
  return async () => {
    try {
      const response = await instance.post('/api/users/login', {
        username: username,
        password: password,
      });

      if (response.status === 200) {
        const token = response.data;
        localStorage.setItem('token', token);
        return true;
      }
    } catch (err) {
      return false;
    }
  };
};

const idCheckDB = username => {
  return async () => {
    try {
      const response = await instance.post('/api/users/register/idCheck', {
        username: username,
      });
      if (response?.data?.status === 'Success') return true;
    } catch (err) {
      return false;
    }
  };
};

const nicknameCheckDB = nickname => {
  return async function () {
    try {
      const response = await instance.post('/api/users/register/nickCheck', {
        nickname: nickname,
      });

      if (response?.data?.status === 'Success') return true;
    } catch (err) {
      return false;
    }
  };
};

const logOutDB = () => {
  return async () => {
    localStorage.removeItem('token');
    window.location.assign('/signin');
  };
};

const myInfoDB = () => {
  return async dispatch => {
    await instance
      .get(`/api/users/myPage`)
      .then(res => {
        const data = res.data;
        dispatch(myInfo(data));
      })
      .catch(error => {
        return false;
      });
  };
};

const userInfoDB = () => {
  return async dispatch => {
    await instance
      .get(`/api/users/usersRandom`)
      .then(res => {
        const data = res.data.userList;
        dispatch(userInfo(data));
      })
      .catch(error => {
        return false;
      });
  };
};

const deleteImgDB = () => {
  return async dispatch => {
    await instance
      .put('/api/users/imgDeleted')
      .then(res => {
        return true;
      })
      .catch(error => {
        return false;
      });
  };
};

const editInfoDB = data => {
  return async dispatch => {
    await instance
      .put('/api/users/updated', data)
      .then(res => {
        dispatch(editInfo(data));
        window.location.assign('/mypage');
      })
      .catch(error => {
        return false;
      });
  };
};

export default handleActions(
  {
    [MYINFO]: (state, action) =>
      produce(state, draft => {
        draft.myinfo = action.payload.myinfo;
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
