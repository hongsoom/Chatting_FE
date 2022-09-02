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

export default handleActions(
  {
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
  logOutDB,
  myInfoDB,
};

export { userActions };
