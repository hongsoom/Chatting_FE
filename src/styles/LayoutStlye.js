import styled from 'styled-components';

export const Layout = styled.div`
  width: 100%;
  max-width: 450px;
  padding: 30px;
  border: 1px solid #dcdcdc;
  height: ${({ height }) => (height ? `${height};` : ' ')};
  position: relative;
`;

export const FormLayout = styled.form`
  width: 100%;
  max-width: 450px;
  padding: 30px;
  border: 1px solid #dcdcdc;
`;

export const ErrorLayout = styled.div`
  height: 1em;
  margin: 10px 0;
  font-size: 12px;
  font-weight: 700;
  color: #f34f1d;
`;
