import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';

import Loading from './Loading';
import { updateTheme } from '../store/theme';
import {
  END_THEME,
  START_THEME,
  TIMEOUT_ANIMATION_LOADING,
} from '../util/contants';
import { themes } from '../util/data';

const Theme = ({ setIsOpenTheme }) => {
  const [theme, setTheme] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [start, setStart] = useState(START_THEME);
  const [end, setEnd] = useState(END_THEME);

  const dispatch = useDispatch();
  const loadingTimeoutRef = useRef(null);

  //Handle Update Theme
  const handleUpdateTheme = () => {
    const {
      bgHeader,
      bgContent,
      bgBottom,
      bgPrimary,
      bgPrimaryAlpha,
      bgSecond,
      bgSecondAlpha,
      color,
      colorNumberShirt,
      colorPosition,
      colorBottom,
      colorRebounds,
    } = theme;

    const yourTheme = {
      bgHeader,
      bgContent,
      bgBottom,
      bgPrimary,
      bgPrimaryAlpha,
      bgSecond,
      bgSecondAlpha,
      color,
      colorNumberShirt,
      colorPosition,
      colorBottom,
      colorRebounds,
    };
    setIsLoading(true);

    loadingTimeoutRef.current = setTimeout(() => {
      dispatch(updateTheme({ yourTheme }));
      setIsLoading(false);
      setIsOpenTheme(false);
    }, TIMEOUT_ANIMATION_LOADING);
  };

  //Handle Next
  const handleNext = () => {
    const point = end - start;

    if (end < themes.length) {
      setStart((prev) => prev + point);
      setEnd((prev) => prev + point);
    }
    //  else {
    //   setStart(START_THEME);
    //   setEnd(END_THEME);
    // }
  };

  //Handle Prev
  const handlePrev = () => {
    const point = end - start;
    if (start > 0) {
      setStart((prev) => prev - point);
      setEnd((prev) => prev - point);
    }
  };

  return (
    <div
      onClick={() => setIsOpenTheme(false)}
      className="bg-[rgba(0,0,0,0.7)] fixed inset-0 z-[100]"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-md"
      >
        <button
          disabled={start === 0}
          onClick={handlePrev}
          className={`absolute -left-[20px] top-1/2 -translate-y-1/2    ${
            start === 0 ? 'hidden' : 'block'
          }`}
        >
          <span
            className={`w-[40px] h-[40px] rounded-full text-xs flex items-center justify-center text-white bg-lime-500  `}
          >
            Prev
          </span>
        </button>
        {/* List theme   */}
        <div className="flex  items-center justify-center overflow-hidden">
          {themes.slice(start, end).map((t) => (
            <motion.div
              initial={{ opacity: 0, x: -200 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              key={t.id}
              className="flex flex-col items-center "
            >
              <div
                onClick={() => setTheme(t)}
                className={`w-[250px] mx-1 border-4  ${
                  t.id === theme.id && 'border-red-600'
                }  rounded-lg `}
              >
                <img
                  className="w-full h-full bg-gray-400"
                  src={t.img}
                  alt={t.title}
                />
              </div>
              <h3>{t.title}</h3>
            </motion.div>
          ))}
        </div>
        <button
          onClick={handleNext}
          className={`absolute -right-[20px] top-1/2 -translate-y-1/2 ${
            end >= themes.length ? 'hidden' : 'block'
          }`}
        >
          <span className="w-[40px] h-[40px] rounded-full text-xs flex items-center justify-center text-white bg-lime-500 ">
            Next
          </span>
        </button>
        {/* Update  */}
        <button
          disabled={Object.keys(theme).length === 0}
          onClick={handleUpdateTheme}
          className={`text-white bg-violet-700 px-4 py-2 rounded-lg mt-3 ml-1  flex items-center ${
            Object.keys(theme).length === 0
              ? 'cursor-default opacity-50'
              : 'cursor-pointer hover:bg-violet-800'
          }`}
        >
          Update
        </button>
      </div>

      {/* Is loading  */}
      {isLoading && <Loading />}
    </div>
  );
};

export default Theme;
