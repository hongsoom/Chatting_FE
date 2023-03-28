import { useRoutes, Navigate } from 'react-router-dom';
import App from './App';
import * as P from './pages';

const Router = () => {
  const isToken = localStorage.getItem('token');

  const routes = useRoutes([
    { path: '/', element: <App /> },
    { index: true, element: isToken ? <Navigate replace to='/chat' /> : <Navigate to='/signin' /> },
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
      element: <P.MyPage />,
    },
    {
      path: '/chat',
      element: <P.Chat />,
    },
  ]);
  return routes;
};

export default Router;
