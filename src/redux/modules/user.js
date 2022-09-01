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
      console.log(response);
      const status = response.status;
      dispatch(signUp(status));
      /*       if (response.status === 200) {
        window.location.assign("/login");
      } */
    } catch (err) {
      console.log(err);
      const status = err.response.status;
      dispatch(signUp(status));
    }
  };
};

export default handleActions(
  {
    [SIGNUP]: (state, action) =>
      produce(state, (draft) => {
        draft.status = action.payload.result;
      }),
  },
  initialState
);

const userActions = {
  signUpDB,
};

export { userActions };
