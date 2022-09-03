import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import instance from "../request";

const MYINFO = "myinfo";
const USERINFO = "userinfo";

const initialState = {
  list: [],
};

const myInfo = createAction(MYINFO, (myinfo) => ({ myinfo }));
const userInfo = createAction(USERINFO, (userinfo) => ({ userinfo }));

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
        const data = res.data;
        dispatch(userInfo(data));
      })
      .catch((error) => {});
  };
};

export default handleActions(
  {
    [MYINFO]: (state, action) =>
      produce(state, (draft) => {
        draft.myinfo = action.payload.myinfo;
      }),

    [USERINFO]: (state, action) =>
      produce(state, (draft) => {
        draft.userinfo = action.payload.userinfo;
      }),
  },
  initialState
);

const userActions = {
  myInfoDB,
  userInfoDB,
};

export { userActions };
