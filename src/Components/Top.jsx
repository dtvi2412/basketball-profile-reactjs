import React from 'react';
import { AiOutlineStar } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

const Top = () => {
  const {
    content: {
      firstName,
      lastName,
      logoTeam,
      nameTeam,
      numberShirt,
      height,
      weight,
      abbreviated,
      position,
    },
  } = useSelector((state) => state.core);

  const { themeDefault } = useSelector((state) => state.theme);

  const person = () => {
    const convertHeightToFt = (height * 0.0328).toString().split('.');
    const heightC = `${convertHeightToFt[0]}ft${convertHeightToFt[1].slice(
      0,
      2
    )}in`;
    const weightC = Math.round(weight * 2.204);

    return {
      heightC,
      weightC,
    };
  };

  return (
    <div className="h-full relative p-8">
      {/* Info  */}
      <div className="relative z-[1]">
        {/* Favorites   */}
        <div className="flex items-center">
          <div className="bg-[#D2D4DA] w-[30px] h-[30px] rounded-full flex items-center justify-center mr-2">
            <AiOutlineStar />
          </div>
          <h3 className="font-medium">Favorites</h3>
        </div>
        {/* Name  */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: [0, 100, 0], opacity: 1 }}
          transition={{ type: 'spring', delay: 0.3 }}
        >
          <h1 className="font-bold text-[44px]">{lastName}</h1>
          <h1 className="font-bold text-[44px]">{firstName}</h1>
        </motion.div>

        {/* Team  */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: 'spring', delay: 0.5 }}
        >
          <img src={logoTeam} alt={logoTeam} className="w-[40px] h-[40px]" />
          <h3 className="font-[400px]">{nameTeam}</h3>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 200 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="flex items-center"
        >
          {/* Height  */}
          <div className="mr-2">
            <h3 className="font-[500] text-[24px]">Height</h3>
            <h3 className="font-[500] text-[24px]">{person().heightC}</h3>
            <p className="text-[20px] font-[400]">/{height}cm</p>
          </div>
          {/* Width  */}
          <div>
            <h3 className="font-[500] text-[24px]">Weight</h3>
            <h3 className="font-[500] text-[24px]">{`${
              person().weightC
            }lbs`}</h3>
            <p className="text-[20px] font-[400]">/{weight}kg</p>
          </div>
        </motion.div>
      </div>
      {/* Name and number team  */}
      <div className="absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 ">
        <h1 className="font-bold text-[180px] text-white ">{abbreviated}</h1>
      </div>
      <div className="absolute top-[45%] left-[35%] -translate-x-1/2 -translate-y-1/2 z-[100]">
        <h2
          className={`${themeDefault.colorNumberShirt} text-[105px]  font-bold`}
        >
          <span className="text-[60px] absolute top-4 -left-8">#</span>
          {numberShirt}
        </h2>
      </div>
      <div className="absolute top-[45%] right-[25%] -translate-x-1/2 -translate-y-1/2 z-[100]">
        <h2 className={`${themeDefault.colorPosition} text-[55px]  font-bold`}>
          {position}
        </h2>
      </div>
    </div>
  );
};

export default Top;
