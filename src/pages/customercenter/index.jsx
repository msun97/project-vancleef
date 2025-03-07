import React, { useEffect, useState } from 'react';
import CCNav from './components/CCNav';

import { Outlet, useLocation, useNavigate } from 'react-router-dom';

const CustomerCenter = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isOn, setIsOn] = useState('notice');
  const handleClick = tab => {
    setIsOn(tab);
    navigate(`/customers/${tab}`);
  };

  useEffect(() => {
    if (location.pathname === '/customers/inquiryform') {
      setIsOn(null);
    }
  }, [location.pathname]);
  return (
    <div className="p-330">
      <div className="wrap pt-[86px] flex justify-center items-center flex-col gap-5">
        <h2 className="text-content-xxxl font-secondary font-bold">고객센터</h2>
        <div className="cc bg-gray-10 w-full h-[220px] mt-5 rounded-[10px] flex flex-col justify-center items-center gap-4">
          <div className="call text-content-xxxl font-secondary font-bold text-primary-80">
            <a href="tel:08000000000">080-0000-0000</a>
          </div>
          <p className="mt-8px text-content-m">
            상담시간: 10:00 - 17:00 (점심시간: 11:30 - 12:30) 토/일 및 공휴일
            휴무
          </p>
          <p className="font-secondary text-content-s">
            우측 하단 실시간 상담 버튼을 이용하시면 더 빠르게 상담 받으실 수
            있습니다.
          </p>
        </div>
        {isOn ? <CCNav isOn={isOn} handleClick={handleClick} /> : ''}
        <Outlet />
      </div>
    </div>
  );
};

export default CustomerCenter;
