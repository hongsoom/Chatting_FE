import { useState } from 'react';

export const useModal = (initialValue = false) => {
  const [state, setState] = useState(initialValue);

  const handleModal = () => {
    setState(!state);
  };

  return [state, handleModal];
};
