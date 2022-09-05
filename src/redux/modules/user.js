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
const login = createAction(LOGIN, (status) => ({ status }));
const logOut = createAction(LOGOUT, (result) => ({ result }));
const myInfo = createAction(MYINFO, (myinfo) => ({ myinfo }));
const userInfo = createAction(USERINFO, (userinfo) => ({ userinfo }));
const editinfo = createAction(EDITMYINFO, (editinfo) => ({ editinfo }));

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
        window.location.assign("/main");
      }
    } catch (err) {
      setClick(true);
      const status = err.response.status;
      dispatch(login(status));
    }
  };
};

export default handleActions(
  {
    [LOGIN]: (state, action) =>
      produce(state, (draft) => {
        draft.isLogin = true;
        draft.status = action.payload.status;
      }),
  },
  initialState
);

const userActions = {
  logInDB,
};

export { userActions };
