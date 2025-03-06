import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

const Section5 = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const image = [
    {
      id: 1,
      src: '/images/landing-swiper1.png',
    },
    {
      id: 2,
      src: '/images/landing-swiper2.png',
    },
    {
      id: 3,
      src: '/images/landing-swiper3.png',
    },
    {
      id: 4,
      src: '/images/landing-swiper4.png',
    },
    {
      id: 5,
      src: '/images/landing-swiper5.png',
    },
    {
      id: 6,
      src: '/images/landing-swiper6.png',
    },
    {
      id: 7,
      src: '/images/landing-swiper7.png',
    },
  ];

  const handleSlideChange = swiper => {
    setActiveIndex(swiper.activeIndex);
  };

  return (
    <div className="h-screen relative flex justify-center items-center">
      <div className="logo absolute z-10">
        <img src="/icons/logo-w.svg" alt="logo" />
      </div>
      <Swiper
        direction={'vertical'}
        pagination={false} // Disable default pagination
        modules={[Pagination]}
        className="mySwiper"
        onSlideChange={handleSlideChange}
      >
        {image.map(item => (
          <SwiperSlide key={item.id}>
            <img src={item.src} alt={item.id} className="object-cover" />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom pagination */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-4 bg-gray-0 w-[48px] h-[320px] rounded-[40px] items-center justify-center">
        {image.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              const swiperInstance = document.querySelector('.mySwiper').swiper;
              swiperInstance.slideTo(index);
            }}
            className={`transition-all duration-300 ${
              activeIndex === index
                ? 'bg-gray-90 w-[18px] h-[60px] rounded-full'
                : 'bg-gray-30 w-[15px] h-[15px] rounded-full'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Section5;
