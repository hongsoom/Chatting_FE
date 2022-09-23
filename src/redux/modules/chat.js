import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import instance from "../request";

const ADD_ROOM = "addroom";
const CHAT_USER = "chatuser";
const EXIT_ROOM = "exitroom";
const CHAT_LIST = "chatlist";
const MESSAGE_LIST = "messagelist";
const ADD_MESSAGE = "addmessage";
const UPDATE_ROOM_MESSAGE = "UPDATE_ROOM_MESSAGE";
const CLEAN_UP_MESSAGE = "CLEAN_UP_MESSAGE";
const BAN_USER = "banuser";
const BAN_USER_LIST = "banuserlist";
const CANCEL_BAN_USER = "cleanbanuser";
const NOTIFICATION = "notification";

const initialState = {
  roomId: "",
  chatList: [],
  messageList: [],
  banList: [],
};

const addRoom = createAction(ADD_ROOM, (roomId) => ({ roomId }));
const exitRoom = createAction(EXIT_ROOM, () => ({}));
const chatList = createAction(CHAT_LIST, (chatList) => ({ chatList }));
const messageList = createAction(MESSAGE_LIST, (messageList) => ({
  messageList,
}));
const banUser = createAction(BAN_USER, () => ({}));
const banUserList = createAction(BAN_USER_LIST, (banList) => ({ banList }));
const cancelBanUser = createAction(CANCEL_BAN_USER, () => ({}));
const chatUser = createAction(CHAT_USER, (userId) => ({
  userId,
}));
export const addMessage = createAction(ADD_MESSAGE, (messageObj) => ({
  messageObj,
}));
export const updateRoomMessage = createAction(
  UPDATE_ROOM_MESSAGE,
  (messageObj) => ({
    messageObj,
  })
);
export const cleanUpMessage = createAction(CLEAN_UP_MESSAGE, () => ({}));

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
        dispatch(chatUser(acceptor));
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
    [ADD_ROOM]: (state, action) =>
      produce(state, (draft) => {
        draft.roomId = action.payload.roomId;
      }),

    [CHAT_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.userId = action.payload.userId;
      }),

    [EXIT_ROOM]: (state, action) =>
      produce(state, (draft) => {
        draft.roomId = "";
      }),

    [CHAT_LIST]: (state, action) =>
      produce(state, (draft) => {
        draft.chatList = action.payload.chatList;
      }),

    [MESSAGE_LIST]: (state, action) =>
      produce(state, (draft) => {
        draft.messageList = action.payload.messageList;
      }),

    [ADD_MESSAGE]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.messageList.push(payload.messageObj);
      }),

    // 채팅 리스트의 메시지 갱신
    [UPDATE_ROOM_MESSAGE]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.roomList[payload.messageObj.index].message =
          payload.messageObj.message;
        draft.roomList[payload.messageObj.index].date = payload.messageObj.date;
      }),

    // 메시지 지우기
    [CLEAN_UP_MESSAGE]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.messageList = initialState.messageList;
      }),

    [BAN_USER_LIST]: (state, action) =>
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
