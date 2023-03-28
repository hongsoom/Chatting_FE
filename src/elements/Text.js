import React from 'react';
import styled from 'styled-components';

const Text = props => {
  const { children, H, S, B1, B2, B3, L, onClick, ...styles } = props;
  if (H) {
    return <Headline {...styles}>{children}</Headline>;
  }

  if (S) {
    return <Subtitle {...styles}>{children}</Subtitle>;
  }

  if (B1) {
    return <Body1 {...styles}>{children}</Body1>;
  }
  if (B2) {
    return <Body2 {...styles}>{children}</Body2>;
  }
  if (B3) {
    return <Body3 {...styles}>{children}</Body3>;
  }

  if (L) {
    return (
      <Link onClick={onClick} {...styles}>
        {children}
      </Link>
    );
  }

  return <DefaultText {...styles}>{children}</DefaultText>;
};

const DefaultText = styled.p`
  font-family: 'NotoSansR';
  font-style: normal;
  line-height: 150%;
  ${({ size }) => (size ? `font-size: ${size};` : `font-size: 18px;`)};
  ${({ color }) => (color ? `${color};` : `#282828;`)};
  ${({ margin }) => (margin ? `margin: ${margin};` : 'margin: 0;')};
  ${({ padding }) => (padding ? `padding: ${padding};` : 'padding: 0;')};
  ${({ fontWeight }) => (fontWeight ? `font-weight: ${fontWeight};` : `font-weight: false;`)};
  white-space: pre-wrap;
  word-break: keep-all;
`;

const Headline = styled.h1`
  font-family: 'NotoSansB';
  font-style: normal;
  font-weight: 700;
  font-size: 27px;
  line-height: 48px;
  color: ${({ color }) => (color ? `${color};` : `#000`)};
  ${({ margin }) => (margin ? `margin: ${margin};` : 'margin: 0;')};
  white-space: pre-wrap;
  word-break: keep-all;
  text-align: center;
`;

const Subtitle = styled.p`
  font-family: 'NotoSansM';
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 30px;
  color: ${({ color }) => (color ? `${color};` : `#000`)};
  ${({ margin }) => (margin ? `margin: ${margin};` : 'margin: 0;')};
  white-space: pre-wrap;
  word-break: keep-all;
`;

const Body1 = styled.p`
  font-family: 'NotoSansR';
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 19px;
  color: ${({ color }) => (color ? `${color};` : `#000`)};
  ${({ margin }) => (margin ? `margin: ${margin};` : 'margin: 0;')};
  white-space: pre-wrap;
  word-break: keep-all;
  text-align: center;
`;

const Body2 = styled.p`
  font-family: 'NotoSansR';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  color: ${({ color }) => (color ? `${color};` : `#000`)};
  ${({ margin }) => (margin ? `margin: ${margin};` : 'margin: 0;')};
  white-space: pre-wrap;
  word-break: keep-all;
`;

const Body3 = styled.p`
  font-family: 'NotoSansL';
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 14px;
  color: ${({ color }) => (color ? `${color};` : `#000`)};
  ${({ margin }) => (margin ? `margin: ${margin};` : 'margin: 0;')};
  white-space: pre-wrap;
  word-break: keep-all;
`;

const Link = styled.span`
  font-family: 'NotoSansM';
  font-style: normal;
  font-size: ${({ fontSize }) => (fontSize ? `${fontSize};` : `14px`)};
  line-height: 14px;
  color: ${({ color }) => (color ? `${color};` : `#000`)};
  margin: ${({ margin }) => (margin ? `${margin};` : '0;')};
  white-space: pre-wrap;
  word-break: keep-all;
  cursor: pointer;
`;

export default Text;
