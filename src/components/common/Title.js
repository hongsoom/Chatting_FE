import React from 'react';
import { Text } from 'elements';

const Title = ({ title }) => {
  return (
    <Text S fontSize='17px'>
      {title}
    </Text>
  );
};

export default Title;
