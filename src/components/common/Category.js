import React, { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { chatAction } from 'redux/modules/chat';
import { userAction } from 'redux/modules/user';
import * as L from 'styles/LayoutStlye';
import { AiOutlineHome, AiOutlineMessage, AiOutlineUser } from 'react-icons/ai';

const Category = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const location = useLocation();

  const eventSource = useRef();

  const cnt = useSelector(state => state.chat.cnt);
  const myInfo = useSelector(state => state.user.myinfo);
  console.log(cnt);

  useEffect(() => {
    if (myInfo) {
      eventSource.current = new EventSource(
        `${process.env.REACT_APP_API_URL}/api/subscribe/${myInfo.id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      eventSource.current.onmessage = message => {
        if (!message.data.includes('EventStream Created')) {
          dispatch(chatAction.roomListDB());
        }
      };
    }
    return () => {
      if (eventSource.current) {
        eventSource.current.close();
        eventSource.current = null;
      }
    };
  }, [myInfo, dispatch]);

  useEffect(() => {
    dispatch(chatAction.roomListDB());
    if (!myInfo) {
      dispatch(userAction.myInfoDB());
    }
  }, []);

  return (
    <CategoryWrap>
      <HomeIcon id='/chat' onClick={() => navigate('/chat')} location={location.pathname} />
      <MessageIcon
        id='/chatRoom'
        onClick={() => navigate('/chatRoom')}
        location={location.pathname}
      />
      {cnt !== 0 ||
        (!cnt && (
          <L.NewNoti position='absolute' left='50%' bottom='50%'>
            {cnt}
          </L.NewNoti>
        ))}
      <UserIcon id='/mypage' onClick={() => navigate('/mypage')} location={location.pathname} />
    </CategoryWrap>
  );
};

const CategoryWrap = styled.div`
  display: flex;
  justify-content: space-around;
  position: relative;
  padding: 15px 0;
  width: 100%;
  max-width: 450px;
  border-bottom: 1px solid #dcdcdc;
  border-right: 1px solid #dcdcdc;
  border-left: 1px solid #dcdcdc;
`;

const HomeIcon = styled(AiOutlineHome)`
  font-size: 30px;
  color: ${({ id, location }) => id === location && '#FFE4E1;'};
  cursor: pointer;
`;

const MessageIcon = styled(AiOutlineMessage)`
  font-size: 30px;
  color: ${({ id, location }) => id === location && '#FFE4E1;'};
  cursor: pointer;
`;

const UserIcon = styled(AiOutlineUser)`
  font-size: 30px;
  color: ${({ id, location }) => id === location && '#FFE4E1;'};
  cursor: pointer;
`;

export default Category;
