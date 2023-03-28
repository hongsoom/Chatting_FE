import styled from 'styled-components';

export const MypageWrap = styled.div`
  width: 100%;
  max-width: 500px;
  padding: 30px;
  margin: 50px;
  border: 1px solid #dcdcdc;
`;

export const ImgWrap = styled.div`
  display: flex;
  justify-content: center;
  padding: 30px;
  position: relative;

  & > img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
  }
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
  right: 135px;
  cursor: pointer;

  & > img {
    width: 30px;
  }
`;

export const SelectOptions = styled.ul`
  position: absolute;
  top: 18px;
  left: 0;
  width: 150px;
  overflow: hidden;
  display: ${props => (props.show ? '0' : 'none')};
  height: 60px;
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

export const ErrorWrap = styled.div`
  height: 1em;
  margin-top: 8px;
  font-size: 12px;
  font-weight: 700;
  color: #f34f1d;
`;

export const ButtonWrap = styled.div`
  display: flex;
`;
