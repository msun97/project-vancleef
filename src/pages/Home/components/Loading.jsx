import React from 'react';

const Loading = () => {
  return (
    <div className="absolute z-10 w-full bg-gray-0 top-0 h-full">
      <div className="line mt-10">
        <img src="/images/loadingLine.png" />
      </div>
      <h1 className="flex justify-center mt-40">
        <img src="/icons/logo.svg" alt="Van Cleef & Arpels" />
      </h1>
    </div>
  );
};

export default Loading;
