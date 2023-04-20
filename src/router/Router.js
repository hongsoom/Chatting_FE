import React, { lazy, Suspense } from 'react';
import { useRoutes, Navigate } from 'react-router-dom';
import App from 'App';
import PrivateRoute from 'router/PrivateRoute';
import { Loading } from 'components';

const Router = () => {
  const Chat = lazy(() => import('pages/Chat'));
  const ChatRoom = lazy(() => import('pages/ChatRoom'));
  const MyChatRoom = lazy(() => import('pages/MyChatRoom'));
  const MyPage = lazy(() => import('pages/MyPage'));
  const SignIn = lazy(() => import('pages/SignIn'));
  const SignUp = lazy(() => import('pages/SignUp'));

  const routes = useRoutes([
    { path: '/', element: <App /> },
    {
      index: true,
      element: <Navigate replace to='/chat' />,
    },
    {
      path: '/signup',
      element: <SignUp />,
    },
    {
      path: '/signin',
      element: <SignIn />,
    },
    {
      path: '/mypage',
      element: <PrivateRoute component={<MyPage />} />,
    },
    {
      path: '/chat',
      element: <PrivateRoute component={<Chat />} />,
    },
    {
      path: '/chat/:roomId',
      element: <PrivateRoute component={<ChatRoom />} />,
    },
    {
      path: '/chatRoom',
      element: <PrivateRoute component={<MyChatRoom />} />,
    },
  ]);
  return <Suspense fallback={<Loading message='페이지가 로딩 중입니다...' />}>{routes}</Suspense>;
};

export default Router;
