import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import instance from "../request";

const ADDROOM = "addroom";
const EXITROOM = "exitroom";

const initialState = {
  roomId: "",
};

const addRoom = createAction(ADDROOM, (roomId) => ({ roomId }));
const exitRoom = createAction(EXITROOM, (roomId) => ({ roomId }));

const addRoomDB = (requester, acceptor, reqOut, accOut, setRoom) => {
  return async function (dispatch) {
    const response = await instance
      .post(`/api/chat/room/${acceptor}`, {
        requester: requester,
        acceptor: acceptor,
        reqOut: reqOut,
        accOut: accOut,
      })
      .then((res) => {
        dispatch(addRoom(res.data));
        if (res.status === 200) {
          setRoom(true);
        }
      })
      .catch((err) => {
        setRoom(false);
      });
  };
};

const exitRoomDB = (roomId) => {
  return async function (dispatch) {
    const response = await instance
      .get(`/api/chat/room/exit/${roomId}`)
      .then((res) => {})
      .catch((err) => {});
  };
};

/* const myInfoDB = () => {
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
}; */

export default handleActions(
  {
    [ADDROOM]: (state, action) =>
      produce(state, (draft) => {
        draft.roomId = action.payload.roomId;
      }),
  },
  initialState
);

const userAction = {
  addRoomDB,
  exitRoomDB,
};

export { userAction };
