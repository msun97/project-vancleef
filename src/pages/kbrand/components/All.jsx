import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Mousewheel, Pagination } from 'swiper/modules';

const All = ({ data, handleClick }) => {
  return (
    <Swiper
      direction={'vertical'}
      slidesPerView={3}
      centeredSlides={true}
      spaceBetween={30}
      mousewheel={true}
      pagination={{
        clickable: true,
        dynamicBullets: true,
      }}
      loop={data.length > 3}
      modules={[Mousewheel, Pagination]}
      className="mySwiper relative group w-[280px] h-[100vh]"
    >
      {data.map(item => (
        <SwiperSlide
          key={item.id}
          className="relative group w-[280px] h-[480px] overflow-hidden"
          onClick={handleClick}
        >
          <img src={item.img} className="w-full h-full object-cover" />
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background:
                'linear-gradient(to bottom, rgba(0,0,0,0) 0%, #CCD3B5 100%)',
            }}
          ></div>
          <div className="absolute inset-0 flex flex-col justify-end text-gray-90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 gap-2 overflow-auto ">
            <p className="text-[12px] font-bold">{item.todate}</p>
            <p className="text-[16px] font-bold">{item.title}</p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default All;
