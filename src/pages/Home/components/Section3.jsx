import React from 'react';

const Section3 = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="content  flex justify-center items-center flex-col gap-[30px]">
        <div className="logo">
          <img
            src="/images/alahambra.png"
            alt="alahambra"
            className="w-[155px]"
          />
        </div>
        <div className="text flex flex-col gap-[60px] justify-center items-center">
          <div className="title text-center">
            <h3 className="text-content-l font-extrabold">Jewelry</h3>
            <h2 className="text-title-s font-secondary font-extrabold">
              Alhambra
            </h2>
          </div>
          <div className="description text-center text-content-l font-extrabold">
            행운의 상징인 알함브라로
            <br /> 긍정적인 삶의 비전을 가져보세요
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section3;
