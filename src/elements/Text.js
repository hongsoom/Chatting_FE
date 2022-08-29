import React from "react";
import styled from "styled-components";

const Text = (props) => {
  const {
    children,
    H1,
    H2,
    S1,
    S15,
    S2,
    S3,
    B1,
    B2,
    B3,
    BL,
    BM,
    BS,
    C,
    onClick,
    disabled = false,
    ...styles
  } = props;
  if (H1) {
    return <Headline1 {...styles}>{children}</Headline1>;
  }
  if (H2) {
    return <Headline2 {...styles}>{children}</Headline2>;
  }
  if (S1) {
    return <Subtitle1 {...styles}>{children}</Subtitle1>;
  }
  if (S15) {
    return <Subtitle15 {...styles}>{children}</Subtitle15>;
  }
  if (S2) {
    return <Subtitle2 {...styles}>{children}</Subtitle2>;
  }
  if (S3) {
    return <Subtitle3 {...styles}>{children}</Subtitle3>;
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
  if (BL) {
    return (
      <ButtonL {...styles} onClick={onClick} disabled={disabled}>
        {children}
      </ButtonL>
    );
  }
  if (BM) {
    return (
      <ButtonM {...styles} onClick={onClick} disabled={disabled}>
        {children}
      </ButtonM>
    );
  }
  if (BS) {
    return (
      <ButtonS {...styles} onClick={onClick} disabled={disabled}>
        {children}
      </ButtonS>
    );
  }
  if (C) {
    return <Caption {...styles}>{children}</Caption>;
  }

  return <DefaultText {...styles}>{children}</DefaultText>;
};

const DefaultText = styled.p`
  white-space: pre-line;
  ${({ size }) => (size ? `font-size: ${size};` : `font-size: 18px;`)};
  ${({ color }) => (color ? `color: ${color};` : `color: #282828;`)};
  ${({ margin }) => (margin ? `margin: ${margin};` : "margin: 0;")};
  ${({ padding }) => (padding ? `padding: ${padding};` : "padding: 0;")};
  ${({ fontWeight }) =>
    fontWeight ? `font-weight: ${fontWeight};` : `font-weight: false;`};
  word-break: keep-all;
`;

const Headline1 = styled.h1`
  font-family: "Pretendard-Regular";
  font-style: normal;
  font-weight: 600;
  font-size: 40px;
  line-height: 48px;
  ${({ color }) => (color ? `color: ${color};` : `color: black`)};
  word-break: keep-all;
`;
const Headline2 = styled.h2`
  font-family: "Pretendard-Regular";
  font-style: normal;
  font-weight: 600;
  font-size: 28px;
  line-height: 34px;
  ${({ color }) => (color ? `color: ${color};` : `color: black`)};
  word-break: keep-all;
`;
const Subtitle1 = styled.p`
  font-family: "Pretendard-Regular";
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 30px;
  ${({ color }) => (color ? `color: ${color};` : `color: black`)};
  word-break: keep-all;
`;
const Subtitle15 = styled.p`
  font-family: "Pretendard-Regular";
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 30px;
  ${({ color }) => (color ? `color: ${color};` : `color: black`)};
  word-break: keep-all;
`;
const Subtitle2 = styled.p`
  font-family: "Pretendard-Regular";
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 30px;
  ${({ color }) => (color ? `color: ${color};` : `color: black`)};
  word-break: keep-all;
`;
const Subtitle3 = styled.p`
  font-family: "Pretendard-Regular";
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 150%;
  ${({ color }) => (color ? `color: ${color};` : `color: black`)};
  word-break: keep-all;
`;
const Body1 = styled.p`
  font-family: "Pretendard-Regular";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  ${({ color }) => (color ? `color: ${color};` : `color: black`)};
  word-break: keep-all;
`;
const Body2 = styled.p`
  font-family: "Pretendard-Regular";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  ${({ color }) => (color ? `color: ${color};` : `color: black`)};
  word-break: keep-all;
`;
const Body3 = styled.p`
  font-family: "Pretendard-Regular";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  ${({ color }) => (color ? `color: ${color};` : `color: black`)};
  word-break: keep-all;
`;
const ButtonL = styled.p`
  font-family: "Pretendard-Regular";
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  word-break: keep-all;
  ${({ color }) => (color ? `color: ${color};` : `color: black`)};
  cursor: pointer;
`;
const ButtonM = styled.p`
  font-family: "Pretendard-Regular";
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  word-break: keep-all;
  cursor: pointer;
  ${({ color }) => (color ? `color: ${color};` : `color: none`)};
`;
const ButtonS = styled.p`
  font-family: "Pretendard-Regular";
  font-style: normal;
  font-weight: 600;
  font-size: 10px;
  line-height: 16px;
  word-break: keep-all;
  cursor: pointer;
  ${({ color }) => (color ? `color: ${color};` : `color: black`)};
`;
const Caption = styled.p`
  font-family: "Pretendard-Regular";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  word-break: keep-all;
  ${({ color }) => (color ? `color: ${color};` : `color: black`)};
`;

export default Text;
