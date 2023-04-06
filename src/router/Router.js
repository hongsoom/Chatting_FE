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
      path: '/chat/:id',
      element: <PrivateRoute component={<P.ChatRoom />} />,
    },
    {
      path: '/meassge',
      element: <PrivateRoute component={<P.Meassge />} />,
    },
  ]);
  return routes;
};

export default Router;
