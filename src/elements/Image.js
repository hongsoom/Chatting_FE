import React from 'react';
import styled from 'styled-components';

const Image = props => {
  const { L, S, dataSrc, src, alt, onClick, ...styles } = props;

  if (L) {
    return <LageImg src={src} alt={src} loading='lazy' {...styles} />;
  }

  if (S) {
    return <SmallImg src={src} alt={src} loading='lazy' {...styles} />;
  }

  return <DefaultImg src={src} alt={src} loading='lazy' {...styles} />;
};

const DefaultImg = styled.img`
  width: ${({ width }) => (width ? `${width};` : '55px')};
  height: ${({ height }) => (height ? `${height};` : '55px')};
  margin: ${({ margin }) => (margin ? `${margin};` : '10px 20px 10px 0px')};
  border-radius: ${({ borderRadius }) => (borderRadius ? `${borderRadius};` : '50%;')};
`;

const LageImg = styled.img`
  width: ${({ width }) => (width ? `${width};` : '150px')};
  height: ${({ height }) => (height ? `${height};` : '150px')};
  margin: ${({ margin }) => (margin ? `${margin};` : '')};
  border-radius: ${({ borderRadius }) => (borderRadius ? `${borderRadius};` : '50%;')};
`;

const SmallImg = styled.img`
  width: ${({ width }) => (width ? `${width};` : '30px')};
`;

export default Image;
