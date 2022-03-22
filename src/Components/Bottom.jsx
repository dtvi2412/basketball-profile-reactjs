import React, { useMemo } from 'react';

import { AiOutlineArrowUp } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

const Bottom = () => {
  const {
    profile: { born, from, debut, previously },
    score: { points, rebounds, assists },
  } = useSelector((state) => state.core);

  const { themeDefault } = useSelector((state) => state.theme);

  const calculateAge = useMemo(() => {
    const year = new Date().getFullYear();
    const yearOfBirth = born.split('-')[0];
    return year - yearOfBirth;
  }, [born]);

  const calculateExperience = useMemo(() => {
    const year = new Date().getFullYear();
    const debutOfYear = debut.split('-')[0];
    return year - debutOfYear;
  }, [debut]);

  return (
    <div className={`h-full p-8 flex items-center ${themeDefault.colorBottom}`}>
      {/* Left  */}
      <div className="flex-1 mr-4 z-[2]">
        <div className="flex items-center border-b-2 pb-2 border-black ">
          <h3 className="flex-1 font-bold">BORN</h3>
          <p>{born}</p>
        </div>
        <div className="flex items-center border-b-2 pb-2 border-black ">
          <h3 className="flex-1 font-bold">AGE</h3>
          <p>{calculateAge} Years</p>
        </div>
        <div className="flex items-center border-b-2 pb-2 border-black ">
          <h3 className="flex-1 font-bold">From</h3>
          <p>{from}</p>
        </div>
      </div>
      {/* Mid  */}
      <div className="flex-1 flex items-center mr-4  relative z-10">
        {/* Item  */}
        <motion.div
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className={`${themeDefault.bgPrimaryAlpha} text-white rounded-lg font-bold mr-4 min-w-[160px]`}
        >
          <h3 className="text-sm border-b-2 border-white text-center p-2">
            POINTS PER GAME
          </h3>
          <div className="flex items-center justify-center py-4">
            <p className="text-[34px]">{points.toFixed(1)}</p>
            <AiOutlineArrowUp className="text-[26px]" />
          </div>
        </motion.div>
        {/* Item  */}
        <motion.div
          initial={{ y: -200, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className={`${themeDefault.bgSecondAlpha} ${themeDefault.colorRebounds} rounded-lg font-bold mr-4 min-w-[160px]`}
        >
          <h3 className="text-sm border-b-2 text-center border-white p-2">
            REBOUNDS PER GAME
          </h3>
          <div className="flex items-center justify-center  py-4">
            <p className="text-[34px]">{rebounds.toFixed(1)}</p>
            <AiOutlineArrowUp className="text-[26px]" />
          </div>
        </motion.div>
        {/* Item  */}
        <motion.div
          initial={{ x: 200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className={`${themeDefault.bgPrimaryAlpha} text-white rounded-lg font-bold min-w-[160px] `}
        >
          <h3 className="text-sm border-b-2 text-center border-white p-2">
            ASSISTS PER GAME
          </h3>
          <div className="flex items-center justify-center  py-4">
            <p className="text-[34px]">{assists.toFixed(1)}</p>
            <AiOutlineArrowUp className="text-[26px]" />
          </div>
        </motion.div>
      </div>
      {/* Right  */}
      <div className="flex-1 z-[2]">
        <div className="flex items-center border-b-2 pb-2 border-black ">
          <h3 className="flex-1 font-bold">DEBUT</h3>
          <p>{debut}</p>
        </div>
        <div className="flex items-center border-b-2 pb-2 border-black ">
          <h3 className="flex-1 font-bold">EXPERIENCE</h3>
          <p>{calculateExperience} Years</p>
        </div>
        <div className="flex items-center border-b-2 pb-2 border-black ">
          <h3 className="flex-1 font-bold">PREVIOUSLY</h3>
          <p>{previously}</p>
        </div>
      </div>
    </div>
  );
};

export default Bottom;
