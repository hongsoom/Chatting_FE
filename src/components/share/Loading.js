import React from 'react';
import styled from 'styled-components';
import { Image, Text } from 'elements';
import { loading } from 'assets';

const Loading = props => {
  const { message } = props;
  return (
    <LoadingWrap>
      {message ? (
        <Text S>{message}</Text>
      ) : (
        <Image src={loading} alt='로딩 이미지' width='150px' height='50px' />
      )}
    </LoadingWrap>
  );
};

const LoadingWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 1000px;
  max-height: 800px;
  height: 100%;
  width: 100%;
`;

export default Loading;
