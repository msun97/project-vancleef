import React from 'react';

const Section1 = () => {
  return (
    <div className="h-screen flex justify-center">
      <div className="title h-full flex items-center justify-center gap-8">
        <h1>
          <img
            src="/icons/logo-w.svg"
            alt="Van Cleef & Arpels"
            className="w-[650px]"
          />
        </h1>
        <div className="line w-[120px] h-[1px] bg-gray-0" />
        <p className="text-content-s">
          The Best As Ever,
          <br />
          최고는 여전히 변함 없습니다.
        </p>
      </div>
      <div className="scroll absolute bottom-[30px] flex flex-col justify-center items-center gap-5">
        <img src="/icons/arrow-bottom-line.svg" alt="scroll down" />
        <p>Scroll Down</p>
      </div>
    </div>
  );
};

export default Section1;
