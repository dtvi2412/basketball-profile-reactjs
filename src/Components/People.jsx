import React from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

const People = () => {
  const { avatar } = useSelector((state) => state.core);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
      className="fixed bottom-0 left-1/2 -translate-x-1/2 z-1 "
    >
      <img className="h-[600px]" src={avatar} alt={avatar} />
    </motion.div>
  );
};

export default People;
