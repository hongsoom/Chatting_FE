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

const signUp = createAction(SIGNUP, (result) => ({ result }));
const login = createAction(LOGIN, (result) => ({ result }));
const logOut = createAction(LOGOUT, (result) => ({ result }));
const idCheck = createAction(IDCHECK, (result) => ({ result }));
const nicknameCheck = createAction(NICKNAMECHECK, (status) => ({ status }));
const myInfo = createAction(MYINFO, (myinfo) => ({ myinfo }));
const userInfo = createAction(USERINFO, (userinfo) => ({ userinfo }));
const editInfo = createAction(EDITMYINFO, (myinfo) => ({ myinfo }));
const deleteImg = createAction(DELETEIMG, (result) => ({ result }));

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
        window.location.assign("/mypage");
      })
      .catch((error) => {
        console.log(error);
      });
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
      .catch((error) => {
        console.log(error);
      });
  };
};

export default handleActions(
  {
    [NICKNAMECHECK]: (state, action) =>
      produce(state, (draft) => {
        draft.status = action.payload.status;
      }),

    [MYINFO]: (state, action) =>
      produce(state, (draft) => {
        draft.myinfo = action.payload.myinfo;
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
  nicknameCheckDB,
  myInfoDB,
  editInfoDB,
  deleteImgDB,
};

export { userActions };
