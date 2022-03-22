import React from 'react';
import ball from '../Assets/img/ball.png';

const Loading = ({ isProgress, uploadProgress }) => {
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="fixed bg-[rgba(0,0,0,0.9)] inset-0 z-[9999]"
    >
      <div className="animate-dribble flex items-center">
        <img className="w-[200px] " src={ball} alt="ball" />
      </div>
      <h1 className="text-white font-mono text-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-firefly ">
        Loading... {isProgress && `${uploadProgress}%`}
      </h1>
    </div>
  );
};

export default Loading;
