import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { AiOutlineHome, AiOutlineMessage, AiOutlineUser } from 'react-icons/ai';

const Category = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <CategoryWrap>
      <HomeIcon id='/chat' onClick={() => navigate('/chat')} location={location.pathname} />
      <MessageIcon
        id='/meassge'
        onClick={() => navigate('/meassge')}
        location={location.pathname}
      />
      <UserIcon id='/mypage' onClick={() => navigate('/mypage')} location={location.pathname} />
    </CategoryWrap>
  );
};

const CategoryWrap = styled.div`
  display: flex;
  justify-content: space-around;
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
