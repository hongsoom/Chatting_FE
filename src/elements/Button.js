import React from "react";
import styled from "styled-components";

const Button = (props) => {
  const {
    children,
    shape,
    S,
    M,
    L,
    onClick,
    disabled = false,
    ...styles
  } = props;

  if (S) {
    return (
      <SmallButton onClick={onClick} disabled={disabled} {...styles}>
        {children}
      </SmallButton>
    );
  }

  if (M) {
    return (
      <MediumButton onClick={onClick} disabled={disabled} {...styles}>
        {children}
      </MediumButton>
    );
  }

  if (L) {
    return (
      <LargeButton onClick={onClick} disabled={disabled} {...styles}>
        {children}
      </LargeButton>
    );
  }

  return (
    <DefaultBtn onClick={onClick} disabled={disabled} {...styles}>
      {children}
    </DefaultBtn>
  );
};

const DefaultBtn = styled.button`
  font-family: "Pretendard-Regular";
  font-style: normal;
  cursor: pointer;
  ${({ width }) => (width ? `width: ${width};` : "width: 100%;")};
  ${({ height }) => (height ? `  height: ${height};` : "height: 100%;")};
  ${({ padding }) => (padding ? `padding:  ${padding};` : "padding: 0;")};
  ${({ margin }) => (margin ? `margin: ${margin};` : "margin: 0;")};
  ${({ bg }) => (bg ? `background: ${bg};` : "background: black;")};
  ${({ color }) => (color ? `color: ${color};` : "color: white;")}
  ${({ fontWeight }) =>
    fontWeight ? `font-weight: ${fontWeight};` : "font-weight: 400;"}
  ${({ fontSize }) =>
    fontSize ? `font-size: ${fontSize};` : "font-size: 18px"};
  ${({ borderRadius }) =>
    borderRadius ? `border-radius: ${borderRadius};` : "border-radius: 4px;"};
  ${({ borderColor }) =>
    borderColor
      ? `border: 1px solid ${borderColor};`
      : "border: 1px solid transparent;"};
`;

const SmallButton = styled.button`
  font-family: "Pretendard-Regular";
  font-style: normal;
  cursor: pointer;
  ${({ width }) => (width ? `width: ${width};` : "width: 100%;")};
  ${({ height }) => (height ? `  height: ${height};` : "height: 3vh")};
  ${({ padding }) => (padding ? `padding:  ${padding};` : "padding: 0;")};
  ${({ margin }) => (margin ? `margin: ${margin};` : "margin: 0;")};
  ${({ bg }) => (bg ? `background: ${bg};` : "background: black;")};
  ${({ color }) => (color ? `color: ${color};` : "color: white;")}
  ${({ fontWeight }) =>
    fontWeight ? `font-weight: ${fontWeight};` : "font-weight: 400;"}
  ${({ fontSize }) =>
    fontSize ? `font-size: ${fontSize};` : "font-size: 15px"};
  ${({ borderRadius }) =>
    borderRadius ? `border-radius: ${borderRadius};` : "border-radius: 0;"};
  ${({ borderColor }) =>
    borderColor
      ? `border: 1px solid ${borderColor};`
      : "border: 1px solid transparent;"};
  ${({ alignItems }) =>
    alignItems ? `align-items: ${alignItems};` : "align-items: center;"};
`;

const MediumButton = styled.button`
  font-family: "Pretendard-Regular";
  font-style: normal;
  cursor: pointer;
  &:hover {
    background: #a9a9a9;
  }
  ${({ hover }) =>
    hover
      ? `&:hover {
    background: ${hover}};`
      : `&:hover {
    background: #a9a9a9;
  }`}
  ${({ width }) => (width ? `width: ${width};` : "width: 120px;")};
  ${({ height }) => (height ? `  height: ${height};` : "height: 4vh")};
  ${({ padding }) => (padding ? `padding:  ${padding};` : "padding: 0;")};
  ${({ margin }) => (margin ? `margin: ${margin};` : "margin: 0;")};
  ${({ bg }) => (bg ? `background: ${bg};` : "background: black;")};
  ${({ color }) => (color ? `color: ${color};` : "color: white;")}
  ${({ fontWeight }) =>
    fontWeight ? `font-weight: ${fontWeight};` : "font-weight: 400;"}
  ${({ fontSize }) =>
    fontSize ? `font-size: ${fontSize};` : "font-size: 18px"};
  ${({ borderRadius }) =>
    borderRadius ? `border-radius: ${borderRadius};` : "border-radius: 0;"};
  ${({ borderColor }) =>
    borderColor
      ? `border: 1px solid ${borderColor};`
      : "border: 1px solid transparent;"};
  text-align: center;
  ${({ alignItems }) =>
    alignItems ? `align-items: ${alignItems};` : "align-items: center;"};
`;

const LargeButton = styled.button`
  font-family: "Pretendard-Regular";
  font-style: normal;
  cursor: pointer;
  ${({ hover }) =>
    hover
      ? `&:hover {
    background: ${hover}};`
      : `&:hover {
    background: #a9a9a9;
  }`}
  ${({ width }) => (width ? `width: ${width};` : "width: 100%;")};
  ${({ height }) => (height ? `  height: ${height};` : "height: 6vh")};
  ${({ padding }) => (padding ? `padding:  ${padding};` : "padding: 0;")};
  ${({ margin }) => (margin ? `margin: ${margin};` : "margin: 0;")};
  ${({ bg }) => (bg ? `background-color: ${bg};` : "background: black;")};
  ${({ color }) => (color ? `color: ${color};` : "color: white;")}
  ${({ fontWeight }) =>
    fontWeight ? `font-weight: ${fontWeight};` : "font-weight: 500;"}
  ${({ fontSize }) =>
    fontSize ? `font-size: ${fontSize};` : "font-size: 18px"};
  ${({ borderRadius }) =>
    borderRadius ? `border-radius: ${borderRadius};` : "border-radius: 0;"};
  ${({ borderColor }) =>
    borderColor
      ? `border: 1px solid ${borderColor};`
      : "border: 1px solid transparent;"};
`;

export default Button;
