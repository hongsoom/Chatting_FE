import React from 'react';
import styled from 'styled-components';

const Text = props => {
  const { children, H, S, B1, B2, L, onClick, ...styles } = props;
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
  font-size: ${({ fontSize }) => (fontSize ? `${fontSize};` : `18px;`)};
  color: ${({ color }) => (color ? `${color};` : `#000;`)};
  margin: ${({ margin }) => (margin ? `${margin};` : '0;')};
  padding: ${({ padding }) => (padding ? `${padding};` : '0;')};
  font-weight: ${({ fontWeight }) => (fontWeight ? `${fontWeight};` : `400;`)};
  white-space: pre-wrap;
  word-break: keep-all;
`;

const Headline = styled.h1`
  font-family: 'NotoSansB';
  font-style: normal;
  font-weight: 700;
  font-size: ${({ fontSize }) => (fontSize ? `${fontSize};` : `25px`)};
  line-height: 48px;
  color: ${({ color }) => (color ? `${color};` : `#000`)};
  margin: ${({ margin }) => (margin ? `${margin};` : '0;')};
  white-space: pre-wrap;
  word-break: keep-all;
  text-align: center;
`;

const Subtitle = styled.p`
  font-family: 'NotoSansR';
  font-style: normal;
  font-weight: 400;
  font-size: ${({ fontSize }) => (fontSize ? `${fontSize};` : `15px`)};
  line-height: 30px;
  color: ${({ color }) => (color ? `${color};` : `#000`)};
  margin: ${({ margin }) => (margin ? `${margin};` : '0;')};
  white-space: pre-wrap;
  word-break: keep-all;
`;

const Body1 = styled.p`
  font-family: 'NotoSansR';
  font-style: normal;
  font-weight: 400;
  line-height: ${({ lineHeight }) => (lineHeight ? `${lineHeight};` : `25px`)};
  font-size: ${({ fontSize }) => (fontSize ? `${fontSize};` : `15px`)};
  color: ${({ color }) => (color ? `${color};` : `#000`)};
  margin: ${({ margin }) => (margin ? `${margin};` : '0;')};
  word-break: keep-all;
`;

const Body2 = styled.p`
  font-family: 'NotoSansR';
  font-style: normal;
  font-weight: 400;
  line-height: ${({ lineHeight }) => (lineHeight ? `${lineHeight};` : `25px`)};
  font-size: ${({ fontSize }) => (fontSize ? `${fontSize};` : `12px`)};
  color: ${({ color }) => (color ? `${color};` : `#000`)};
  margin: ${({ margin }) => (margin ? `${margin};` : '0;')};
  white-space: pre-wrap;
  word-break: keep-all;
`;

const Link = styled.span`
  font-family: 'NotoSansB';
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
