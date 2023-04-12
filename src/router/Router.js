import { useRoutes } from 'react-router-dom';
import App from 'App';
import * as P from 'pages';
import PrivateRoute from 'router/PrivateRoute';

const Router = () => {
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
  return routes;
};

export default Router;
