import React from 'react';

const Section6 = () => {
  return (
    <div className="h-screen bg-[url(/images/homebg3.png)] bg-cover flex items-center justify-center flex-col gap-[15px]">
      <h1>
        <img src="/icons/logo-w.svg" />
      </h1>
      <button className="bg-[rgba(255,255,255,0.7)] w-[350px] h-[55px] text-content-l font-extrabold transition-all duration-300 hover:bg-gray-0">
        제품 보러가기
      </button>
    </div>
  );
};

export default Section6;
