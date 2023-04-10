import React from 'react';
import styled from 'styled-components';

const Image = props => {
  const { src, alt, onClick, ...styles } = props;

  return <DefaultImg src={src} alt={src} {...styles} />;
};

const DefaultImg = styled.img`
  width: ${({ width }) => (width ? `${width};` : '60px')};
  height: ${({ height }) => (height ? `${height};` : '60px')};
  margin: ${({ margin }) => (margin ? `${margin};` : '20px 20px 10px 0px;')};
  border-radius: ${({ borderRadius }) => (borderRadius ? `${borderRadius};` : '50%;')};
`;

export default Image;
