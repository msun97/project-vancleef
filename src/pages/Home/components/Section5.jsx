import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Section5 = ({ isLoading, videoCompleted }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef(null);
  const swiperRef = useRef(null);
  const triggerRef = useRef(null);

  const image = [
    { id: 1, src: '/images/landing-swiper1.png' },
    { id: 2, src: '/images/landing-swiper2.png' },
    { id: 3, src: '/images/landing-swiper3.png' },
    { id: 4, src: '/images/landing-swiper4.png' },
    { id: 5, src: '/images/landing-swiper5.png' },
    { id: 6, src: '/images/landing-swiper6.png' },
    { id: 7, src: '/images/landing-swiper7.png' },
  ];

  const handleSlideChange = swiper => {
    setActiveIndex(swiper.activeIndex);
  };

  useEffect(() => {
    if (isLoading || !sectionRef.current || !swiperRef.current?.swiper) return;
  
    const ctx = gsap.context(() => {
      const swiperInstance = swiperRef.current.swiper;
    
      const totalScrollHeight = (image.length - 1) * 200; 
  
      triggerRef.current = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: `+=${totalScrollHeight}vh`,
        pin: true,
        pinSpacing: true,
        scrub: 10, 
        id: "section5-trigger",
        markers: true,
        onUpdate: (self) => {
          const progress = self.progress * (image.length - 1);
          
          const newIndex = Math.round(progress * 1.2); 
  
          if (newIndex !== activeIndex && newIndex >= 0 && newIndex < image.length) {
            swiperInstance.slideTo(newIndex);
            setActiveIndex(newIndex);
          }
        },
      });
    }, sectionRef);
  
    return () => ctx.revert();
  }, [isLoading, image.length]);
  useEffect(() => {
    const handlePaginationClick = (index) => {
      if (swiperRef.current?.swiper) {
        swiperRef.current.swiper.slideTo(index);
        if (triggerRef.current) {
          const progress = index / (image.length - 1);
          const scrollPos = triggerRef.current.start + 
                           (triggerRef.current.end - triggerRef.current.start) * progress;
          window.scrollTo({
            top: scrollPos,
            behavior: 'smooth'
          });
        }
      }
    };
    window.handleSwiperPaginationClick = handlePaginationClick;

    return () => {
      delete window.handleSwiperPaginationClick;
    };
  }, [image.length]);

  return (
    <div className="h-screen relative flex justify-center items-center" ref={sectionRef}>
      <div className="logo absolute z-10">
        <img src="/icons/logo-w.svg" alt="logo" />
      </div>
      <Swiper
        direction={'vertical'}
        pagination={false}
        modules={[Pagination]}
        className="mySwiper h-full w-full"
        onSlideChange={handleSlideChange}
        ref={swiperRef}
        allowTouchMove={false} 
      >
        {image.map(item => (
          <SwiperSlide key={item.id} className="h-full w-full">
            <img 
              src={item.src} 
              alt={`슬라이드 ${item.id}`} 
              className="object-cover h-full w-full" 
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-4 bg-gray-0 w-[48px] h-[320px] rounded-[40px] items-center justify-center">
        {image.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (window.handleSwiperPaginationClick) {
                window.handleSwiperPaginationClick(index);
              }
            }}
            className={`transition-all duration-300 ${
              activeIndex === index
                ? 'bg-gray-90 w-[18px] h-[60px] rounded-full'
                : 'bg-gray-30 w-[15px] h-[15px] rounded-full'
            }`}
            aria-label={`슬라이드 ${index + 1}로 이동`}
          />
        ))}
      </div>
    </div>
  );
};

export default Section5;