import React, { useEffect, useRef, useState } from 'react';

const useOutSideRef = () => {
  const ref = useRef(null);

  const [isShowOptions, setShowOptions] = useState(false);

  const ShowOption = () => {
    setShowOptions(prev => !prev);
  };

  useEffect(() => {
    const handleClickOutside = event => {
      if (isShowOptions === true && ref.current && !ref.current.contains(event.target)) {
        ShowOption();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

  return { ref: ref, isShowOptions: isShowOptions, ShowOption: ShowOption };
};

export default useOutSideRef;
