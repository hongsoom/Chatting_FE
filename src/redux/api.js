import api from 'redux/request';

export const apis = {
  signIn: (username, password) => api.post('/api/users/login', { username, password }),

  signup: userObj => api.post('/api/users/register', userObj),

  usernameCheck: username => api.post('/api/users/register/idCheck', { username }),

  nicknameCheck: nickname => api.post('/api/users/register/nickCheck', { nickname }),

  loadMyPage: () => api.get('/api/users/myPage'),

  loadUserInfo: () => api.get('/api/users/usersRandom'),

  deleteuserImg: () => api.put('/api/users/imgDeleted'),

  changeUserInfo: data => api.put('/api/users/updated', data),

  getRoomList: () => api.get('/api/chat/rooms'),

  getMessageList: roomId => api.get(`/api/chat/room/${roomId}`),

  addRoom: (requester, acceptor, reqOut, accOut) =>
    api.post(`/api/chat/room/${acceptor}`, { requester, acceptor, reqOut, accOut }),

  getBanUserList: () => api.get('/api/room/banned'),

  addBanUser: userId => api.get(`/api/room/banned/${userId}`),

  cancelBanUser: bannedId => api.delete(`/api/room/banned/${bannedId}`),

  exitRoom: roomId => api.get(`/api/chat/room/exit/${roomId}`),
};
