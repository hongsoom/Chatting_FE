import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import { apis } from 'redux/api';

const ADD_ROOM = 'ADD_ROOM';
const CHAT_USER = 'CHAT_USER';
const EXIT_ROOM = 'EXIT_ROOM';
const ROOM_LIST = 'ROOM_LIST';
const MESSAGE_LIST = 'MESSAGE_LIST';
const ADD_MESSAGE = 'ADD_MESSAGE';
const BAN_USER_LIST = 'BAN_USER_LIST';

const initialState = {
  roomId: '',
  roomList: [],
  messageList: [],
  banList: [],
};

const addRoom = createAction(ADD_ROOM, roomId => ({ roomId }));
const roomList = createAction(ROOM_LIST, (roomList, cnt) => ({
  roomList,
  cnt,
}));
const messageList = createAction(MESSAGE_LIST, (messageList, roomId) => ({
  messageList,
  roomId,
}));
const addMessage = createAction(ADD_MESSAGE, messageObj => ({
  messageObj,
}));
const banUserList = createAction(BAN_USER_LIST, (banList, banuser) => ({
  banList,
  banuser,
}));
const chatUser = createAction(CHAT_USER, userId => ({
  userId,
}));

const addRoomDB = (requester, acceptor) => {
  const reqOut = false;
  const accOut = false;
  return async dispatch => {
    try {
      const response = await apis.addRoom(requester, acceptor, reqOut, accOut);

      if (response.status === 200) {
        dispatch(addRoom(response.data));
        dispatch(chatUser(acceptor));
        return response.data;
      }
    } catch (err) {
      return false;
    }
  };
};

const roomListDB = () => {
  return async dispatch => {
    try {
      const response = await apis.getRoomList();
      let unreadCnt = [];
      response.data.forEach(doc => {
        unreadCnt.push(doc.unreadCnt);
      });
      const cnt = unreadCnt.reduce((a, b) => a + b);
      dispatch(roomList(response.data, cnt));
    } catch (err) {
      return false;
    }
  };
};

const messageListDB = roomId => {
  return async dispatch => {
    try {
      const response = await apis.getMessageList(roomId);
      dispatch(messageList(response.data));
    } catch (err) {
      return false;
    }
  };
};

const banUserDB = userId => {
  return async dispatch => {
    await apis.addBanUser(userId);
    return false;
  };
};

const banUserListDB = () => {
  return async dispatch => {
    try {
      const response = await apis.getBanUserList();
      dispatch(banUserList(response.data));
    } catch (err) {
      return false;
    }
  };
};

const cancelBanUserDB = bannedId => {
  return async dispatch => {
    await apis.cancelBanUser(bannedId);
    return false;
  };
};

const exitRoomDB = roomId => {
  return async dispatch => {
    await apis.exitRoom(roomId);
    return dispatch(roomListDB());
  };
};

export default handleActions(
  {
    [ADD_ROOM]: (state, action) =>
      produce(state, draft => {
        draft.roomId = action.payload.roomId;
      }),

    [CHAT_USER]: (state, action) =>
      produce(state, draft => {
        draft.userId = action.payload.userId;
      }),

    [EXIT_ROOM]: (state, action) =>
      produce(state, draft => {
        draft.roomId = '';
      }),

    [ROOM_LIST]: (state, action) =>
      produce(state, draft => {
        draft.roomList = action.payload.roomList;
        draft.cnt = action.payload.cnt;
      }),

    [MESSAGE_LIST]: (state, action) =>
      produce(state, draft => {
        draft.messageList = action.payload.messageList;
      }),

    [ADD_MESSAGE]: (state, { payload }) =>
      produce(state, draft => {
        draft.messageList.push(payload.messageObj);
      }),

    [BAN_USER_LIST]: (state, action) =>
      produce(state, draft => {
        draft.banList = action.payload.banList;
      }),
  },
  initialState
);

const chatAction = {
  addRoomDB,
  addMessage,
  exitRoomDB,
  roomListDB,
  messageListDB,
  banUserDB,
  banUserListDB,
  cancelBanUserDB,
};

export { chatAction };
