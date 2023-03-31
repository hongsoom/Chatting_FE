import styled from 'styled-components';

export const ImgWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px;
  position: relative;

  & > img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
  }
`;

export const MyInfoWrap = styled.div`
  margin-bottom: 20px;
`;

export const UserProfileEdit = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid #b8b8b8;
  background-color: white;
  bottom: 30px;
  right: 120px;
  cursor: pointer;

  & > img {
    width: 30px;
  }
`;

export const SelectOptions = styled.ul`
  position: absolute;
  top: 20px;
  left: 20px;
  width: 150px;
  display: ${props => (props.show ? '0' : 'none')};
  padding: 5px;
  border-radius: 8px;
  background-color: #222222;
  color: #fefefe;
`;

export const Option = styled.li`
  font-size: 14px;
  padding: 6px 8px;
  &:hover {
    background-color: #595959;
  }
`;

export const ButtonWrap = styled.div`
  display: flex;
`;
