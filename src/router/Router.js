import { useRoutes, lazy, Suspense } from 'react-router-dom';
import App from 'App';
import PrivateRoute from 'router/PrivateRoute';
import { Loading } from 'components';

const Router = () => {
  const P = lazy(() => import('pages'));
  const routes = useRoutes([
    { path: '/', element: <App /> },
    {
      index: true,
      element: <PrivateRoute component={<P.Chat />} />,
    },
    {
      path: '/signup',
      element: <P.SignUp />,
    },
    {
      path: '/signin',
      element: <P.SignIn />,
    },
    {
      path: '/mypage',
      element: <PrivateRoute component={<P.MyPage />} />,
    },
    {
      path: '/chat',
      element: <PrivateRoute component={<P.Chat />} />,
    },
    {
      path: '/chat/:roomId',
      element: <PrivateRoute component={<P.ChatRoom />} />,
    },
    {
      path: '/chatRoom',
      element: <PrivateRoute component={<P.MyChatRoom />} />,
    },
  ]);
  return <Suspense fallback={<Loading message='페이지가 로딩 중입니다...' />}>{routes}</Suspense>;
};

export default Router;
