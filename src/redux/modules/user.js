import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import instance from "../request";

const USERINFO = "userinfo";

const initialState = {
  list: [],
};

const userInfo = createAction(USERINFO, (userinfo) => ({ userinfo }));

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
    [USERINFO]: (state, action) =>
      produce(state, (draft) => {
        draft.userinfo = action.payload.userinfo;
      }),
  },
  initialState
);

const userActions = {
  userInfoDB,
};

export { userActions };
