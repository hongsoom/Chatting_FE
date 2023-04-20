import React from 'react';
import styled from 'styled-components';

const Button = props => {
  const { children, onClick, disabled = false, ...styles } = props;

  return (
    <DefaultBtn onClick={onClick} disabled={disabled} {...styles}>
      {children}
    </DefaultBtn>
  );
};

const DefaultBtn = styled.button`
  font-family: 'NotoSansR';
  font-style: normal;
  cursor: pointer;

  &:disabled {
    background-color: #f2f2f2;
  }

  width: ${({ width }) => (width ? `${width};` : '')};
  height: ${({ height }) => (height ? `${height};` : '')};
  padding : ${({ padding }) => (padding ? `${padding};` : '15px;')};
  margin : ${({ margin }) => (margin ? `${margin};` : '0;')};
  background-color: ${({ bg }) => (bg ? `${bg};` : '#000;')};
  color :${({ color }) => (color ? `${color};` : '#fff;')}
  font-size:${({ fontSize }) => (fontSize ? `${fontSize};` : '14px')};
  border: ${({ borderColor }) => (borderColor ? `1px solid ${borderColor};` : 'none;')};
`;

export default Button;
