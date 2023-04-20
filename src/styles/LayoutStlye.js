import styled from 'styled-components';

export const Layout = styled.div`
  width: 100%;
  max-width: 450px;
  padding: 30px;
  border: 1px solid #dcdcdc;
  height: ${({ height }) => (height ? `${height};` : '560px')};
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
  height: 490px;
  width: 100%;
  overflow-y: scroll;
  margin: 5px 0;

  ::-webkit-scrollbar {
    display: none;
  }
`;

export const ItemLayout = styled.div`
  display: flex;
  max-width: 400px;
  width: 100%;
  height: 100px;
  padding: 0 5px;
  cursor: pointer;
  align-items: center;
  justify-content: ${({ justifyContent }) => justifyContent && `${justifyContent};`};

  &:hover {
    background-color: #f5f5f5;
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

export const NewNoti = styled.div`
  display: flex;
  justify-content: center;
  position: ${({ position }) => position && `${position};`};
  left: ${({ left }) => left && `${left};`};
  bottom: ${({ bottom }) => bottom && `${bottom};`};
  width: 20px;
  height: 20px;
  padding: 3px;
  border-radius: 10px;
  background: #ffb6c1;
  font-size: 12px;
  font-weight: 600;
`;
