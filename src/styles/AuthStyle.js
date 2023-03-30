import styled from 'styled-components';

export const AuthWrap = styled.form`
  width: 100%;
  max-width: 450px;
  padding: 30px;
  margin: 50px;
  background: #ffffff;
  border: 1px solid #dcdcdc;
`;

export const AuthBox = styled.div`
  margin: 15px 0 0;
`;

export const InputWrap = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  margin-top: 11px;
  position: ${({ position }) => (position ? `${position};` : '')};
`;

export const ErrorWrap = styled.div`
  height: 1em;
  margin-top: 8px;
  font-size: 12px;
  font-weight: 700;
  color: ${({ message }) => (message?.includes('가능') ? `#32cd32;` : '#F34F1D;')};
`;

export const PathBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  margin-top: 16px;
`;
