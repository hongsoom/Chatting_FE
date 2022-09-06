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
const nicknameCheck = createAction(NICKNAMECHECK, (result) => ({ result }));
const myInfo = createAction(MYINFO, (myinfo) => ({ myinfo }));
const userInfo = createAction(USERINFO, (userinfo) => ({ userinfo }));
const editInfo = createAction(EDITMYINFO, (myinfo) => ({ myinfo }));
const deleteImg = createAction(DELETEIMG, (result) => ({ result }));

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
  myInfoDB,
  editInfoDB,
  deleteImgDB,
};

export { userActions };
