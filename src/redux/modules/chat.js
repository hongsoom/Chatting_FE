import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import { apis } from 'redux/api';

const ADD_ROOM = 'ADD_ROOM';
const CHAT_USER = 'CHAT_USER';
const EXIT_ROOM = 'EXIT_ROOM';
const CHAT_LIST = 'CHAT_LIST';
const MESSAGE_LIST = 'MESSAGE_LIST';
const ADD_MESSAGE = 'ADD_MESSAGE';
const UPDATE_ROOM_MESSAGE = 'UPDATE_ROOM_MESSAGE';
const BAN_USER_LIST = 'BAN_USER_LIST';
const NOTIFICATION = 'NOTIFICATION';

const initialState = {
  roomId: '',
  chatList: [],
  messageList: [],
  banList: [],
  notification: false,
};

const addRoom = createAction(ADD_ROOM, roomId => ({ roomId }));
const chatList = createAction(CHAT_LIST, (chatList, cnt) => ({
  chatList,
  cnt,
}));
const messageList = createAction(MESSAGE_LIST, (messageList, roomId) => ({
  messageList,
  roomId,
}));
const addMessage = createAction(ADD_MESSAGE, messageObj => ({
  messageObj,
}));
const updateRoomMessage = createAction(UPDATE_ROOM_MESSAGE, messageObj => ({
  messageObj,
}));
const banUserList = createAction(BAN_USER_LIST, (banList, banuser) => ({
  banList,
  banuser,
}));
const chatUser = createAction(CHAT_USER, userId => ({
  userId,
}));
export const notification = createAction(NOTIFICATION, notification => ({
  notification,
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

const chatListDB = () => {
  return async dispatch => {
    try {
      const response = await apis.getRoomList();
      const ChatList = response.data.filter(data => !data.isBanned);
      console.log(ChatList);
      dispatch(chatList(response.data));
    } catch (err) {
      return false;
    }
  };
};

const messageListDB = roomId => {
  return async dispatch => {
    try {
      const response = await apis.getMessageList();
      console.log(response);
      dispatch(messageList(response.data, roomId));
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
    return dispatch(chatListDB());
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

    [CHAT_LIST]: (state, action) =>
      produce(state, draft => {
        draft.chatList = action.payload.chatList;
        draft.cnt = action.payload.cnt;
      }),

    [MESSAGE_LIST]: (state, action) =>
      produce(state, draft => {
        draft.messageList = action.payload.messageList;
        draft.messageRoodId = action.payload.roomId;
      }),

    // 채팅 메시지 추가
    [ADD_MESSAGE]: (state, { payload }) =>
      produce(state, draft => {
        draft.messageList.push(payload.messageObj);
      }),

    // 채팅 리스트의 메시지 갱신
    [UPDATE_ROOM_MESSAGE]: (state, { payload }) =>
      produce(state, draft => {
        draft.chatList[payload.messageObj.index].message = payload.messageObj.message;
        draft.chatList[payload.messageObj.index].date = payload.messageObj.date;
      }),

    [BAN_USER_LIST]: (state, action) =>
      produce(state, draft => {
        draft.banList = action.payload.banList;
      }),

    [NOTIFICATION]: (state, { payload }) =>
      produce(state, draft => {
        draft.notification = payload.notification;
      }),
  },
  initialState
);

const userAction = {
  addRoomDB,
  addMessage,
  updateRoomMessage,
  exitRoomDB,
  chatListDB,
  messageListDB,
  banUserDB,
  banUserListDB,
  cancelBanUserDB,
};

export { userAction };
