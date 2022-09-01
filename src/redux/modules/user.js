import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import instance from "../request";

const SIGNUP = "signup";
const LOGIN = "login";
const LOGOUT = "logout";
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

const signUpDB = (username, nickname, password, passwordCheck) => {
  return async function (dispatch) {
    const introduction = null;
    const userImgUrl = null;
    try {
      const response = await instance.post("/api/users/register", {
        username: username,
        nickname: nickname,
        password: password,
        passwordCheck: passwordCheck,
        userImgUrl: userImgUrl,
        introduction: introduction,
      });
      console.log(response);
      const status = response.status;
      dispatch(signUp(status));
      if (response.status === 200) {
        window.location.assign("/login");
      }
    } catch (err) {
      console.log(err);
    }
  };
};

const logInDB = (username, password) => {
  return async function (dispatch) {
    try {
      const response = await instance.post("/api/users/login", {
        username: username,
        password: password,
      });
      console.log(response);
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
      console.log(err);
      const status = err.response.data.status;
      dispatch(login(status));
    }
  };
};

const logOutDB = () => {
  return async function (dispatch) {
    localStorage.removeItem("token");
    dispatch(logOut());
  };
};

const myInfoDB = () => {
  return async function (dispatch) {
    await instance
      .get(
        `/api/users/myPage
      `,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        const data = res.data;
        dispatch(myInfo(data));
      })
      .catch((error) => {});
  };
};

export default handleActions(
  {
    [SIGNUP]: (state, action) =>
      produce(state, (draft) => {
        draft.status = action.payload.result;
      }),

    [LOGIN]: (state, action) =>
      produce(state, (draft) => {
        draft.isLogin = true;
        draft.status = action.payload.result;
      }),

    [LOGOUT]: (state, action) =>
      produce(state, (draft) => {
        draft.isLogin = false;
      }),

    [MYINFO]: (state, action) =>
      produce(state, (draft) => {
        draft.myinfo = action.payload.myinfo;
      }),
  },
  initialState
);

const userActions = {
  signUpDB,
  logInDB,
  logOutDB,
  myInfoDB,
};

export { userActions };
