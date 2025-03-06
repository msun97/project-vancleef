import React from 'react';

const Section2 = () => {
  return (
    <div className="h-screen relative">
      <video muted autoPlay className="absolute w-full bottom-0">
        <source src="/video/home1.mp4" type="video/mp4" />
      </video>
    </div>
  );
};

export default Section2;
