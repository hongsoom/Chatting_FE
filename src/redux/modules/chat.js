import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import instance from "../request";

const ADDROOM = "addroom";
const EXITROOM = "exitroom";
const CHATLIST = "chatlist";
const MESSAGELIST = "messagelist";
const ADDMESSAGE = "addmessage";
const UPDATEROOMMESSAGE = "updateroommessage";
const BANUSER = "banuser";
const BANUSERLIST = "banuserlist";
const CANCELBANUSER = "cleanbanuser";
const NOTIFICATION = "NOTIFICATION";

const initialState = {
  roomId: "",
  chatList: [],
  messageList: [],
  banList: [],
};

const addRoom = createAction(ADDROOM, (roomId) => ({ roomId }));
const exitRoom = createAction(EXITROOM, () => ({}));
const chatList = createAction(CHATLIST, (chatList) => ({ chatList }));
const messageList = createAction(MESSAGELIST, (messageList) => ({
  messageList,
}));
const banUser = createAction(BANUSER, () => ({}));
const banUserList = createAction(BANUSERLIST, (banList) => ({ banList }));
const cancelBanUser = createAction(CANCELBANUSER, () => ({}));
export const addMessage = createAction(ADDMESSAGE, (messageObj) => ({
  messageObj,
}));
export const updateRoomMessage = createAction(
  UPDATEROOMMESSAGE,
  (messageObj) => ({
    messageObj,
  })
);
export const notification = createAction(NOTIFICATION, (notification) => ({
  notification,
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
        dispatch(chatList(res.data));
      })
      .catch((err) => {});
  };
};

const messageListDB = (roomId) => {
  return async function (dispatch) {
    await instance
      .get(`/api/chat/room/${roomId}`)
      .then((res) => {
        dispatch(messageList(res.data));
      })
      .catch((err) => {});
  };
};

const banUserDB = (userId) => {
  return async function (dispatch) {
    await instance
      .get(`/api/room/banned/${userId}`)
      .then((res) => {
        dispatch(banUser());
      })
      .catch((err) => {});
  };
};

const banUserListDB = () => {
  return async function (dispatch) {
    await instance
      .get("/api/room/banned")
      .then((res) => {
        dispatch(banUserList(res.data));
      })
      .catch((err) => {});
  };
};

const cancelBanUserDB = (bannedId) => {
  return async function (dispatch) {
    await instance
      .delete(`/api/room/banned/${bannedId}`)
      .then((res) => {
        dispatch(cancelBanUser());
      })
      .catch((err) => {});
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
    // 채팅 메시지 추가
    [ADDMESSAGE]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.messageList.push(payload.messageObj);
      }),

    // 채팅 리스트의 메시지 갱신
    [UPDATEROOMMESSAGE]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.roomList[payload.messageObj.index].message =
          payload.messageObj.message;
        draft.roomList[payload.messageObj.index].date = payload.messageObj.date;
      }),

    [BANUSERLIST]: (state, action) =>
      produce(state, (draft) => {
        draft.banList = action.payload.banList;
      }),

    [NOTIFICATION]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.notification = payload.notification;
      }),
  },
  initialState
);

const userAction = {
  addRoomDB,
  exitRoomDB,
  chatListDB,
  messageListDB,
  banUserDB,
  banUserListDB,
  cancelBanUserDB,
};

export { userAction };
