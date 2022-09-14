import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import instance from "../request";

const ADDROOM = "addroom";
const EXITROOM = "exitroom";
const CHATLIST = "chatlist";
const MESSAGELIST = "messagelist";

const initialState = {
  roomId: "",
  chatList: [],
  messageList: [],
};

const addRoom = createAction(ADDROOM, (roomId) => ({ roomId }));
const exitRoom = createAction(EXITROOM, (roomId) => ({ roomId }));
const chatList = createAction(CHATLIST, (chatList) => ({ chatList }));
const messageList = createAction(MESSAGELIST, (messageList) => ({
  messageList,
}));

const addRoomDB = (requester, acceptor, reqOut, accOut) => {
  return async function (dispatch) {
    await instance
      .post(`/api/chat/room/${acceptor}`, {
        requester: requester,
        acceptor: acceptor,
        reqOut: reqOut,
        accOut: accOut,
      })
      .then((res) => {
        dispatch(addRoom(res.data));
      })
      .catch((err) => {});
  };
};

const exitRoomDB = (roomId) => {
  return async function (dispatch) {
    await instance
      .get(`/api/chat/room/exit/${roomId}`)
      .then((res) => {
        console.log(res);
        dispatch(exitRoom());
      })
      .catch((err) => {});
  };
};

const chatListDB = () => {
  return async function (dispatch) {
    await instance
      .get("/api/chat/rooms")
      .then((res) => {
        console.log(res);
        dispatch(chatList(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const messageListDB = (roomId) => {
  return async function (dispatch) {
    await instance
      .get(`/api/chat/room/${roomId}`)
      .then((res) => {
        console.log(res);
        dispatch(messageList(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export default handleActions(
  {
    [ADDROOM]: (state, action) =>
      produce(state, (draft) => {
        draft.roomId = action.payload.roomId;
      }),

    [EXITROOM]: (state, action) =>
      produce(state, (draft) => {
        draft.roomId = "";
      }),

    [CHATLIST]: (state, action) =>
      produce(state, (draft) => {
        draft.chatList = action.payload.chatList;
      }),

    [MESSAGELIST]: (state, action) =>
      produce(state, (draft) => {
        draft.messageList = action.payload.messageList;
      }),
  },
  initialState
);

const userAction = {
  addRoomDB,
  exitRoomDB,
  chatListDB,
  messageListDB,
};

export { userAction };
