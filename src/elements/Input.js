import React from 'react';
import styled from 'styled-components';

const Input = props => {
  const { type = 'text', children, onChange, id, placeholder, ...styles } = props;

  return (
    <DefaultInput type={type} placeholder={placeholder} id={id} onChange={onChange} {...styles} />
  );
};

const DefaultInput = styled.input`
  &:focus {
    box-shadow: none;
    outline: none !important;
  }

  &::placeholder {
    color: #afb0b3;
  }

  width: ${({ width }) => (width ? `${width};` : '100%;')};
  height: ${({ height }) => (height ? `${height};` : '55px;')};
  padding: ${({ padding }) => (padding ? `${padding};` : '15px;')};
  margin: ${({ margin }) => (margin ? `${margin};` : '0;')};
  font-weight: ${({ fontWeight }) => (fontWeight ? `${fontWeight};` : '400')};
  font-size: ${({ size }) => (size ? `font-size: ${size};` : '14px;')};
  border: ${({ border }) => (border ? `border: ${border};` : '1px solid #AFB0B3;')};
  color: #808080;
  font-family: 'NotoSansM';
`;

export default Input;
