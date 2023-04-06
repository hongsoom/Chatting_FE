import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from 'redux/modules/user';
import * as L from 'styles/LayoutStlye';
import { Category, Title, Link, RandomChatList } from 'components';

const Chat = () => {
  const dispatch = useDispatch();

  const myInfo = useSelector(state => state.user.myinfo);

  const resetClick = () => {
    dispatch(userActions.userInfoDB());
  };

  useEffect(() => {
    resetClick();
  }, [dispatch]);

  return (
    <>
      <L.Layout>
        <Title title='채팅' />
        <RandomChatList myInfo={myInfo} />
        <Link onClick={resetClick} />
      </L.Layout>
      <Category />
    </>
  );
};

export default Chat;
