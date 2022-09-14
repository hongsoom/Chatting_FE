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
const DELETEIMG = "deleteimg";

const initialState = {
  list: [],
};

const signUp = createAction(SIGNUP, (status) => ({ status }));
const login = createAction(LOGIN, (status) => ({ status }));
const logOut = createAction(LOGOUT, (result) => ({ result }));
const idCheck = createAction(IDCHECK, (status) => ({ status }));
const nicknameCheck = createAction(NICKNAMECHECK, (status) => ({ status }));
const myInfo = createAction(MYINFO, (myinfo) => ({ myinfo }));
const userInfo = createAction(USERINFO, (userinfo) => ({ userinfo }));
const editInfo = createAction(EDITMYINFO, (myinfo) => ({ myinfo }));
const deleteImg = createAction(DELETEIMG, (result) => ({ result }));

const signUpDB = (username, nickname, password, passwordCheck) => {
  return async function (dispatch) {
    const introduction = "";
    const userImgUrl = "";
    try {
      const response = await instance.post("/api/users/register", {
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

const logInDB = (username, password, setClick) => {
  return async function (dispatch) {
    try {
      const response = await instance.post("/api/users/login", {
        username: username,
        password: password,
      });
      if (response.status === 200) {
        const token = response.data;

        localStorage.setItem("token", token);

        const status = response.status;
        dispatch(login(status));
      }
      if (localStorage.getItem("token")) {
        window.location.assign("/chat");
      }
    } catch (err) {
      setClick(true);
      const status = err.response.status;
      dispatch(login(status));
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

const logOutDB = () => {
  return async function (dispatch) {
    localStorage.removeItem("token");
    dispatch(logOut());
    window.location.assign("/");
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

const userInfoDB = () => {
  return async function (dispatch) {
    await instance
      .get(
        `/api/users/usersRandom
      `,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        const data = res.data.userList;
        dispatch(userInfo(data));
      })
      .catch((error) => {});
  };
};

const deleteImgDB = () => {
  return async function (dispatch) {
    await instance
      .put("/api/users/imgDeleted", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        dispatch(deleteImg());
      })
      .catch((error) => {});
  };
};

const editInfoDB = (data) => {
  return async function (dispatch) {
    await instance
      .put("/api/users/updated", data, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        dispatch(editInfo(data));
        window.location.assign("/mypage");
      })
      .catch((error) => {});
  };
};

export default handleActions(
  {
    [SIGNUP]: (state, action) =>
      produce(state, (draft) => {
        draft.status = action.payload.status;
      }),

    [LOGIN]: (state, action) =>
      produce(state, (draft) => {
        draft.isLogin = true;
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

    [LOGOUT]: (state, action) =>
      produce(state, (draft) => {
        draft.isLogin = false;
      }),

    [MYINFO]: (state, action) =>
      produce(state, (draft) => {
        draft.myinfo = action.payload.myinfo;
      }),

    [USERINFO]: (state, action) =>
      produce(state, (draft) => {
        draft.userinfo = action.payload.userinfo;
      }),

    [EDITMYINFO]: (state, action) =>
      produce(state, (draft) => {
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
