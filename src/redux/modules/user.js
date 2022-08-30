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

const signUp = createAction(SIGNUP, (result) => ({ result }));
const login = createAction(LOGIN, (result) => ({ result }));
const logOut = createAction(LOGOUT, (result) => ({ result }));
const myInfo = createAction(MYINFO, (myinfo) => ({ myinfo }));
const userInfo = createAction(USERINFO, (userinfo) => ({ userinfo }));
const editinfo = createAction(EDITMYINFO, (editinfo) => ({ editinfo }));

const signUpDB = (inputs) => {
  return async function (dispatch) {
    const introduction = null;
    const userImgUrl = null;
    try {
      const response = await instance.post("api/users/register", {
        inputs,
        userImgUrl: userImgUrl,
        introduction: introduction,
      });
      const status = response.status;
      dispatch(signUp(status));
      if (response.status === 200) {
        window.location.assign("/login");
      }
    } catch (err) {}
  };
};

const logInDB = (inputs) => {
  return async function (dispatch) {
    try {
      const response = await instance.post("api/user/login", {
        inputs,
      });
      if (response.status === 200) {
        const token = response.headers.authorization;

        localStorage.setItem("token", token);

        const status = response.data.status;
        dispatch(login(status));
      }
      if (localStorage.getItem("token")) {
        window.location.assign("/");
      }
    } catch (err) {
      const status = err.response.data.status;
      dispatch(login(status));
    }
  };
};

export default handleActions(
  {
    [SIGNUP]: (state, action) =>
      produce(state, (draft) => {
        draft.status = action.payload.result;
      }),

    [IDCHECK]: (state, action) =>
      produce(state, (draft) => {
        draft.status = action.payload.status;
      }),

    [NICKNAMECHECK]: (state, action) =>
      produce(state, (draft) => {
        draft.status = action.payload.status;
      }),

    [LOGIN]: (state, action) =>
      produce(state, (draft) => {
        draft.isLogin = true;
        draft.status = action.payload.result;
      }),
  },
  initialState
);

const userActions = {
  signUpDB,
  logInDB,
};

export { userActions };
