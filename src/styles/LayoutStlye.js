import styled from 'styled-components';

export const Layout = styled.div`
  width: 100%;
  max-width: 450px;
  padding: 30px;
  border: 1px solid #dcdcdc;
  height: ${({ height }) => (height ? `${height};` : ' ')};
  position: relative;
`;

export const FormLayout = styled.form`
  width: 100%;
  max-width: 450px;
  padding: 30px;
  border: 1px solid #dcdcdc;
`;

export const ErrorLayout = styled.div`
  height: 1em;
  margin: 10px 0;
  font-size: 12px;
  font-weight: 700;
  color: #f34f1d;
`;

export const ItemListLayout = styled.div`
  height: 470px;
  width: 100%;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
`;

export const ItemLayout = styled.div`
  display: flex;
  max-width: 400px;
  width: 100%;
  margin: 13px auto;
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
  }

  & > img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin: 20px 20px 10px 0px;
  }

  @media screen and (max-width: 768px) {
    max-height: 90px;
  }
`;

export const SelectOptions = styled.ul`
  position: absolute;
  top: ${({ top }) => top && `${top};`};
  left: ${({ left }) => left && `${left};`};
  right: ${({ right }) => right && `${right};`};
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
