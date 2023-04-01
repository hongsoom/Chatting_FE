import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { userActions } from 'redux/modules/user';
import * as L from 'styles/LayoutStlye';
import { Category, Title, Link, RandomChatList } from 'components';

const Chat = () => {
  const dispatch = useDispatch();

  const resetClick = () => {
    dispatch(userActions.userInfoDB());
  };

  useEffect(() => {
    resetClick();
    dispatch(userActions.myInfoDB());
  }, []);

  return (
    <>
      <L.Layout>
        <Title title='채팅' />
        <RandomChatList />
        <Link onClick={resetClick} />
      </L.Layout>
      <Category />
    </>
  );
};

export default Chat;
