import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { userAction } from 'redux/modules/user';
import * as L from 'styles/LayoutStlye';
import { Category, Title, Link, RandomChatList } from 'components';

const Chat = () => {
  const dispatch = useDispatch();

  const resetClick = () => {
    dispatch(userAction.userInfoDB());
  };

  useEffect(() => {
    resetClick();
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
