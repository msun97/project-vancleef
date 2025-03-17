import React, { useState } from 'react';
import KbrandModal from './components/KbrandModal';

const Kbrand = () => {
  const [isModal, setIsModal] = useState(false);
  const handleClick = () => {
    setIsModal(!isModal);
  };
  return (
    <div className="max-w-7xl h-[100vh] bg-white flex justify-center items-center">
      <div className="flex w-screen">
        <ul className="ml-[330px] font-secondary font-extrabold text-[34px] flex flex-col gap-8 relative z-[10]">
          <li className="border-b-3 border-transparent hover:border-black transition-all">
            All
          </li>
          <li className="border-b-3 border-transparent hover:border-black transition-all">
            Now Exhibition
          </li>
          <li className="border-b-3 border-transparent hover:border-black transition-all">
            Archive
          </li>
        </ul>
      </div>
      <div className="w-full flex justify-center items-center absolute top-1/2 -translate-y-2/4 left-1/2 -translate-x-2/4 ">
        <ul>
          <li
            className="relative group w-[280px] h-[480px] overflow-hidden"
            onClick={handleClick}
          >
            <img
              src="https://www.vancleefarpels.com/content/dam/vancleefarpels/La-Maison/newsroom/2024/shakudo-exhibition/Key-Visual-H_ENTC-version.jpg"
              className="w-full h-full object-cover"
            />
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background:
                  'linear-gradient(to bottom, rgba(0,0,0,0) 0%, #CCD3B5 100%)',
              }}
            ></div>
            <div className="absolute inset-0 flex flex-col justify-end text-gray-90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 gap-2 overflow-auto ">
              <p className="text-[12px] font-bold">~ 2025년 04월 13일</p>
              <p className="text-[16px] font-bold">
                Shakudō: from Samurai Ornaments to Jewelry
              </p>
            </div>
          </li>
        </ul>
      </div>
      {isModal ? <KbrandModal handleClick={handleClick} /> : ''}
    </div>
  );
};

export default Kbrand;
