import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import instance from "../request";

const SIGNUP = "signup";
const LOGIN = "login";
const LOGOUT = "logout";
const IDCHECK = "idcheck";
const NICKNAMECHECK = "nicknamecheck";
const MYINFO = "myinfo";
const USERINFO = "userinfo";
const EDITMYINFO = "editinfo";

const initialState = {
  list: [],
  isLogin: false,
  status: "",
};

const signUp = createAction(SIGNUP, (status) => ({ status }));
const login = createAction(LOGIN, (result) => ({ result }));
const logout = createAction(LOGOUT, (result) => ({ result }));
const idCheck = createAction(IDCHECK, (status) => ({ status }));
const nicknameCheck = createAction(NICKNAMECHECK, (status) => ({ status }));
const myInfo = createAction(MYINFO, (myinfo) => ({ myinfo }));
const userInfo = createAction(USERINFO, (userinfo) => ({ userinfo }));
const editinfo = createAction(EDITMYINFO, (editinfo) => ({ editinfo }));

const signUpDB = (username, nickname, password, passwordCheck) => {
  return async function (dispatch) {
    const introduction = "";
    const userImgUrl = "";
    try {
      const response = await instance.post("api/users/register", {
        username: username,
        nickname: nickname,
        password: password,
        passwordCheck: passwordCheck,
        userImgUrl: userImgUrl,
        introduction: introduction,
      });
      const status = response.status;
      dispatch(signUp(status));
      if (response.status === 200) {
        window.location.assign("/");
      }
    } catch (err) {
      const status = err.response.status;
      dispatch(signUp(status));
    }
  };
};

const idCheckDB = (username) => {
  return async function (dispatch) {
    try {
      const response = await instance.post("/api/users/register/idCheck", {
        username: username,
      });
      const status = response.status;
      dispatch(idCheck(status));
    } catch (err) {
      const status = err.response.status;
      dispatch(idCheck(status));
    }
  };
};

const nicknameCheckDB = (nickname) => {
  return async function (dispatch) {
    try {
      const response = await instance.post("/api/users/register/nickCheck", {
        nickname: nickname,
      });
      const status = response.status;
      dispatch(nicknameCheck(status));
    } catch (err) {
      const status = err.response.status;
      dispatch(nicknameCheck(status));
    }
  };
};

export default handleActions(
  {
    [SIGNUP]: (state, action) =>
      produce(state, (draft) => {
        draft.status = action.payload.status;
      }),

    [IDCHECK]: (state, action) =>
      produce(state, (draft) => {
        draft.status = action.payload.status;
      }),

    [NICKNAMECHECK]: (state, action) =>
      produce(state, (draft) => {
        draft.status = action.payload.status;
      }),
  },
  initialState
);

const userActions = {
  signUpDB,
  idCheckDB,
  nicknameCheckDB,
};

export { userActions };
