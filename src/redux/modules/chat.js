import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import { apis } from 'redux/api';

const ADD_ROOM = 'addroom';
const CHAT_USER = 'chatuser';
const EXIT_ROOM = 'exitroom';
const CHAT_LIST = 'chatlist';
const MESSAGE_LIST = 'messagelist';
const CLEAN_MESSAGE_LIST = 'cleanmessagelist';
const BAN_USER_LIST = 'banuserlist';
const CANCEL_BAN_USER = 'cleanbanuser';
const NOTIFICATION = 'notification';

const initialState = {
  roomId: '',
  chatList: [],
  messageList: [],
  banList: [],
  notification: false,
};

const addRoom = createAction(ADD_ROOM, roomId => ({ roomId }));
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
const chatUser = createAction(CHAT_USER, userId => ({
  userId,
}));
export const cleanMessageList = createAction(CLEAN_MESSAGE_LIST, () => ({}));
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
    await apis
      .getRoomList()
      .then(response => {
        console.log(response);
        const ChatList = response.data.filter(data => !data.isBanned);
        console.log(ChatList);
        dispatch(chatList(response.data));
      })
      .catch(err => {
        console.log(err);
      });
  };
};

const messageListDB = roomId => {
  return async dispatch => {
    await apis
      .getMessageList()
      .then(response => {
        console.log(response);
        dispatch(messageList(response.data, roomId));
      })
      .catch(err => {});
  };
};

const banUserDB = userId => {
  return async dispatch => {
    await apis
      .addBanUser(userId)
      .then(response => {
        console.log(response);
        dispatch(chatListDB());
      })
      .catch(err => {});
  };
};

const banUserListDB = () => {
  return async dispatch => {
    await apis
      .getBanUserList()
      .then(response => {
        console.log(response);
        let banuser = [];
        response.data.forEach(doc => {
          banuser.push(doc.bannedUserId);
        });
        dispatch(banUserList(response.data, banuser));
      })
      .catch(err => {});
  };
};

const cancelBanUserDB = bannedId => {
  return async dispatch => {
    await apis
      .cancelBanUser(bannedId)
      .then(response => {
        console.log(response);
        dispatch(cancelBanUser());
      })
      .catch(err => {});
  };
};

const exitRoomDB = roomId => {
  return async dispatch => {
    await apis.exitRoom(roomId);
    dispatch(exitRoom());
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

    [CLEAN_MESSAGE_LIST]: (state, action) =>
      produce(state, draft => {
        draft.messageList = [];
      }),

    [BAN_USER_LIST]: (state, action) =>
      produce(state, draft => {
        draft.banList = action.payload.banList;
        draft.banUser = action.payload.banuser;
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
  exitRoomDB,
  chatListDB,
  messageListDB,
  banUserDB,
  banUserListDB,
  cancelBanUserDB,
};

export { userAction };
