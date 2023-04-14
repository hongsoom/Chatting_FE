import styled from 'styled-components';

export const Layout = styled.div`
  width: 100%;
  max-width: 450px;
  padding: 30px;
  border: 1px solid #dcdcdc;
  height: ${({ height }) => (height ? `${height};` : '600px')};
  position: relative;
  display: ${({ display }) => display && `${display};`};
  flex-direction: ${({ flexDirection }) => flexDirection && `${flexDirection};`};
  justify-content: ${({ justifyContent }) => justifyContent && `${justifyContent};`};
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
  height: 500px;
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
  margin: 5px auto;
  padding: 5px;
  cursor: pointer;
  align-items: center;
  justify-content: ${({ justifyContent }) => justifyContent && `${justifyContent};`};

  &:hover {
    background-color: #f5f5f5;
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
