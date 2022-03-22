import React from 'react';
import { useSelector } from 'react-redux';
import Bottom from './Bottom';
import People from './People';

import Top from './Top';

const Content = () => {
  const { themeDefault } = useSelector((state) => state.theme);
  return (
    <div className="content-height ">
      <div className={`h-[60%] ${themeDefault.bgContent}`}>
        <Top />
      </div>
      <div className={`h-[40%] ${themeDefault.bgBottom}`}>
        <Bottom />
      </div>

      <People />
    </div>
  );
};

export default Content;
