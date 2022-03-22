import React from 'react';

import { AiOutlineMenu } from 'react-icons/ai';
import { useSelector } from 'react-redux';
const Navleft = () => {
  const { themeDefault } = useSelector((state) => state.theme);

  return (
    <div
      className={`fixed top-0 left-0 bottom-0 w-[50px] ${themeDefault.bgPrimary}`}
    >
      <AiOutlineMenu className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white" />
    </div>
  );
};

export default Navleft;
