import styled from 'styled-components';

export const AuthWrap = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const AuthBox = styled.div`
  margin: 15px 0 0;
`;

export const InputWrap = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  margin-top: 11px;

  & > span {
    font-size: 11px;
    margin: 0;
    white-space: pre-wrap;
    line-height: 15px;
  }
`;

export const CheckButton = styled.button`
  position: absolute;
  width: 70px;
  height: 50px;
  border-radius: 3px;
  right: 0;
  color: white;
  font-size: 11px;
`;

export const PathBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  margin-top: 16px;

  & > p > span {
    cursor: pointer;
    font-size: 15px;
    text-decoration: none;
    color: black;
    font-weight: bold;
  }
`;
