import React from 'react';
import { useSelector } from 'react-redux';
import Content from '../Components/Content';
import Header from '../Components/Header';
import Navleft from '../Components/Navleft';

const Home = React.forwardRef((prop, ref) => {
  const { leftNav } = useSelector((state) => state.core);

  return (
    <div ref={ref}>
      <Header />
      {leftNav && <Navleft />}

      <div className="ml-[50px]">
        <Content />
      </div>
    </div>
  );
});

export default Home;
