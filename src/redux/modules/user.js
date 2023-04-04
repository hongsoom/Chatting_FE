import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import { apis } from 'redux/api';

const MYINFO = 'myinfo';
const USERINFO = 'userinfo';
const EDITMYINFO = 'editinfo';

const initialState = {
  list: [],
};

const myInfo = createAction(MYINFO, myinfo => ({ myinfo }));
const userInfo = createAction(USERINFO, userinfo => ({ userinfo }));
const editInfo = createAction(EDITMYINFO, myinfo => ({ myinfo }));

const signUpDB = userObj => {
  const introduction = '';
  const userImgUrl = '';
  return async () => {
    try {
      await apis.signup({
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
  return async dispatch => {
    try {
      const response = await apis.signIn(username, password);

      const token = response.data;
      localStorage.setItem('token', token);

      if (response.status === 200) {
        dispatch(myInfoDB());
        return true;
      }
    } catch (err) {
      return false;
    }
  };
};

const usernameCheckDB = username => {
  return async () => {
    try {
      const response = await apis.usernameCheck(username);
      if (response?.data?.status === 'Success') return true;
    } catch (err) {
      return false;
    }
  };
};

const nicknameCheckDB = nickname => {
  return async () => {
    try {
      const response = await apis.nicknameCheck(nickname);
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
    const response = await apis.loadMyPage();
    dispatch(myInfo(response.data));
  };
};

const userInfoDB = () => {
  return async dispatch => {
    const response = await apis.loadUserInfo();
    dispatch(userInfo(response.data.userList));
  };
};

const deleteImgDB = () => {
  return async () => {
    await apis.deleteuserImg();
  };
};

const editInfoDB = data => {
  return async dispatch => {
    try {
      const response = await apis.changeUserInfo(data);
      console.log(data);
      dispatch(editInfo(data));
      window.location.assign('/mypage');
    } catch (err) {
      return false;
    }
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
  usernameCheckDB,
  nicknameCheckDB,
  logOutDB,
  myInfoDB,
  userInfoDB,
  editInfoDB,
  deleteImgDB,
};

export { userActions };
