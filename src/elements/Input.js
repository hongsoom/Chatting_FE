import React from "react";
import styled from "styled-components";

const Input = (props) => {
  const {
    type = "text",
    children,
    onChange,
    id,
    placeholder,
    S,
    M,
    L,
    Textarea,
    maxlength,
    oninput,
    ...styles
  } = props;

  if (S) {
    return (
      <SmallInput
        type={type}
        placeholder={placeholder}
        id={id}
        onChange={onChange}
        maxlength={maxlength}
        oninput={oninput}
        {...styles}
      />
    );
  }

  if (M) {
    return (
      <MediumInput
        type={type}
        placeholder={placeholder}
        id={id}
        onChange={onChange}
        oninput={oninput}
        {...styles}
      />
    );
  }

  if (L) {
    return (
      <LargeInput
        type={type}
        placeholder={placeholder}
        id={id}
        onChange={onChange}
        maxlength={maxlength}
        oninput={oninput}
        {...styles}
      />
    );
  }

  if (Textarea) {
    return (
      <Textarea
        type={type}
        placeholder={placeholder}
        id={id}
        onChange={onChange}
        maxlength={maxlength}
        oninput={oninput}
        {...styles}
      />
    );
  }

  return (
    <DefaultInput
      type={type}
      placeholder={placeholder}
      id={id}
      onChange={onChange}
      maxlength={maxlength}
      oninput={oninput}
      {...styles}
    />
  );
};

const DefaultInput = styled.input`
  &:focus {
    box-shadow: none;
    outline: none !important;
    border-color: #a9a9a9 !important;
    /* box-shadow: 0 0 0 0px #6371f7, 0 0 0 2px #6371f7; */
  }
  width: ${({ width }) => (width ? `${width};` : "100%;")};
  height: ${({ height }) => (height ? `${height};` : "44px;")};
  padding: ${({ padding }) => (padding ? `${padding};` : "0;")};
  margin: ${({ margin }) => (margin ? `${margin};` : "0;")};
  text-align: ${({ text_align }) => (text_align ? `${text_align};` : "")};
  background-color: ${({ bg }) => (bg ? `${bg};` : "")};
  font-weight: ${({ fontWeight }) => (fontWeight ? `${fontWeight};` : "")};
  ${({ size }) => (size ? `font-size: ${size};` : "")}
  ${({ border }) => (border ? `border: ${border};` : "border: none")};
  ${({ borderRadius }) =>
    borderRadius ? `border-radius: ${borderRadius};` : "border-radius: 4px;"}
`;

const Textarea = styled.textarea`
  &:focus {
    outline: none;
    box-shadow: 0 0 0 0px #6371f7, 0 0 0 2px #6371f7;
  }
  width: ${({ width }) => (width ? `${width};` : "100%;")};
  height: ${({ height }) => (height ? `${height};` : "44px;")};
  padding: ${({ padding }) => (padding ? `${padding};` : "0;")};
  margin: ${({ margin }) => (margin ? `${margin};` : "0;")};
  text-align: ${({ text_align }) => (text_align ? `${text_align};` : "")};
  background-color: ${({ bg }) => (bg ? `${bg};` : "")};
  font-weight: ${({ fontWeight }) => (fontWeight ? `${fontWeight};` : "")};
  ${({ size }) => (size ? `font-size: ${size};` : "")}
  ${({ border }) => (border ? `border: ${border};` : "border: none")};
  ${({ borderColor }) =>
    borderColor
      ? `border: 2px solid ${borderColor};`
      : "border: 2px solid #a9a9a9 ;"};
  ${({ borderRadius }) =>
    borderRadius ? `border-radius: ${borderRadius};` : "border-radius: 4px;"}
`;

const SmallInput = styled.input`
  border-radius: 4px;
  &:focus {
    outline: none;
    box-shadow: 0 0 0 1px red, 0 0 0 5px gray;
  }
  width: ${({ width }) => (width ? `${width};` : "100%;")};
  height: ${({ height }) => (height ? `${height};` : "20px;")};
  padding: ${({ padding }) => (padding ? `${padding};` : "0;")};
  margin: ${({ margin }) => (margin ? `${margin};` : "0;")};
  text-align: ${({ text_align }) => (text_align ? `${text_align};` : "")};
  background-color: ${({ bg }) => (bg ? `${bg};` : "")};
  ${({ size }) => (size ? `font-size: ${size};` : "")}
`;

const MediumInput = styled.input`
  border-radius: 4px;
  &:focus {
    outline: none;
    box-shadow: 0 0 0 1px red, 0 0 0 5px gray;
  }
  width: ${({ width }) => (width ? `${width};` : "100%;")};
  height: ${({ height }) => (height ? `${height};` : "30px;")};
  padding: ${({ padding }) => (padding ? `${padding};` : "0;")};
  margin: ${({ margin }) => (margin ? `${margin};` : "0;")};
  text-align: ${({ text_align }) => (text_align ? `${text_align};` : "")};
  background-color: ${({ bg }) => (bg ? `${bg};` : "")};
  ${({ size }) => (size ? `font-size: ${size};` : "")}
  ${({ borderColor }) =>
    borderColor
      ? `border: 1px solid ${borderColor};`
      : "border: 1px solid #a9a9a9 ;"};
`;

const LargeInput = styled.input`
  border-radius: 4px;
  &:focus {
    outline: none;
    box-shadow: 0 0 0 1px red, 0 0 0 5px gray;
  }
  width: ${({ width }) => (width ? `${width};` : "100%;")};
  height: ${({ height }) => (height ? `${height};` : "50px;")};
  padding: ${({ padding }) => (padding ? `${padding};` : "0;")};
  margin: ${({ margin }) => (margin ? `${margin};` : "0;")};
  text-align: ${({ text_align }) => (text_align ? `${text_align};` : "")};
  background-color: ${({ bg }) => (bg ? `${bg};` : "")};
  ${({ size }) => (size ? `font-size: ${size};` : "")}
  ${({ borderColor }) =>
    borderColor
      ? `border: 1px solid ${borderColor};`
      : "border: 1px solid #a9a9a9 ;"};
`;

export default Input;
