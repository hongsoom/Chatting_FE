import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import instance from "../request";

const ADD_ROOM = "addroom";
const CHAT_USER = "chatuser";
const EXIT_ROOM = "exitroom";
const CHAT_LIST = "chatlist";
const MESSAGE_LIST = "messagelist";
const CLEAN_MESSAGE_LIST = "cleanmessagelist";
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
const chatList = createAction(CHAT_LIST, (chatList, cnt) => ({
  chatList,
  cnt,
}));
const messageList = createAction(MESSAGE_LIST, (messageList, roomId) => ({
  messageList,
  roomId,
}));
const banUserList = createAction(BAN_USER_LIST, (banList, banuser) => ({
  banList,
  banuser,
}));
const cancelBanUser = createAction(CANCEL_BAN_USER, () => ({}));
const chatUser = createAction(CHAT_USER, (userId) => ({
  userId,
}));
export const cleanMessageList = createAction(CLEAN_MESSAGE_LIST, () => ({}));
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
        let cnt = [];
        res.data.forEach((doc) => {
          cnt.push(doc.unreadCnt);
        });
        dispatch(chatList(res.data, cnt));
      })
      .catch((err) => {});
  };
};

const messageListDB = (roomId) => {
  return async function (dispatch) {
    await instance
      .get(`/api/chat/room/${roomId}`)
      .then((res) => {
        dispatch(messageList(res.data, roomId));
      })
      .catch((err) => {});
  };
};

const banUserDB = (userId) => {
  return async function (dispatch) {
    await instance
      .get(`/api/room/banned/${userId}`)
      .then((res) => {
        dispatch(chatListDB());
      })
      .catch((err) => {});
  };
};

const banUserListDB = () => {
  return async function (dispatch) {
    await instance
      .get("/api/room/banned")
      .then((res) => {
        let banuser = [];
        res.data.forEach((doc) => {
          banuser.push(doc.bannedUserId);
        });
        dispatch(banUserList(res.data, banuser));
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
        draft.cnt = action.payload.cnt;
      }),

    [MESSAGE_LIST]: (state, action) =>
      produce(state, (draft) => {
        draft.messageList = action.payload.messageList;
        draft.messageRoodId = action.payload.roomId;
      }),

    [CLEAN_MESSAGE_LIST]: (state, action) =>
      produce(state, (draft) => {
        draft.messageList = [];
      }),

    [BAN_USER_LIST]: (state, action) =>
      produce(state, (draft) => {
        draft.banList = action.payload.banList;
        draft.banUser = action.payload.banuser;
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
